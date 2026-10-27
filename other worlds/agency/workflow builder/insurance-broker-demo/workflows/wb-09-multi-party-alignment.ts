import { workflow, node, trigger, sticky, expr, switchCase, merge } from '@n8n/workflow-sdk';

// ============================================
// CREDENTIALS (never hardcode secrets in text fields)
// ============================================

const whatsAppCredential = newCredential('WhatsApp Business');
const smsCredential = newCredential('SMS Gateway');
const gmailCredential = newCredential('Gmail');
const sheetsCredential = newCredential('Google Sheets');

const MILESTONE_TRACKER_SHEET_ID = 'milestone-tracker-spreadsheet-id';

// ============================================
// TRIGGERS
// ============================================

// Entry from Chain 4 (operations-hub) when a multi-party milestone changes
const milestoneChangeTrigger = trigger({
  type: 'n8n-nodes-base.executeWorkflowTrigger',
  version: 1.3,
  config: {
    name: 'Milestone Change Trigger',
    parameters: { inputSource: 'passthrough' },
  },
  position: [200, 200],
  output: [{
    caseId: 'CASE-001',
    clientName: 'Jane Doe',
    clientEmail: 'jane@example.com',
    clientPhone: '+254700000001',
    insurerName: 'Britam',
    insurerEmail: 'claims@britam.com',
    insurerPhone: '+254700000002',
    lossAdjusterName: 'Peter Adjuster',
    lossAdjusterEmail: 'peter@adjusters.co.ke',
    lossAdjusterPhone: '+254700000003',
    milestone: 'Verified',
    milestoneDate: '2026-10-22T00:00:00.000Z',
    previousMilestone: 'Uploaded',
  }],
});

// ============================================
// NORMALIZE INCOMING MILESTONE DATA
// ============================================

const normalizeMilestone = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize Milestone Change',
    parameters: {
      values: {
        string: [
          { name: 'caseId', value: expr('{{ $json.caseId || "" }}'), type: 'string' },
          { name: 'clientName', value: expr('{{ $json.clientName || "" }}'), type: 'string' },
          { name: 'clientEmail', value: expr('{{ $json.clientEmail || "" }}'), type: 'string' },
          { name: 'clientPhone', value: expr('{{ $json.clientPhone || "" }}'), type: 'string' },
          { name: 'insurerName', value: expr('{{ $json.insurerName || "" }}'), type: 'string' },
          { name: 'insurerEmail', value: expr('{{ $json.insurerEmail || "" }}'), type: 'string' },
          { name: 'insurerPhone', value: expr('{{ $json.insurerPhone || "" }}'), type: 'string' },
          { name: 'lossAdjusterName', value: expr('{{ $json.lossAdjusterName || "" }}'), type: 'string' },
          { name: 'lossAdjusterEmail', value: expr('{{ $json.lossAdjusterEmail || "" }}'), type: 'string' },
          { name: 'lossAdjusterPhone', value: expr('{{ $json.lossAdjusterPhone || "" }}'), type: 'string' },
          { name: 'milestone', value: expr('{{ $json.milestone || "Document Requested" }}'), type: 'string' },
          { name: 'milestoneDate', value: expr('{{ $json.milestoneDate || $now.toISO() }}'), type: 'string' },
          { name: 'previousMilestone', value: expr('{{ $json.previousMilestone || "" }}'), type: 'string' },
        ],
      },
      options: { keepOnlySet: false },
    },
  },
  position: [520, 200],
  output: [{
    caseId: 'CASE-001', clientName: 'Jane Doe', clientEmail: 'jane@example.com',
    clientPhone: '+254700000001', insurerName: 'Britam', insurerEmail: 'claims@britam.com',
    insurerPhone: '+254700000002', lossAdjusterName: 'Peter Adjuster',
    lossAdjusterEmail: 'peter@adjusters.co.ke', lossAdjusterPhone: '+254700000003',
    milestone: 'Verified', milestoneDate: '2026-10-22T00:00:00.000Z',
    previousMilestone: 'Uploaded',
  }],
});

// ============================================
// BRANCH 1: CLIENT NOTIFICATION
// ============================================

