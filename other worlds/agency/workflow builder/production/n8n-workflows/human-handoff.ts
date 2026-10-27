// ============================================================================
// Human Handoff — Staff Notification
// Pattern: Webhook Processing (Webhook → Transform → Notify → Respond)
// Escalates unsupported/uncertain conversations to a human staff member via Slack.
// Slack credential must be configured in n8n.
// ============================================================================
import { workflow, node, trigger, expr } from '@n8n/workflow-sdk';

// ----------------------------------------------------------------------------
// 1. Webhook trigger — human handoff request (from AI agent or demo)
// ----------------------------------------------------------------------------
const handoffTrigger = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Human Handoff Webhook',
    parameters: {
      httpMethod: 'POST',
      path: 'human-handoff',
      responseMode: 'responseNode',
    },
    position: [200, 200],
  },
  output: [
    {
      body: {
        conversationId: 'conv_001',
        customerName: 'Jane Wanjiku',
        customerPhone: '+254712345678',
        reason: 'Customer requested custom wholesale pricing not in catalogue',
        tenantId: 'tn_nairobi_trendz',
      },
    },
  ],
});

// ----------------------------------------------------------------------------
// 2. Set — Normalize handoff payload
// ----------------------------------------------------------------------------
const normalizeInput = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize Handoff',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'conversationId', name: 'conversationId', value: expr('{{ $json.body?.conversationId ?? $json.conversationId ?? "" }}'), type: 'string' },
          { id: 'customerName', name: 'customerName', value: expr('{{ $json.body?.customerName ?? $json.customerName ?? "" }}'), type: 'string' },
          { id: 'customerPhone', name: 'customerPhone', value: expr('{{ $json.body?.customerPhone ?? $json.customerPhone ?? "" }}'), type: 'string' },
          { id: 'reason', name: 'reason', value: expr('{{ $json.body?.reason ?? $json.reason ?? "" }}'), type: 'string' },
          { id: 'tenantId', name: 'tenantId', value: expr('{{ $json.body?.tenantId ?? $json.tenantId ?? "" }}'), type: 'string' },
        ],
      },
    },
    position: [500, 200],
  },
  output: [
    {
      conversationId: 'conv_001',
      customerName: 'Jane Wanjiku',
      customerPhone: '+254712345678',
      reason: 'Customer requested custom wholesale pricing not in catalogue',
      tenantId: 'tn_nairobi_trendz',
    },
  ],
});

// ----------------------------------------------------------------------------
// 3. Slack — Notify staff of handoff
//    channelId is a tenant config value (credential checklist item).
// ----------------------------------------------------------------------------
const slackNotify = node({
  type: 'n8n-nodes-base.slack',
  version: 2.7,
  config: {
    name: 'Slack - Notify Staff',
    parameters: {
      resource: 'message',
      operation: 'post',
      authentication: 'oAuth2',
      select: 'channel',
      channelId: { __rl: true, mode: 'id', value: '<YOUR_SLACK_CHANNEL_ID>' },
      messageType: 'text',
      text: expr('🚨 *Human Handoff Required*\nTenant: {{ $json.tenantId }}\nCustomer: {{ $json.customerName }} ({{ $json.customerPhone }})\nConversation: {{ $json.conversationId }}\nReason: {{ $json.reason }}'),
      mrkdwn: true,
    },
    credentials: { slackOAuth2Api: newCredential('Slack') },
    position: [800, 200],
  },
  output: [{ ok: true }],
});

// ----------------------------------------------------------------------------
// 4. Respond — 200 OK
// ----------------------------------------------------------------------------
const respondOk = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond - OK',
    parameters: {
      respondWith: 'json',
      responseBody: { status: 'handoff_recorded' },
      options: { responseCode: 200 },
    },
    position: [1100, 200],
  },
  output: [{ status: 'handoff_recorded' }],
});

export default workflow('human-handoff', 'Human Handoff - Staff Notification')
  .add(handoffTrigger)
  .to(normalizeInput)
  .to(slackNotify.to(respondOk));
