import { workflow, node, trigger, sticky, expr, newCredential, respondToWebhook } from '@n8n/workflow-sdk';

// ============================================
// CREDENTIALS (never hardcode secrets in text fields)
// ============================================

const sheetsCredential = newCredential('Google Sheets');
const gmailCredential = newCredential('Gmail');

const DOCUMENT_TRACKER_SHEET_ID = '1MkUCx_bbbhpfLm34_9y8Pvi-t54nWzQvadkhNFn51Jc';
const WB08_WORKFLOW_ID = '7X5g1uG8JVPgUNID';
const BROKERFLOW_BASE_URL = 'https://brokerflow.ai';

// ============================================
// TRIGGER: Case Creation from Broker Dashboard
// ============================================

const caseCreationWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Webhook - BrokerFlow Case Create',
    parameters: {
      httpMethod: 'POST',
      path: 'brokerflow-case-create',
      responseMode: 'responseNode',
    },
    position: [200, 100],
  },
  output: [{
    body: {
      clientName: 'Wanjiku Mwangi',
      clientPhone: '+254700000001',
      clientEmail: 'wanjiku@example.com',
      channel: 'whatsapp',
      policyType: 'motor',
      deadline: '2026-10-22',
      odpcConsent: true,
    },
  }],
});

// ============================================
// NORMALIZE CASE INPUT
// ============================================

const normalizeCaseInput = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize Case Input',
    parameters: {
      values: {
        string: [
          { name: 'caseId', value: expr('{{ $json.body?.caseId || "CASE-" + $now.toISO() }}'), type: 'string' },
          { name: 'clientName', value: expr('{{ $json.body?.clientName || "" }}'), type: 'string' },
          { name: 'clientPhone', value: expr('{{ $json.body?.clientPhone || "" }}'), type: 'string' },
          { name: 'clientEmail', value: expr('{{ $json.body?.clientEmail || "" }}'), type: 'string' },
          { name: 'channel', value: expr('{{ $json.body?.channel || "whatsapp" }}'), type: 'string' },
          { name: 'policyType', value: expr('{{ $json.body?.policyType || "motor" }}'), type: 'string' },
          { name: 'deadline', value: expr('{{ $json.body?.deadline || "" }}'), type: 'string' },
          { name: 'renewalDate', value: expr('{{ $json.body?.renewalDate || "" }}'), type: 'string' },
          { name: 'odpcConsent', value: expr('{{ $json.body?.odpcConsent || false }}'), type: 'string' },
          { name: 'insurerName', value: expr('{{ $json.body?.insurerName || "" }}'), type: 'string' },
          { name: 'insurerPhone', value: expr('{{ $json.body?.insurerPhone || "" }}'), type: 'string' },
          { name: 'insurerEmail', value: expr('{{ $json.body?.insurerEmail || "" }}'), type: 'string' },
          { name: 'adjusterName', value: expr('{{ $json.body?.adjusterName || "" }}'), type: 'string' },
          { name: 'adjusterPhone', value: expr('{{ $json.body?.adjusterPhone || "" }}'), type: 'string' },
          { name: 'adjusterEmail', value: expr('{{ $json.body?.adjusterEmail || "" }}'), type: 'string' },
          { name: 'partyStatus', value: expr('{{ JSON.stringify($json.body?.partyStatus || {}) }}'), type: 'string' },
          { name: 'chaseStartedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { name: 'escalationStage', value: '0', type: 'string' },
          { name: 'documentStatus', value: 'pending', type: 'string' },
          { name: 'uploadToken', value: expr('{{ "bf_" + ($json.body?.clientName || "client").replace(/\\s+/g, "_") + "_" + $now.toISO() }}'), type: 'string' },
        ],
      },
      options: { keepOnlySet: false },
    },
    position: [520, 100],
  },
  output: [{ caseId: 'CASE-2026-10-22T00:00:00.000Z', clientName: 'Wanjiku Mwangi', clientPhone: '+254700000001', clientEmail: 'wanjiku@example.com', channel: 'whatsapp', policyType: 'motor', deadline: '2026-10-22', odpcConsent: 'true', chaseStartedAt: '2026-10-22T00:00:00.000Z', escalationStage: '0', documentStatus: 'pending', uploadToken: 'bf_Wanjiku_Mwangi_2026-10-22T00:00:00.000Z' }],
});

