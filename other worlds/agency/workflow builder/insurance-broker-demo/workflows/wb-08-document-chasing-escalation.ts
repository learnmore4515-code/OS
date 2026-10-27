import { workflow, node, trigger, sticky, expr, switchCase } from '@n8n/workflow-sdk';

// ============================================
// CREDENTIALS (never hardcode secrets in text fields)
// ============================================

const gmailCredential = newCredential('Gmail');
const sheetsCredential = newCredential('Google Sheets');

const DOCUMENT_TRACKER_SHEET_ID = '1MkUCx_bbbhpfLm34_9y8Pvi-t54nWzQvadkhNFn51Jc';

// ============================================
// TRIGGERS
// ============================================

// Entry from Chain 4 (operations-hub) when doc verification is partial/invalid (Day 0)
const documentChaseTrigger = trigger({
  type: 'n8n-nodes-base.executeWorkflowTrigger',
  version: 1.3,
  config: {
    name: 'Document Chasing Trigger',
    parameters: { inputSource: 'passthrough' },
  },
  position: [200, 200],
  output: [{
    fileName: 'policy.pdf',
    clientName: 'Jane Doe',
    clientEmail: 'jane@example.com',
    clientPhone: '+254700000001',
    documentCategory: 'application',
    missingFields: ['KRA PIN'],
    chaseStartedAt: null,
    escalationStage: null,
  }],
});

// Daily schedule trigger for overdue scanning and cadence (+2, +4, +7, +14)
const scheduleTrigger = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: {
    name: 'Schedule - Daily Document Chase Scan',
    parameters: { triggerTimes: [{ mode: 'everyDay', hour: 9, minute: 0 }] },
  },
  position: [200, 500],
  output: [{ schedule: true }],
});

// ============================================
// CHAIN 1: IMMEDIATE DAY 0 (from Chain 4 partial/invalid)
// ============================================

const normalizeNewChase = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize New Chase',
    parameters: {
      values: {
        string: [
          { name: 'fileName', value: expr('{{ $json.fileName || "unknown" }}'), type: 'string' },
          { name: 'clientName', value: expr('{{ $json.clientName || "" }}'), type: 'string' },
          { name: 'clientEmail', value: expr('{{ $json.clientEmail || "" }}'), type: 'string' },
          { name: 'clientPhone', value: expr('{{ $json.clientPhone || "" }}'), type: 'string' },
          { name: 'documentCategory', value: expr('{{ $json.documentCategory || "general" }}'), type: 'string' },
          { name: 'missingFields', value: expr('{{ JSON.stringify($json.missingFields || []) }}'), type: 'string' },
          { name: 'chaseStartedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { name: 'escalationStage', value: '0', type: 'string' },
          { name: 'lastContactAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { name: 'lastContactChannel', value: 'gmail', type: 'string' },
          { name: 'consentLogged', value: 'false', type: 'string' },
          { name: 'documentStatus', value: 'pending', type: 'string' },
          { name: 'insurerName', value: expr('{{ $json.insurerName || "" }}'), type: 'string' },
          { name: 'insurerPhone', value: expr('{{ $json.insurerPhone || "" }}'), type: 'string' },
          { name: 'insurerEmail', value: expr('{{ $json.insurerEmail || "" }}'), type: 'string' },
          { name: 'adjusterName', value: expr('{{ $json.adjusterName || "" }}'), type: 'string' },
          { name: 'adjusterPhone', value: expr('{{ $json.adjusterPhone || "" }}'), type: 'string' },
          { name: 'adjusterEmail', value: expr('{{ $json.adjusterEmail || "" }}'), type: 'string' },
          { name: 'renewalDate', value: expr('{{ $json.renewalDate || "" }}'), type: 'string' },
        ],
      },
      options: { keepOnlySet: false },
    },
  },
  position: [520, 200],
  output: [{
    fileName: 'policy.pdf', clientName: 'Jane Doe', clientEmail: 'jane@example.com',
    clientPhone: '+254700000001', documentCategory: 'application',
    missingFields: '["KRA PIN"]', chaseStartedAt: '2026-10-22T00:00:00.000Z',
    escalationStage: '0', lastContactAt: '2026-10-22T00:00:00.000Z',
    lastContactChannel: 'gmail', consentLogged: 'false', documentStatus: 'pending',
    insurerName: 'Jubilee Insurance', insurerPhone: '+254700000002', insurerEmail: 'claims@jubilee.co.ke',
    adjusterName: 'Peter Adjusters Ltd', adjusterPhone: '+254723456789', adjusterEmail: 'peter@adjusters.co.ke',
  }],
});

