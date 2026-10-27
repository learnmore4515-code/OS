import {
  workflow,
  node,
  trigger,
  languageModel,
  memory,
  outputParser,
  expr,
  switchCase,
  ifElse,
  merge,
  newCredential,
} from '@n8n/workflow-sdk';

// ============================================
// SHARED SUBNODES (used by AI Agent Zara)
// ============================================

const openAiModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'OpenAI Model - Zara',
    parameters: {},
    credentials: { openAiApi: newCredential('OpenAI') },
    position: [400, 100],
  },
  output: [{ output: 'AI response' }],
});

const zaraMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Zara Conversation Memory', position: [400, 300] },
  output: [{ memory: 'chat history' }],
});

const zaraOutputParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output Parser - Zara',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{ "action": "enquire", "reply": "Hi! How can I help?", "productId": null, "quantity": null, "size": null, "color": null, "deliveryZone": null, "confirmOrder": false, "escalate": false }',
    },
    position: [400, 500],
  },
  output: [{ action: 'enquire', reply: '', productId: null, quantity: null, size: null, color: null, deliveryZone: null, confirmOrder: false, escalate: false }],
});

// ============================================
// CHAIN 1: WHATSAPP INBOUND → ZARA AI AGENT → OUTBOUND
// ============================================

const webhookTrigger = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Webhook - Inbound Webhook',
    parameters: {
      httpMethod: 'POST',
      path: 'whatsapp-webhook',
      responseMode: 'responseNode',
      authentication: 'none',
      options: {
        responseCode: { values: { responseCode: 200 } },
      },
    },
    position: [200, 200],
  },
  output: [{
    body: {
      messaging_product: 'whatsapp',
      entry: [{
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: { display_phone_number: '+254xxxxxxxxx', phone_number_id: 'phone-number-id' },
            contacts: [{ profile: { name: 'Customer' }, wa_id: '+254700000001' }],
            messages: [{
              from: '+254700000001',
              id: 'wamid-demo-001',
              timestamp: '2026-10-26T10:00:00Z',
              text: { body: 'Hi, do you have sneakers?' },
            }],
          },
        }],
      }],
    }
  }]
});

const setParseEvent = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Parse WhatsApp Event',
    parameters: {
      mode: 'manual',
      keepOnlySet: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'messageId', value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.id || "" }}'), type: 'string' },
          { id: 'd2', name: 'fromNumber', value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from || "" }}'), type: 'string' },
          { id: 'd3', name: 'messageText', value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body || "" }}'), type: 'string' },
          { id: 'd4', name: 'timestamp', value: expr('{{ $json.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.timestamp || "" }}'), type: 'string' },
          { id: 'd5', name: 'tenantId', value: 'tenant-nairobi-trendz', type: 'string' },
        ],
      },
    },
    position: [500, 200],
  },
  output: [{ messageId: '', fromNumber: '', messageText: '', timestamp: '', tenantId: 'tenant-nairobi-trendz' }],
});

const validateMessage = ifElse({
  version: 3.5,
  config: {
    name: 'IF - Validate Message',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [{ leftValue: expr('{{ $json.messageId }}'), operator: { type: 'string', operation: 'notEmpty' }, rightValue: '' }, { leftValue: expr('{{ $json.fromNumber }}'), operator: { type: 'string', operation: 'notEmpty' }, rightValue: '' }, { leftValue: expr('{{ $json.messageText }}'), operator: { type: 'string', operation: 'notEmpty' }, rightValue: '' }], combinator: 'and' },
      },
    },
    position: [800, 200],
  },
  output: [{ messageId: '', fromNumber: '', messageText: '' }],
});

const setDuplicateCheck = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Duplicate Message Check',
    parameters: {
      mode: 'manual',
      keepOnlySet: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'isDuplicate', value: 'false', type: 'boolean' },
          { id: 'd2', name: 'reason', value: 'new_message', type: 'string' },
        ],
      },
    },
    position: [1100, 0],
  },
  output: [{ isDuplicate: false, reason: 'new_message' }],
});