const buildClientMessage = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Client Milestone Message',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'partyType', value: 'client', type: 'string' },
          { id: 'a2', name: 'channel', value: 'whatsapp', type: 'string' },
          { id: 'a3', name: 'contactValue', value: expr('{{ $json.clientPhone }}'), type: 'string' },
          { id: 'a4', name: 'message', value: expr('{{ "Hi " + $json.clientName + ", your document for case " + $json.caseId + " has reached: " + $json.milestone + ". " + ($json.milestone === "Verified" ? "Your documents are complete." : "Please check the portal for next steps.") }}'), type: 'string' },
        ],
      },
    },
  },
  position: [840, 0],
  output: [{
    partyType: 'client', channel: 'whatsapp', contactValue: '+254700000001',
    message: 'Hi Jane Doe, your document for case CASE-001 has reached: Verified. Your documents are complete.',
  }],
});

const sendClientNotification = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.2,
  config: {
    name: 'WhatsApp - Client Milestone Update',
    parameters: {
      method: 'POST',
      url: 'https://graph.facebook.com/v18.0/me/messages',
      sendBody: true,
      specifyBody: 'json',
      jsonBody: expr('{{ JSON.stringify({ messaging_product: "whatsapp", to: $json.contactValue, type: "text", text: { body: $json.message } }) }}'),
    },
  },
  credentials: { whatsAppBusinessApi: whatsAppCredential },
  position: [1160, 0],
  output: [{ messages: [{ id: 'whatsapp-client-001' }] }],
});

// ============================================
// BRANCH 2: INSURER NOTIFICATION
// ============================================

const buildInsurerMessage = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Insurer Milestone Message',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'partyType', value: 'insurer', type: 'string' },
          { id: 'a2', name: 'channel', value: 'email', type: 'string' },
          { id: 'a3', name: 'contactValue', value: expr('{{ $json.insurerEmail }}'), type: 'string' },
          { id: 'a4', name: 'message', value: expr('{{ "Milestone update for case " + $json.caseId + " (" + $json.clientName + "): " + $json.milestone + ". Previous: " + $json.previousMilestone + ". Date: " + $json.milestoneDate }}'), type: 'string' },
        ],
      },
    },
  },
  position: [840, 200],
  output: [{
    partyType: 'insurer', channel: 'email', contactValue: 'claims@britam.com',
    message: 'Milestone update for case CASE-001 (Jane Doe): Verified. Previous: Uploaded. Date: 2026-10-22T00:00:00.000Z',
  }],
});

const sendInsurerNotification = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Insurer Milestone Update',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: expr('{{ $json.contactValue }}'),
      subject: expr('{{ "Milestone update - Case " + $json.caseId + " - " + $json.milestone }}'),
      body: expr('{{ $json.message }}'),
    },
  },
  credentials: { gmailOAuth2: gmailCredential },
  position: [1160, 200],
  output: [{ id: 'email-insurer-001', status: 'sent' }],
});

// ============================================
// BRANCH 3: LOSS ADJUSTER NOTIFICATION
// ============================================

const buildLossAdjusterMessage = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Loss Adjuster Milestone Message',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'partyType', value: 'loss_adjuster', type: 'string' },
          { id: 'a2', name: 'channel', value: 'email', type: 'string' },
          { id: 'a3', name: 'contactValue', value: expr('{{ $json.lossAdjusterEmail }}'), type: 'string' },
          { id: 'a4', name: 'message', value: expr('{{ "Assessment milestone for case " + $json.caseId + ": " + $json.milestone + ". Client: " + $json.clientName + ". Date: " + $json.milestoneDate }}'), type: 'string' },
        ],
      },
    },
  },
  position: [840, 400],
  output: [{
    partyType: 'loss_adjuster', channel: 'email', contactValue: 'peter@adjusters.co.ke',
    message: 'Assessment milestone for case CASE-001: Verified. Client: Jane Doe. Date: 2026-10-22T00:00:00.000Z',
  }],
});

const sendLossAdjusterNotification = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Loss Adjuster Milestone Update',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: expr('{{ $json.contactValue }}'),
      subject: expr('{{ "Assessment milestone - Case " + $json.caseId + " - " + $json.milestone }}'),
      body: expr('{{ $json.message }}'),
    },
  },
  credentials: { gmailOAuth2: gmailCredential },
  position: [1160, 400],
  output: [{ id: 'email-adjuster-001', status: 'sent' }],
});