const sendEmailDay0 = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Day 0 Secure Upload Link',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json.clientEmail }}'),
      subject: expr('{{ "Your document " + $json.fileName + " is missing — upload link" }}'),
      message: expr('{{ "Hi " + $json.clientName + ",\\n\\nYour document " + $json.fileName + " is missing: " + $json.missingFields + ".\\n\\nUpload here: https://brokerflow.ai/upload/" + $json.fileName + "\\n\\nBest regards,\\nBrokerFlow AI" }}'),
    },
  },
  credentials: { gmailOAuth2: gmailCredential },
  settings: { onError: 'continueErrorOutput' },
  position: [840, 200],
  output: [{ id: 'email-msg-000', status: 'sent' }],
});

const notifyInsurerDay0 = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.2,
  config: {
    name: 'Notify Insurer - Day 0',
    parameters: {
      method: 'POST',
      url: 'https://simongreenmmm.app.n8n.cloud/webhook/brokerflow-party-notify',
      sendBody: true,
      specifyBody: 'json',
      jsonBody: expr('{ caseId: "case-" + $json.fileName, party: "insurer", partyName: $json.insurerName, partyPhone: $json.insurerPhone, partyEmail: $json.insurerEmail, clientName: $json.clientName, clientPhone: $json.clientPhone, policyType: $json.documentCategory, deadline: $json.chaseStartedAt, uploadLink: "https://brokerflow.ai/upload/" + $json.fileName, channel: $json.lastContactChannel }'),
    },
  },
  position: [840, 350],
  output: [{ status: 'notified', party: 'insurer' }],
});

const notifyAdjusterDay0 = node({
  type: 'n8n-nodes-base.httpRequest',
  version: 4.2,
  config: {
    name: 'Notify Loss Adjuster - Day 0',
    parameters: {
      method: 'POST',
      url: 'https://simongreenmmm.app.n8n.cloud/webhook/brokerflow-party-notify',
      sendBody: true,
      specifyBody: 'json',
      jsonBody: expr('{ caseId: "case-" + $json.fileName, party: "adjuster", partyName: $json.adjusterName, partyPhone: $json.adjusterPhone, partyEmail: $json.adjusterEmail, clientName: $json.clientName, clientPhone: $json.clientPhone, policyType: $json.documentCategory, deadline: $json.chaseStartedAt, uploadLink: "https://brokerflow.ai/upload/" + $json.fileName, channel: $json.lastContactChannel }'),
    },
  },
  position: [840, 500],
  output: [{ status: 'notified', party: 'adjuster' }],
});

const logConsentDay0 = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Log ODPC Consent (Day 0)',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'consentLogged', value: 'true', type: 'string' },
          { id: 'a2', name: 'consentChannel', value: 'gmail', type: 'string' },
          { id: 'a3', name: 'consentDate', value: expr('{{ $now.toISO() }}'), type: 'string' },
        ],
      },
    },
  },
  position: [1160, 200],
  output: [{ consentLogged: 'true', consentChannel: 'gmail', consentDate: '2026-10-22T00:00:00.000Z' }],
});

const debugSendDay0 = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Code - Debug Send Result (Day 0)',
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: 'const input = $json;\nconst error = input.error || input.errorMessage || null;\nconst status = error ? "error" : "sent";\nconsole.log("[WB-08 DEBUG] Day 0 email send: client=" + input.clientEmail + ", status=" + status + ", error=" + (error || "none"));\nreturn [{ json: { ...input, sendStatus: status, sendError: error || "", debugAt: $now.toISO() } }];',
    },
  },
  position: [1160, 250],
  output: [{ clientEmail: 'jane@example.com', sendStatus: 'sent', sendError: '', debugAt: '2026-10-22T00:00:00.000Z' }],
});