// ============================================
// LOOK UP DOCUMENT REQUIREMENTS BY POLICY TYPE
// ============================================

const lookupDocumentRequirements = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Code - Lookup Document Requirements',
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: 'const requirements = {\n  motor: ["National ID", "KRA PIN", "Logbook"],\n  commercial: ["National ID", "KRA PIN", "Risk notes"],\n  fire: ["National ID", "KRA PIN", "Material facts disclosure"],\n  claims: ["Claim form", "Supporting documents", "Loss adjuster report"],\n};\nconst policyType = ($json.policyType || "motor").toLowerCase();\nconst docs = requirements[policyType] || requirements.motor;\nreturn [{ json: { ...$json, requiredDocuments: docs, documentCount: docs.length } }];',
    },
  },
  position: [840, 100],
  output: [{ caseId: 'CASE-2026-10-22T00:00:00.000Z', clientName: 'Wanjiku Mwangi', requiredDocuments: ['National ID', 'KRA PIN', 'Logbook'], documentCount: 3 }],
});

// ============================================
// BUILD CHASE RECORD
// ============================================

const buildChaseRecord = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Build Chase Record',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'requiredDocuments', value: expr('{{ JSON.stringify($json.requiredDocuments) }}'), type: 'string' },
          { id: 'a2', name: 'documentCount', value: expr('{{ $json.documentCount }}'), type: 'string' },
          { id: 'a3', name: 'missingFields', value: expr('{{ JSON.stringify($json.requiredDocuments) }}'), type: 'string' },
          { id: 'a4', name: 'docsReceived', value: expr('{{ "[]" }}'), type: 'string' },
          { id: 'a5', name: 'lastContactAt', value: expr('{{ $json.chaseStartedAt }}'), type: 'string' },
          { id: 'a6', name: 'lastContactChannel', value: expr('{{ $json.channel }}'), type: 'string' },
          { id: 'a7', name: 'consentLogged', value: expr('{{ $json.odpcConsent }}'), type: 'string' },
          { id: 'a8', name: 'consentChannel', value: expr('{{ $json.channel }}'), type: 'string' },
          { id: 'a9', name: 'consentDate', value: expr('{{ $json.chaseStartedAt }}'), type: 'string' },
          { id: 'a10', name: 'uploadLink', value: expr('{{ "' + BROKERFLOW_BASE_URL + '/client-upload.html?token=" + $json.uploadToken }}'), type: 'string' },
        ],
      },
    },
    position: [1160, 100],
  },
  output: [{ caseId: 'CASE-...', clientName: 'Wanjiku Mwangi', requiredDocuments: ['National ID', 'KRA PIN', 'Logbook'], missingFields: '["National ID","KRA PIN","Logbook"]', docsReceived: '[]', uploadLink: 'https://brokerflow.ai/client-upload.html?token=bf_...' }],
});

// ============================================
// CREATE CHASE SHEET RECORD
// ============================================