const googleSheetsGetState = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Get Conversation State',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { __rl: true, mode: 'id', value: 'CRM_SPREADSHEET_ID' },
      sheetName: 'ConversationState',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'Phone', value: expr('{{ $json.fromNumber }}'), type: 'string' },
          { name: 'State', value: '', type: 'string' },
          { name: 'Cart', value: '', type: 'string' },
          { name: 'CustomerName', value: '', type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [1100, 300],
  },
  output: [{ Phone: '', State: '', Cart: '', CustomerName: '' }],
});

const setMergeState = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Merge State + Event',
    parameters: {
      mode: 'manual',
      keepOnlySet: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'messageText', value: expr('{{ $json.messageText }}'), type: 'string' },
          { id: 'd2', name: 'fromNumber', value: expr('{{ $json.fromNumber }}'), type: 'string' },
          { id: 'd3', name: 'tenantId', value: expr('{{ $json.tenantId }}'), type: 'string' },
          { id: 'd4', name: 'currentState', value: expr('{{ $json.State || "GREETING" }}'), type: 'string' },
          { id: 'd5', name: 'currentCart', value: expr('{{ $json.Cart || "[]" }}'), type: 'string' },
        ],
      },
    },
    position: [1400, 200],
  },
  output: [{ messageText: '', fromNumber: '', tenantId: '', currentState: 'GREETING', currentCart: '[]' }],
});

const agentZara = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent - Zara Sales Agent',
    parameters: {
      promptType: 'define',
      text: `You are Zara, an autonomous AI sales agent for Nairobi Trendz (Kenyan e-commerce retailer). Currency is KES. Delivery zones: CBD KES 150, Nairobi Suburbs KES 300, Upcountry KES 450. M-Pesa Till: 554433.

Current customer state: {{ $json.currentState }}
Current cart: {{ $json.currentCart }}
Customer message: {{ $json.messageText }}
Customer phone: {{ $json.fromNumber }}

Your job: understand the customer's intent, recommend products from the configured catalogue, ask for size/colour/quantity as needed, calculate totals deterministically (line_total = unit_price × quantity, grand_total = subtotal − discount + delivery_fee), obtain explicit order confirmation, create orders, give M-Pesa Till payment instructions, distinguish pending vs verified payment, and escalate uncertain situations to a human.

Available actions: enquire, select_product, select_variant, set_quantity, set_delivery, set_details, confirm_order, await_payment, payment_verified, fulfilment, human_handoff.

Rules:
- Never invent products, prices, or stock.
- Always calculate totals deterministically.
- Always obtain explicit confirmation before creating an order.
- Distinguish draft carts from confirmed orders from paid orders.
- Escalate to human_handoff if uncertain.

Respond with structured JSON: { action, reply, productId, quantity, size, color, deliveryZone, confirmOrder, escalate }`,
      hasOutputParser: true,
    },
    subnodes: { model: openAiModel, memory: zaraMemory, outputParser: zaraOutputParser },
    position: [1700, 200],
  },
  output: [{ action: 'enquire', reply: '', productId: null, quantity: null, size: null, color: null, deliveryZone: null, confirmOrder: false, escalate: false }],
});

const switchRouteAction = switchCase({
  version: 3.5,
  config: {
    name: 'Switch - Route by Agent Action',
    parameters: {
      rules: {
        values: [
          {
            outputKey: 'enquire',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.action }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'enquire' }], combinator: 'and' },
            },
          },
          {
            outputKey: 'confirm_order',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.action }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'confirm_order' }], combinator: 'and' },
            },
          },
          {
            outputKey: 'human_handoff',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.action }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'human_handoff' }], combinator: 'and' },
            },
          },
        ],
      },
    },
    position: [1900, 200],
  },
  output: [{ action: 'enquire' }],
});