const updateTrackerCreateRecord = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Create Chase Record',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { mode: 'id', value: DOCUMENT_TRACKER_SHEET_ID },
      sheetName: { __rl: true, mode: 'id', value: '385744821' },
      mode: 'manual',
      includeOtherFields: true,
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'File Name': expr('{{ $json.fileName }}'),
          'Client Name': expr('{{ $json.clientName }}'),
          'Client Email': expr('{{ $json.clientEmail }}'),
          'Client Phone': expr('{{ $json.clientPhone }}'),
          'Document Category': expr('{{ $json.documentCategory }}'),
          'Status': expr('{{ $json.documentStatus }}'),
          'Missing Fields': expr('{{ $json.missingFields }}'),
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
          'Renewal Date': expr('{{ $json.renewalDate }}'),
        },
      },
    },
  },
  credentials: { googleSheetsOAuth2Api: sheetsCredential },
  position: [1480, 200],
  output: [{ updatedRange: 'Document Chases!A:T' }],
});

// ============================================
// CHAIN 2: SCHEDULED DAILY SCAN (+2, +4, +7, +14)
// ============================================

const readTracker = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Read Document Chases',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { mode: 'id', value: DOCUMENT_TRACKER_SHEET_ID },
      sheetName: { __rl: true, mode: 'id', value: '385744821' },
    },
  },
  credentials: { googleSheetsOAuth2Api: sheetsCredential },
  position: [520, 500],
  output: [{
    'File Name': 'policy.pdf', 'Client Name': 'Jane Doe', 'Client Email': 'jane@example.com',
    'Client Phone': '+254700000001', 'Document Category': 'application', 'Status': 'pending',
    'Missing Fields': '["KRA PIN"]', 'Chase Started At': '2026-10-20T00:00:00.000Z',
    'Escalation Stage': '0', 'Last Contact At': '2026-10-20T00:00:00.000Z',
    'Last Contact Channel': 'gmail', 'Consent Logged': 'true', 'Consent Channel': 'gmail',
    'Consent Date': '2026-10-20T00:00:00.000Z',
  }],
});

const filterPendingDocs = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Code - Filter Pending Chases',
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: 'const now = new Date();\nconst results = [];\n$input.all().forEach(item => {\n  const json = item.json;\n  // Document chasing (existing logic)\n  if (json.Status !== "verified" && json["Chase Started At"]) {\n    const started = new Date(json["Chase Started At"]);\n    const daysSince = Math.floor((now.getTime() - started.getTime()) / (1000 * 60 * 60 * 24));\n    const stage = parseInt(json["Escalation Stage"] || "0", 10);\n    let targetStage = 0;\n    if (daysSince >= 14) targetStage = 4;\n    else if (daysSince >= 7) targetStage = 3;\n    else if (daysSince >= 4) targetStage = 2;\n    else if (daysSince >= 2) targetStage = 1;\n    if (targetStage > stage) {\n      results.push({\n        json: {\n          ...json,\n          type: "doc_chase",\n          daysSinceChase: daysSince,\n          currentStage: stage,\n          targetStage: targetStage,\n        }\n      });\n    }\n  }\n  // Renewal follow-up (Benson: 60 / 30 / 7 / 3 days -> targetStage 5-8)\n  if (json["Renewal Date"]) {\n    const renewal = new Date(json["Renewal Date"]);\n    const daysUntilRenewal = Math.floor((renewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));\n    const renewalStage = parseInt(json["Renewal Stage"] || "0", 10);\n    let targetStage = 0;\n    if (daysUntilRenewal <= 3) targetStage = 8;\n    else if (daysUntilRenewal <= 7) targetStage = 7;\n    else if (daysUntilRenewal <= 30) targetStage = 6;\n    else if (daysUntilRenewal <= 60) targetStage = 5;\n    if (targetStage > renewalStage && daysUntilRenewal >= 0) {\n      results.push({\n        json: {\n          ...json,\n          type: "renewal",\n          daysUntilRenewal: daysUntilRenewal,\n          currentStage: renewalStage,\n          targetStage: targetStage,\n        }\n      });\n    }\n  }\n});\nreturn results;',
    },
  },
  position: [840, 500],
  output: [{
    'File Name': 'policy.pdf', 'Client Name': 'Jane Doe', 'Client Email': 'jane@example.com',
    'Client Phone': '+254700000001', 'Status': 'pending', 'Missing Fields': '["KRA PIN"]',
    'Chase Started At': '2026-10-20T00:00:00.000Z', 'Escalation Stage': '0',
    'Last Contact At': '2026-10-20T00:00:00.000Z', 'Last Contact Channel': 'gmail',
    'Consent Logged': 'true', 'Consent Channel': 'gmail', 'Consent Date': '2026-10-20T00:00:00.000Z',
    daysSinceChase: 2, currentStage: 0, targetStage: 1,
  }],
});