// ============================================
// MERGE ALL NOTIFICATIONS
// ============================================

const mergeNotifications = merge({
  version: 3.2,
  config: {
    name: 'Merge - All Party Notifications',
    parameters: { mode: 'append', numberInputs: 3 },
  },
  position: [1480, 200],
  output: [{ merged: true }],
});

// ============================================
// UPDATE MILESTONE TRACKER
// ============================================

const updateMilestoneTracker = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Update Milestone Tracker',
    parameters: {
      resource: 'sheet',
      operation: 'update',
      documentId: { mode: 'id', value: MILESTONE_TRACKER_SHEET_ID },
      sheetName: 'Milestones',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'Case ID', value: expr('{{ $json.caseId }}'), type: 'string' },
          { name: 'Current Milestone', value: expr('{{ $json.milestone }}'), type: 'string' },
          { name: 'Milestone Date', value: expr('{{ $json.milestoneDate }}'), type: 'string' },
          { name: 'Previous Milestone', value: expr('{{ $json.previousMilestone }}'), type: 'string' },
          { name: 'Client Notified', value: 'yes', type: 'string' },
          { name: 'Insurer Notified', value: 'yes', type: 'string' },
          { name: 'Adjuster Notified', value: 'yes', type: 'string' },
          { name: 'Last Updated', value: expr('{{ $now.toISO() }}'), type: 'string' },
        ],
      },
    },
  },
  credentials: { googleSheetsOAuth2Api: sheetsCredential },
  position: [1800, 200],
  output: [{ updatedRange: 'Milestones!A:H' }],
});

// ============================================
// LOG MILESTONE CHANGE
// ============================================

const logMilestoneChange = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Log Milestone Change',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'eventType', value: 'milestone_change', type: 'string' },
          { id: 'a2', name: 'caseId', value: expr('{{ $json.caseId }}'), type: 'string' },
          { id: 'a3', name: 'milestone', value: expr('{{ $json.milestone }}'), type: 'string' },
          { id: 'a4', name: 'notifiedParties', value: '["client", "insurer", "loss_adjuster"]', type: 'string' },
          { id: 'a5', name: 'timestamp', value: expr('{{ $now.toISO() }}'), type: 'string' },
        ],
      },
    },
  },
  position: [2120, 200],
  output: [{
    eventType: 'milestone_change', caseId: 'CASE-001', milestone: 'Verified',
    notifiedParties: '["client", "insurer", "loss_adjuster"]',
    timestamp: '2026-10-22T00:00:00.000Z',
  }],
});

const notePurpose = sticky('## WB-09 Multi-Party Alignment\nShared milestone tracker across broker, insurer, and loss adjuster. Milestones: Document Requested → Uploaded → Verified → Lodged with Insurer → Adjuster Assigned → Assessment Received → Underwriter Sign-off → Complete. Each milestone change triggers channel-appropriate notifications to all three parties and updates the milestone tracker.', [milestoneChangeTrigger], { color: 6 });

export default workflow('wb-09-multi-party-alignment', 'WB-09 Multi-Party Alignment')
  .add(milestoneChangeTrigger)
  .to(normalizeMilestone)
  .to(buildClientMessage.to(sendClientNotification.to(mergeNotifications.input(0))))
  .add(normalizeMilestone)
  .to(buildInsurerMessage.to(sendInsurerNotification.to(mergeNotifications.input(1))))
  .add(normalizeMilestone)
  .to(buildLossAdjusterMessage.to(sendLossAdjusterNotification.to(mergeNotifications.input(2))))
  .add(mergeNotifications)
  .to(updateMilestoneTracker)
  .to(logMilestoneChange)
  .add(notePurpose)
  .group('Party Notification', [normalizeMilestone, buildClientMessage, buildInsurerMessage, buildLossAdjusterMessage, sendClientNotification, sendInsurerNotification, sendLossAdjusterNotification, mergeNotifications], { description: 'Route milestone changes to client, insurer, and loss adjuster via their preferred channels' })
  .group('Milestone Tracking', [updateMilestoneTracker, logMilestoneChange], { description: 'Update milestone tracker and log the change for audit' });