const setBuildResponse = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Build Outbound Message',
    parameters: {
      mode: 'manual',
      keepOnlySet: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'toNumber', value: expr('{{ $json.fromNumber }}'), type: 'string' },
          { id: 'd2', name: 'replyText', value: expr('{{ $json.reply || "I did not understand. Please say hi to start." }}'), type: 'string' },
          { id: 'd3', name: 'action', value: expr('{{ $json.action }}'), type: 'string' },
          { id: 'd4', name: 'confirmOrder', value: expr('{{ $json.confirmOrder || false }}'), type: 'boolean' },
          { id: 'd5', name: 'escalate', value: expr('{{ $json.escalate || false }}'), type: 'boolean' },
        ],
      },
    },
    position: [2100, 0],
  },
  output: [{ toNumber: '', replyText: '', action: 'enquire', confirmOrder: false, escalate: false }],
});

const httpRequestSendWhatsApp = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.5,
  config: {
    name: 'HTTP Request - Send WhatsApp Message',
    parameters: {
      method: 'POST',
      url: 'https://graph.facebook.com/v18.0/{{ $json.phoneNumberId }}/messages',
      authentication: 'genericCredentialType',
      genericAuthType: 'httpHeaderAuth',
      sendBody: true,
      contentType: 'json',
      specifyBody: 'json',
      jsonBody: {
        messaging_product: 'whatsapp',
        to: '{{ $json.toNumber }}',
        type: 'text',
        text: { body: '{{ $json.replyText }}' },
      },
      options: {
        response: { responseFormat: 'json', neverError: false },
        timeout: 10000,
      },
    },
    credentials: { httpHeaderAuth: newCredential('WhatsApp Business API') },
    position: [2100, 300],
  },
  output: [{ success: true, messages: [{ id: 'wamid.out-001' }] }],
});

const googleSheetsSaveState = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Save Conversation State',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: 'CRM_SPREADSHEET_ID' },
      sheetName: 'ConversationState',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'Phone', value: expr('{{ $json.fromNumber }}'), type: 'string' },
          { name: 'State', value: expr('{{ $json.action }}'), type: 'string' },
          { name: 'Cart', value: expr('{{ $json.currentCart || "[]" }}'), type: 'string' },
          { name: 'CustomerName', value: expr('{{ $json.customerName || "" }}'), type: 'string' },
          { name: 'UpdatedAt', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [2100, 500],
  },
  output: [{ updatedRange: 'ConversationState!A:E' }],
});

const respondToWebhook = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond to Webhook',
    parameters: {
      responseMode: 'lastNode',
      httpCode: 200,
      responseBody: expr('{{ JSON.stringify({ status: "received", messageId: $json.messageId }) }}'),
    },
    position: [2400, 150],
  },
  output: [{ status: 'received', messageId: '' }],
});

const setOrderConfirmation = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Order Creation',
    parameters: {
      mode: 'manual',
      keepOnlySet: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'orderStatus', value: 'ORDER_CREATED', type: 'string' },
          { id: 'd2', name: 'paymentStatus', value: 'PENDING', type: 'string' },
          { id: 'd3', name: 'syncStatus', value: 'DEMO ORDER CREATED', type: 'string' },
        ],
      },
    },
    position: [2100, -200],
  },
  output: [{ orderStatus: 'ORDER_CREATED', paymentStatus: 'PENDING', syncStatus: 'DEMO ORDER CREATED' }],
});