const routeByEscalationDay = switchCase({
  version: 3.5,
  config: {
    name: 'Switch - Escalation Day',
    parameters: {
      rules: {
        values: [
          {
            outputKey: 'day2',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 1 }],
              combinator: 'and',
            },
          },
          {
            outputKey: 'day4',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 2 }],
              combinator: 'and',
            },
          },
          {
            outputKey: 'day7',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 3 }],
              combinator: 'and',
            },
          },
          {
            outputKey: 'day14',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 4 }],
              combinator: 'and',
            },
          },
          {
            outputKey: 'renewal60',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 5 }],
              combinator: 'and',
            },
          },
          {
            outputKey: 'renewal30',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 6 }],
              combinator: 'and',
            },
          },
          {
            outputKey: 'renewal7',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 7 }],
              combinator: 'and',
            },
          },
          {
            outputKey: 'renewal3',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [{ leftValue: expr('{{ $json.targetStage }}'), operator: { type: 'number', operation: 'equals' }, rightValue: 8 }],
              combinator: 'and',
            },
          },
        ],
      },
      options: { fallbackOutput: 'extra', renameFallbackOutput: 'No Action Due' },
    },
  },
  position: [1160, 500],
  output: [{ targetStage: 1 }],
});

// --- Day +2: Email ---
const sendEmailDay2 = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Day +2 Nudge',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json["Client Email"] }}'),
      subject: expr('{{ "Reminder: please upload documents for " + $json["File Name"] }}'),
      message: expr('{{ "Dear " + $json["Client Name"] + ",\\n\\nThis is a reminder to please upload: " + $json["Missing Fields"] + " for " + $json["File Name"] + ".\\n\\nUpload link: https://brokerflow.ai/upload/" + $json["File Name"] + "\\n\\nBest regards,\\nBrokerFlow AI" }}'),
    },
  },
  credentials: { gmailOAuth2: gmailCredential },
  settings: { onError: 'continueErrorOutput' },
  position: [1480, 300],
  output: [{ id: 'email-msg-002', status: 'sent' }],
});

// --- Day +4: Email ---
const sendEmailDay4 = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Day +4 Formal Reminder',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json["Client Email"] }}'),
      subject: expr('{{ "Outstanding documents for " + $json["File Name"] }}'),
      message: expr('{{ "Dear " + $json["Client Name"] + ",\\n\\nYour document " + $json["File Name"] + " is still missing: " + $json["Missing Fields"] + ".\\nPlease upload via: https://brokerflow.ai/upload/" + $json["File Name"] + "\\n\\nBest regards,\\nBrokerFlow AI" }}'),
    },
  },
  credentials: { gmailOAuth2: gmailCredential },
  position: [1480, 500],
  output: [{ id: 'email-msg-004', status: 'sent' }],
});

// --- Day +7: Phone-call escalation task ---
const createPhoneTaskDay7 = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Day +7 Phone Call Task',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'taskType', value: 'phone_call', type: 'string' },
          { id: 'a2', name: 'assignedTo', value: 'Broker', type: 'string' },
          { id: 'a3', name: 'taskDescription', value: expr('{{ "Call " + $json["Client Name"] + " (" + $json["Client Phone"] + ") regarding missing docs: " + $json["Missing Fields"] }}'), type: 'string' },
          { id: 'a4', name: 'dueDate', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a5', name: 'escalationStage', value: '3', type: 'string' },
          { id: 'a6', name: 'lastContactChannel', value: 'phone', type: 'string' },
          { id: 'a7', name: 'lastContactAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
        ],
      },
    },
  },
  position: [1480, 700],
  output: [{ taskType: 'phone_call', assignedTo: 'Broker', taskDescription: 'Call Jane Doe...', dueDate: '2026-10-27T00:00:00.000Z', escalationStage: '3', lastContactChannel: 'phone', lastContactAt: '2026-10-27T00:00:00.000Z' }],
});

