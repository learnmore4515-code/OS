// ============================================================================
// WhatsApp AI Sales Agent — Inbound Webhook Workflow
// Pattern: Webhook Processing (Webhook → Validate → Transform → AI Agent → Outbound → Respond)
// Tenant-isolated. WhatsApp + OpenAI credentials must be configured in n8n.
// ============================================================================
import {
  workflow,
  node,
  trigger,
  languageModel,
  memory,
  ifElse,
  expr,
  nodeJson,
  placeholder,
} from '@n8n/workflow-sdk';

// ----------------------------------------------------------------------------
// 1. Webhook trigger — WhatsApp Business Platform inbound messages
//    responseMode 'responseNode' so Respond to Webhook sends the HTTP reply.
// ----------------------------------------------------------------------------
const webhookTrigger = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'WhatsApp Inbound Webhook',
    parameters: {
      httpMethod: 'POST',
      path: 'whatsapp-inbound',
      responseMode: 'responseNode',
    },
    position: [200, 200],
  },
  output: [
    {
      body: {
        messaging_product: 'whatsapp',
        entry: [
          {
            changes: [
              {
                value: {
                  messages: [
                    {
                      from: '254712345678',
                      id: 'wamid_abc123',
                      timestamp: '2026-10-27T10:00:00Z',
                      text: { body: 'Hi, do you have sneakers?' },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  ],
});

// ----------------------------------------------------------------------------
// 2. Set — Normalize inbound payload (WhatsApp nests data under $json.body)
// ----------------------------------------------------------------------------
const normalizeInput = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize Input',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          {
            id: 'from',
            name: 'from',
            value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from ?? $json.from ?? "" }}'),
            type: 'string',
          },
          {
            id: 'messageText',
            name: 'messageText',
            value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body ?? $json.text ?? "" }}'),
            type: 'string',
          },
          {
            id: 'messageId',
            name: 'messageId',
            value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.id ?? $json.id ?? "" }}'),
            type: 'string',
          },
          {
            id: 'timestamp',
            name: 'timestamp',
            value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.timestamp ?? $now.toISO() }}'),
            type: 'string',
          },
        ],
      },
    },
    position: [500, 200],
  },
  output: [
    {
      from: '254712345678',
      messageText: 'Hi, do you have sneakers?',
      messageId: 'wamid_abc123',
      timestamp: '2026-10-27T10:00:00Z',
    },
  ],
});

// ----------------------------------------------------------------------------
// 3. IF — Validate required fields (phone + message text present)
// ----------------------------------------------------------------------------
const validateInput = ifElse({
  version: 2.2,
  config: {
    name: 'IF - Validate Input',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [
          {
            leftValue: expr('{{ $json.from }}'),
            operator: { type: 'string', operation: 'notEmpty' },
            rightValue: '',
          },
          {
            leftValue: expr('{{ $json.messageText }}'),
            operator: { type: 'string', operation: 'notEmpty' },
            rightValue: '',
          },
        ],
        combinator: 'and',
      },
    },
    position: [800, 200],
  },
});

// ----------------------------------------------------------------------------
// 4a. Respond — Invalid input (400)
// ----------------------------------------------------------------------------
const respondInvalid = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond - Invalid Input',
    parameters: {
      respondWith: 'json',
      responseBody: { status: 'error', message: 'Missing phone number or message text' },
      options: { responseCode: 400 },
    },
    position: [1100, 100],
  },
  output: [{ status: 'error', message: 'Missing phone number or message text' }],
});

// ----------------------------------------------------------------------------
// 5. AI Agent — Zara sales agent (OpenAI model + conversation memory)
//    Memory keyed by WhatsApp sender phone for per-customer context.
// ----------------------------------------------------------------------------
const openAiModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'OpenAI Model (Zara)',
    parameters: {},
    credentials: { openAiApi: newCredential('OpenAI') },
    position: [1100, 350],
  },
});

const conversationMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Conversation Memory', position: [1100, 500] },
  output: [{ memory: 'chat history' }],
});

const zaraAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'Zara - AI Sales Agent',
    parameters: {
      promptType: 'define',
      text: expr('You are Zara, an AI sales agent. Help the customer discover products, build a cart, and place an order. Use the retailer catalogue and policies only. Never invent prices or stock. The customer message is: "{{ $json.messageText }}". Ask clarifying questions when needed. Get explicit confirmation before creating an order. Keep order state separate from payment state.'),
    },
    subnodes: {
      model: openAiModel,
      memory: conversationMemory,
    },
    position: [1100, 200],
  },
  output: [{ output: 'AI response text' }],
});

// ----------------------------------------------------------------------------
// 6. Set — Format agent response for WhatsApp outbound
//    Phone comes from normalizeInput (agent output does not carry it).
// ----------------------------------------------------------------------------
const formatResponse = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Format WhatsApp Response',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          {
            id: 'to',
            name: 'to',
            value: nodeJson(normalizeInput, 'from'),
            type: 'string',
          },
          {
            id: 'textBody',
            name: 'textBody',
            value: expr('{{ $json.output }}'),
            type: 'string',
          },
        ],
      },
    },
    position: [1400, 200],
  },
  output: [{ to: '254712345678', textBody: 'AI response text' }],
});

// ----------------------------------------------------------------------------
// 7. WhatsApp message send — outbound reply to customer
//    phoneNumberId is a tenant-supplied config value (credential checklist item).
// ----------------------------------------------------------------------------
const whatsAppSend = node({
  type: 'n8n-nodes-base.whatsApp',
  version: 1.1,
  config: {
    name: 'WhatsApp - Send Reply',
    parameters: {
      resource: 'message',
      operation: 'send',
      messagingProduct: 'whatsapp',
      phoneNumberId: placeholder('Your WhatsApp Business Phone Number ID'),
      recipientPhoneNumber: expr('{{ $json.to }}'),
      messageType: 'text',
      textBody: expr('{{ $json.textBody }}'),
      previewUrl: false,
    },
    credentials: { whatsAppApi: newCredential('WhatsApp Business Cloud') },
    position: [1700, 200],
  },
  output: [{ messages: [{ id: 'wamid_out_123' }] }],
});

// ----------------------------------------------------------------------------
// 8. Respond — 200 OK to WhatsApp webhook
// ----------------------------------------------------------------------------
const respondOk = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond - OK',
    parameters: {
      respondWith: 'json',
      responseBody: { status: 'received' },
      options: { responseCode: 200 },
    },
    position: [1400, 400],
  },
  output: [{ status: 'received' }],
});

export default workflow('wa-inbound', 'WhatsApp AI Sales Agent - Inbound')
  .add(webhookTrigger)
  .to(normalizeInput)
  .to(validateInput.onTrue(zaraAgent.to(formatResponse.to(whatsAppSend.to(respondOk)))).onFalse(respondInvalid));