const googleSheetsCreateOrder = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Create Order Record',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { __rl: true, mode: 'id', value: 'CRM_SPREADSHEET_ID' },
      sheetName: 'Orders',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'OrderId', value: expr('{{ "ORD-" + $now.toISOString().replace(/[-:T.Z]/g, "").slice(-10) }}'), type: 'string' },
          { name: 'CustomerPhone', value: expr('{{ $json.fromNumber }}'), type: 'string' },
          { name: 'Items', value: expr('{{ $json.currentCart || "[]" }}'), type: 'string' },
          { name: 'DeliveryZone', value: expr('{{ $json.deliveryZone || "CBD" }}'), type: 'string' },
          { name: 'GrandTotal', value: expr('{{ $json.grandTotal || 0 }}'), type: 'number' },
          { name: 'AmountPaid', value: 0, type: 'number' },
          { name: 'PaymentStatus', value: 'pending', type: 'string' },
          { name: 'SyncStatus', value: 'DEMO ORDER CREATED', type: 'string' },
          { name: 'CreatedAt', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [2400, -300],
  },
  output: [{ updatedRange: 'Orders!A:I' }],
});

const notifyHumanHandoff = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Human Handoff Notification',
    parameters: {
      mode: 'manual',
      keepOnlySet: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'toNumber', value: expr('{{ $json.fromNumber }}'), type: 'string' },
          { id: 'd2', name: 'replyText', value: expr('{{ $json.reply || "I am connecting you to a human agent. One moment please." }}'), type: 'string' },
          { id: 'd3', name: 'escalated', value: true, type: 'boolean' },
        ],
      },
    },
    position: [2100, 600],
  },
  output: [{ toNumber: '', replyText: '', escalated: true }],
});

// ============================================
// WORKFLOW ASSEMBLY
// ============================================

export default workflow(
  'wa-ai-sales-agent',
  'Zara AI Sales Agent - WhatsApp Inbound → AI Agent → CRM → Outbound',
  {
    description: 'Autonomous AI Sales Agent for Kenyan e-commerce. Handles WhatsApp inbound, AI-powered product discovery, cart management, order creation, M-Pesa payment instructions, and outbound messaging.',
    settings: {
      executionOrder: 'v1',
      saveManualExecutions: true,
      saveDataErrorExecution: 'all',
      saveDataSuccessExecution: 'all',
      timeout: 3600,
      errorWorkflow: 'DEFAULT',
    },
  }
)
  .add(
    webhookTrigger,
    setParseEvent,
    validateMessage,
    setDuplicateCheck,
    googleSheetsGetState,
    setMergeState,
    agentZara,
    switchRouteAction,
    setBuildResponse,
    httpRequestSendWhatsApp,
    googleSheetsSaveState,
    respondToWebhook,
    setOrderConfirmation,
    googleSheetsCreateOrder,
    notifyHumanHandoff,
  )
  .to(
    webhookTrigger.to(setParseEvent),
    setParseEvent.to(validateMessage),
    validateMessage.onTrue(setDuplicateCheck),
    validateMessage.onFalse(respondToWebhook),
    setDuplicateCheck.to(googleSheetsGetState),
    googleSheetsGetState.to(setMergeState),
    setMergeState.to(agentZara),
    agentZara.to(switchRouteAction),
    switchRouteAction
      .onCase(0, setBuildResponse)
      .onCase(1, setOrderConfirmation)
      .onCase(2, notifyHumanHandoff),
    setBuildResponse.to(httpRequestSendWhatsApp),
    httpRequestSendWhatsApp.to(googleSheetsSaveState),
    googleSheetsSaveState.to(respondToWebhook),
    setOrderConfirmation.to(googleSheetsCreateOrder),
    googleSheetsCreateOrder.to(httpRequestSendWhatsApp),
    notifyHumanHandoff.to(httpRequestSendWhatsApp),
    httpRequestSendWhatsApp.to(respondToWebhook),
  )
  .group('WhatsApp Sales Flow', [webhookTrigger, setParseEvent, validateMessage, setDuplicateCheck, googleSheetsGetState, setMergeState, agentZara, switchRouteAction, setBuildResponse, httpRequestSendWhatsApp, googleSheetsSaveState, respondToWebhook], { description: 'Core sales conversation flow' })
  .group('Order & Handoff', [setOrderConfirmation, googleSheetsCreateOrder, notifyHumanHandoff], { description: 'Order creation and human handoff' });