// --- Day +7: Exception queue (wb-06 pattern) ---
const createExceptionDay7 = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Day +7 Exception Queue Entry',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'exceptionId', value: expr('{{ "doc-chase-" + $json["File Name"] + "-" + $now.toISO() }}'), type: 'string' },
          { id: 'a2', name: 'exceptionType', value: 'Document Chasing Exception', type: 'string' },
          { id: 'a3', name: 'severity', value: 'high', type: 'string' },
          { id: 'a4', name: 'assignedTo', value: 'Senior Broker', type: 'string' },
          { id: 'a5', name: 'slaHours', value: 24, type: 'number' },
          { id: 'a6', name: 'recommendedAction', value: expr('{{ "Client non-cooperative past 7 days for " + $json["File Name"] + ". Missing: " + $json["Missing Fields"] + ". Escalate to senior broker for manual intervention." }}'), type: 'string' },
          { id: 'a7', name: 'sourceWorkflow', value: 'Document Chasing Escalation', type: 'string' },
          { id: 'a8', name: 'sourceId', value: expr('{{ $json["File Name"] }}'), type: 'string' },
          { id: 'a9', name: 'createdAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Exception Handling', type: 'string' },
          { id: 'a11', name: 'clientEmail', value: expr('{{ $json["Client Email"] }}'), type: 'string' },
          { id: 'a12', name: 'clientPhone', value: expr('{{ $json["Client Phone"] }}'), type: 'string' },
          { id: 'a13', name: 'missingFields', value: expr('{{ $json["Missing Fields"] }}'), type: 'string' },
        ],
      },
    },
  },
  position: [1480, 900],
  output: [{
    exceptionId: 'doc-chase-policy.pdf-2026-10-22T00:00:00.000Z', exceptionType: 'Document Chasing Exception',
    severity: 'high', assignedTo: 'Senior Broker', slaHours: 24,
    recommendedAction: 'Client non-cooperative past 7 days...', sourceWorkflow: 'Document Chasing Escalation',
    sourceId: 'policy.pdf', createdAt: '2026-10-22T00:00:00.000Z', workflow: 'Exception Handling',
    clientEmail: 'jane@example.com', clientPhone: '+254700000001', missingFields: '["KRA PIN"]',
  }],
});

// --- No action due ---
const skipNoAction = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - No Action Due',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'action', value: 'no_action_due', type: 'string' },
        ],
      },
    },
  },
  position: [1480, 1100],
  output: [{ action: 'no_action_due' }],
});

// --- Renewal reminders (Benson: 60/30/7/3 days) ---
const renewalReminderDay60 = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Renewal -60 Days',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json["Client Email"] }}'),
      subject: expr('{{ "Renewal reminder: Your " + $json["Document Category"] + " policy renews in 60 days" }}'),
      message: expr('{{ "Dear " + $json["Client Name"] + ",\\n\\nYour " + $json["Document Category"] + " insurance policy renews in 60 days on " + $json["Renewal Date"] + ".\\nPlease contact us to arrange renewal documents.\\n\\nBest regards,\\nBrokerFlow AI" }}'),
    },
    credentials: { gmailOAuth2: gmailCredential },
    settings: { onError: 'continueErrorOutput' },
    position: [1800, 300],
  },
});

const renewalReminderDay30 = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Renewal -30 Days',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json["Client Email"] }}'),
      subject: expr('{{ "Renewal reminder: Your " + $json["Document Category"] + " policy renews in 30 days" }}'),
      message: expr('{{ "Dear " + $json["Client Name"] + ",\\n\\nYour " + $json["Document Category"] + " insurance policy renews in 30 days on " + $json["Renewal Date"] + ".\\nPlease contact us to arrange renewal documents.\\n\\nBest regards,\\nBrokerFlow AI" }}'),
    },
    credentials: { gmailOAuth2: gmailCredential },
    settings: { onError: 'continueErrorOutput' },
    position: [1800, 500],
  },
});