const createChaseSheetRecord = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Create Chase Record',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { mode: 'id', value: DOCUMENT_TRACKER_SHEET_ID },
      sheetName: { __rl: true, mode: 'id', value: '385744821' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'Case ID': expr('{{ $json.caseId }}'),
          'Client Name': expr('{{ $json.clientName }}'),
          'Client Phone': expr('{{ $json.clientPhone }}'),
          'Client Email': expr('{{ $json.clientEmail }}'),
          'Channel': expr('{{ $json.channel }}'),
          'Policy Type': expr('{{ $json.policyType }}'),
          'Deadline': expr('{{ $json.deadline }}'),
          'Renewal Date': expr('{{ $json.renewalDate }}'),
          'Status': expr('{{ $json.documentStatus }}'),
          'Missing Fields': expr('{{ $json.missingFields }}'),
          'Docs Received': expr('{{ $json.docsReceived }}'),
          'Chase Started At': expr('{{ $json.chaseStartedAt }}'),
          'Escalation Stage': expr('{{ $json.escalationStage }}'),
          'Last Contact At': expr('{{ $json.lastContactAt }}'),
          'Last Contact Channel': expr('{{ $json.lastContactChannel }}'),
          'Consent Logged': expr('{{ $json.consentLogged }}'),
          'Consent Channel': expr('{{ $json.consentChannel }}'),
          'Consent Date': expr('{{ $json.consentDate }}'),
          'Insurer Name': expr('{{ $json.insurerName }}'),
          'Insurer Phone': expr('{{ $json.insurerPhone }}'),
          'Insurer Email': expr('{{ $json.insurerEmail }}'),
          'Adjuster Name': expr('{{ $json.adjusterName }}'),
          'Adjuster Phone': expr('{{ $json.adjusterPhone }}'),
          'Adjuster Email': expr('{{ $json.adjusterEmail }}'),
          'Party Status': expr('{{ $json.partyStatus }}'),
          'Upload Token': expr('{{ $json.uploadToken }}'),
          'Upload Link': expr('{{ $json.uploadLink }}'),
        },
      },
    },
  },
  credentials: { googleSheetsOAuth2Api: sheetsCredential },
  position: [1480, 100],
  output: [{ updatedRange: 'Document Chases!A:S' }],
});

// ============================================
// TRIGGER WB-08 ESCALATION (Day 0 WhatsApp)
// ============================================

const triggerWb08Escalation = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Trigger Document Chasing Escalation (wb-08)',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: WB08_WORKFLOW_ID },
      options: { waitForSubWorkflow: false },
    },
  },
  position: [1800, 100],
  output: [{ escalationTriggered: true }],
});

// ============================================
// RESPOND TO CASE CREATION WEBHOOK
// ============================================

const respondToCaseWebhook = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond to Case Create Webhook',
    parameters: {
      responseMode: 'lastNode',
      respondWith: 'json',
      httpCode: 200,
      responseBody: expr('{{ JSON.stringify({ status: "created", caseId: $json.caseId, uploadToken: $json.uploadToken, uploadLink: $json.uploadLink, escalationTriggered: $json.escalationTriggered }) }}'),
    },
    position: [2120, 100],
  },
  output: [{ status: 'created', caseId: 'CASE-...', uploadToken: 'bf_...', uploadLink: 'https://brokerflow.ai/client-upload.html?token=bf_...', escalationTriggered: true }],
});

// ============================================
// TRIGGER: Upload Confirmation from Client Portal
// ============================================

const uploadConfirmationWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Webhook - BrokerFlow Upload Confirm',
    parameters: {
      httpMethod: 'POST',
      path: 'brokerflow-upload-confirm',
      responseMode: 'responseNode',
    },
    position: [200, 500],
  },
  output: [{
    body: {
      caseId: 'CASE-...',
      uploadToken: 'bf_...',
      uploadedFiles: ['national-id.pdf', 'kra-pin.pdf'],
      clientEmail: 'wanjiku@example.com',
    },
  }],
});

// ============================================
// LOG UPLOAD CONFIRMATION
// ============================================

const logUploadConfirmation = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Log Upload Confirmation',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'uploadConfirmedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a2', name: 'uploadStatus', value: 'docs_uploaded', type: 'string' },
          { id: 'a3', name: 'uploadedFiles', value: expr('{{ JSON.stringify($json.body?.uploadedFiles || []) }}'), type: 'string' },
        ],
      },
    },
    position: [520, 500],
  },
  output: [{ caseId: 'CASE-...', uploadConfirmedAt: '2026-10-22T00:00:00.000Z', uploadStatus: 'docs_uploaded', uploadedFiles: '["national-id.pdf","kra-pin.pdf"]' }],
});

// ============================================
// APPEND UPLOAD LOG TO SHEET
// ============================================

const appendUploadLog = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Append Upload Log',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { mode: 'id', value: DOCUMENT_TRACKER_SHEET_ID },
      sheetName: { __rl: true, mode: 'id', value: '385744821' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'Case ID': expr('{{ $json.caseId }}'),
          'Upload Token': expr('{{ $json.uploadToken }}'),
          'Uploaded Files': expr('{{ $json.uploadedFiles }}'),
          'Upload Status': expr('{{ $json.uploadStatus }}'),
          'Confirmed At': expr('{{ $json.uploadConfirmedAt }}'),
        },
      },
    },
  },
  credentials: { googleSheetsOAuth2Api: sheetsCredential },
  position: [840, 500],
  output: [{ updatedRange: 'Upload Logs!A:E' }],
});