const renewalReminderDay7 = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Renewal -7 Days',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json["Client Email"] }}'),
      subject: expr('{{ "Renewal reminder: " + $json["Document Category"] + " policy renews in 7 days" }}'),
      message: expr('{{ "Dear " + $json["Client Name"] + ",\\n\\nYour " + $json["Document Category"] + " insurance policy renews in 7 days on " + $json["Renewal Date"] + ".\\nPlease contact us to arrange renewal documents.\\n\\nBest regards,\\nBrokerFlow AI" }}'),
    },
    credentials: { gmailOAuth2: gmailCredential },
    settings: { onError: 'continueErrorOutput' },
    position: [1800, 700],
  },
});

const renewalReminderDay3 = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Renewal -3 Days',
    parameters: {
      resource: 'message',
      operation: 'send',
      sendTo: expr('{{ $json["Client Email"] }}'),
      subject: expr('{{ "URGENT: Renewal in 3 days — " + $json["Document Category"] + " policy" }}'),
      message: expr('{{ "Dear " + $json["Client Name"] + ",\\n\\nURGENT: Your " + $json["Document Category"] + " insurance policy renews in 3 days on " + $json["Renewal Date"] + ".\\nContact us immediately to avoid lapse in coverage.\\n\\nBest regards,\\nBrokerFlow AI" }}'),
    },
    credentials: { gmailOAuth2: gmailCredential },
    settings: { onError: 'continueErrorOutput' },
    position: [1800, 900],
  },
});

// ============================================
// UPDATE TRACKER (stage + last contact)
// ============================================

const updateTrackerStage = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Update Chase Stage',
    parameters: {
      resource: 'sheet',
      operation: 'update',
      documentId: { mode: 'id', value: DOCUMENT_TRACKER_SHEET_ID },
      sheetName: { __rl: true, mode: 'id', value: '385744821' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'Escalation Stage': expr('{{ $json.escalationStage || $json.targetStage }}'),
          'Last Contact At': expr('{{ $json.lastContactAt || $now.toISO() }}'),
          'Last Contact Channel': expr('{{ $json.lastContactChannel || "unknown" }}'),
          'Status': expr('{{ $json.documentStatus || "pending" }}'),
          'Send Error': expr('{{ $json.sendError || "" }}'),
        },
        matchingColumns: ['File Name'],
      },
    },
  },
  credentials: { googleSheetsOAuth2Api: sheetsCredential },
  position: [1800, 600],
  output: [{ updatedRange: 'Document Chases!I:L' }],
});

const notePurpose = sticky('## WB-08 Document Chasing Escalation\nDay 0/+2/+4/+7/+14 Gmail -> Gmail -> Gmail -> Phone -> exception queue cadence for client document non-cooperation. Triggered immediately by Chain 4 on partial/invalid verification, and daily by schedule for overdue scanning. ODPC consent logged at first touch. Escalation stops when docs are verified. Send errors are logged to the tracker sheet.', [documentChaseTrigger, scheduleTrigger], { color: 5 });

export default workflow('wb-08-document-chasing-escalation', 'WB-08 Document Chasing Escalation')
  .add(documentChaseTrigger)
  .to(normalizeNewChase)
  .to(sendEmailDay0)
  .to(debugSendDay0)
  .to(logConsentDay0)
  .to(updateTrackerCreateRecord)
  .to(notifyInsurerDay0)
  .to(notifyAdjusterDay0)
  .add(scheduleTrigger)
  .to(readTracker)
  .to(filterPendingDocs)
  .to(routeByEscalationDay
    .onCase(0, sendEmailDay2.to(updateTrackerStage))
    .onCase(1, sendEmailDay4.to(updateTrackerStage))
    .onCase(2, createExceptionDay7.to(updateTrackerStage))
    .onCase(4, renewalReminderDay60.to(updateTrackerStage))
    .onCase(5, renewalReminderDay30.to(updateTrackerStage))
    .onCase(6, renewalReminderDay7.to(updateTrackerStage))
    .onCase(7, renewalReminderDay3.to(updateTrackerStage))
    .onCase(8, skipNoAction))
  .add(notePurpose)
  .group('Day 0 - Immediate Chase', [normalizeNewChase, sendEmailDay0, debugSendDay0, logConsentDay0, updateTrackerCreateRecord, notifyInsurerDay0, notifyAdjusterDay0], { description: 'Day 0 Gmail secure upload link + send error debug + ODPC consent logging + insurer/loss adjuster notification for new partial/invalid chases' });