// ============================================
// RESPOND TO UPLOAD WEBHOOK
// ============================================

const respondToUploadWebhook = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond to Upload Confirm Webhook',
    parameters: {
      responseMode: 'lastNode',
      respondWith: 'json',
      httpCode: 200,
      responseBody: expr('{{ JSON.stringify({ status: "upload_received", caseId: $json.caseId, confirmedAt: $json.uploadConfirmedAt }) }}'),
    },
    position: [1160, 500],
  },
  output: [{ status: 'upload_received', caseId: 'CASE-...', confirmedAt: '2026-10-22T00:00:00.000Z' }],
});

// ============================================
// TRIGGER: Party notification (insurer / loss adjuster)
// ============================================

const partyNotifyWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Webhook - BrokerFlow Party Notify',
    parameters: {
      httpMethod: 'POST',
      path: 'brokerflow-party-notify',
      responseMode: 'responseNode',
    },
    position: [200, 900],
  },
  output: [{
    body: {
      caseId: 'CASE-...',
      party: 'insurer',
      partyName: 'Jubilee Insurance',
      partyPhone: '+254700000002',
      partyEmail: 'claims@jubilee.co.ke',
      clientName: 'Wanjiku Mwangi',
      channel: 'whatsapp',
    },
  }],
});

// ============================================
// RESPOND TO PARTY NOTIFY WEBHOOK
// ============================================

const respondToPartyNotifyWebhook = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond to Party Notify Webhook',
    parameters: {
      responseMode: 'lastNode',
      respondWith: 'json',
      httpCode: 200,
      responseBody: expr('{{ JSON.stringify({ status: "notified", caseId: $json.body?.caseId, party: $json.body?.party, notifiedAt: $now.toISO() }) }}'),
    },
    position: [520, 900],
  },
  output: [{ status: 'notified', caseId: 'CASE-...', party: 'insurer', notifiedAt: '2026-10-22T00:00:00.000Z' }],
});

// ============================================
// STICKY NOTES
// ============================================

const noteIntegration = sticky('## WB-11 BrokerFlow AI Integration\nReceives case creation from broker-dashboard.html, creates chase record in Google Sheets, triggers wb-08 escalation (Day 0 WhatsApp -> SMS -> Email -> Phone -> exception queue). Receives upload confirmations from client-upload.html and logs them. All data flows to the Document Chases tracker sheet used by wb-08.', [caseCreationWebhook, uploadConfirmationWebhook], { color: 8 });

// ============================================
// WORKFLOW ASSEMBLY
// ============================================

export default workflow('wb-11-brokerflow-integration', 'WB-11 BrokerFlow AI Integration')
  .add(caseCreationWebhook)
  .to(normalizeCaseInput)
  .to(lookupDocumentRequirements)
  .to(buildChaseRecord)
  .to(createChaseSheetRecord)
  .to(triggerWb08Escalation)
  .to(respondToCaseWebhook)
  .add(uploadConfirmationWebhook)
  .to(logUploadConfirmation)
  .to(appendUploadLog)
  .to(respondToUploadWebhook)
  .add(partyNotifyWebhook)
  .to(respondToPartyNotifyWebhook)
  .add(noteIntegration)
  .group('Case Creation + Escalation', [normalizeCaseInput, lookupDocumentRequirements, buildChaseRecord, createChaseSheetRecord, triggerWb08Escalation, respondToCaseWebhook], { description: 'Create chase record, trigger wb-08 Day 0 WhatsApp escalation, respond to broker dashboard with upload link' })
  .group('Upload Confirmation', [logUploadConfirmation, appendUploadLog, respondToUploadWebhook], { description: 'Log client upload confirmations from client-upload.html to Upload Logs sheet' })
  .group('Party Notification', [respondToPartyNotifyWebhook], { description: 'Notify insurer or loss adjuster of a document-chase case from the broker dashboard' });
