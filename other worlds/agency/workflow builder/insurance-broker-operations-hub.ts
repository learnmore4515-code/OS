import {
  workflow,
  node,
  trigger,
  languageModel,
  memory,
  outputParser,
  expr,
  ifElse,
  switchCase,
  merge,
  newCredential,
} from '@n8n/workflow-sdk';

// ============================================
// SHARED SUBNODES (used by AI Agents)
// ============================================

const openAiModel = languageModel({
  type: '@n8n/n8n-nodes-langchain.lmChatOpenAi',
  version: 1.3,
  config: {
    name: 'OpenAI Model',
    parameters: {},
    credentials: { openAiApi: newCredential('OpenAI') },
    position: [400, 100],
  },
  output: [{ output: 'AI response' }],
});

const sharedMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Shared Memory', position: [400, 300] },
  output: [{ memory: 'chat history' }],
});

// ============================================
// CONFIG-DRIVEN SHEET IDS (set via .env in production)
// ============================================

const DOCUMENT_TRACKER_SHEET_ID = 'document-tracker-spreadsheet-id';
const MILESTONE_TRACKER_SHEET_ID = 'milestone-tracker-spreadsheet-id';
const PARTY_REGISTRY_SHEET_ID = 'party-registry-spreadsheet-id';

// Sub-workflow IDs (set after wb-08/wb-09/wb-10 are deployed to n8n)
const WB08_WORKFLOW_ID = 'wb-08-document-chasing-escalation';
const WB09_WORKFLOW_ID = 'wb-09-multi-party-alignment';
const WB10_WORKFLOW_ID = 'wb-10-document-requirement-engine';

// ============================================
// CHAIN 1: MAIN WEBHOOK → TRIAGE → LEAD MANAGEMENT
// ============================================

const webhookTrigger = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Webhook - Request Intake',
    parameters: {
      httpMethod: 'POST',
      path: 'broker-intake',
      responseMode: 'responseNode',
    },
    position: [200, 200],
  },
  output: [{ body: { requestType: 'lead', clientName: 'John Doe', clientEmail: 'john@example.com' } }],
});

const normalizeInput = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize Input',
    parameters: {
      values: {
        string: [
          { name: 'requestType', value: expr('{{ $json.body?.requestType || $json.requestType || "unknown" }}'), type: 'string' },
          { name: 'clientName', value: expr('{{ $json.body?.clientName || $json.clientName || "" }}'), type: 'string' },
          { name: 'clientEmail', value: expr('{{ $json.body?.clientEmail || $json.clientEmail || "" }}'), type: 'string' },
        ],
      },
      options: { keepOnlySet: true },
    },
    position: [500, 200],
  },
  output: [{ requestType: 'lead', clientName: 'John Doe', clientEmail: 'john@example.com' }],
});

const triageMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Simple Memory - Triage', position: [900, 300] },
  output: [{ memory: 'chat history' }],
});

const triageOutputParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output Parser - Triage',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{ "category": "lead", "priority": "high", "confidence": 0.95, "reasoning": "Lead request" }',
    },
    position: [900, 500],
  },
  output: [{ category: 'lead', priority: 'high', confidence: 0.95, reasoning: 'Lead request' }],
});

const triageAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent - Request Triage',
    parameters: {
      promptType: 'define',
      text: 'You are an insurance broker operations triage agent. Classify incoming requests into categories: lead, renewal, document, claims, or other. Assign priority (high/medium/low). Provide reasoning.',
      hasOutputParser: true,
    },
    subnodes: { model: openAiModel, memory: triageMemory, outputParser: triageOutputParser },
    position: [700, 200],
  },
  output: [{ category: 'lead', priority: 'high', confidence: 0.95, reasoning: 'Lead request' }],
});

const routeByType = switchCase({
  version: 3.5,
  config: {
    name: 'Switch - Route by Request Type',
    parameters: {
      rules: {
        values: [
          { outputKey: 'lead', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'lead' }], combinator: 'and' } },
          { outputKey: 'renewal', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'renewal' }], combinator: 'and' } },
          { outputKey: 'document', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'document' }], combinator: 'and' } },
          { outputKey: 'claims', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'claims' }], combinator: 'and' } },
        ],
      },
      options: { fallbackOutput: 'extra', renameFallbackOutput: 'Other' },
    },
    position: [1100, 200],
  },
  output: [{ category: 'lead' }],
});

// ---- Branch 1A: Lead Qualification ----
const extractLeadFields = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Extract Lead Fields',
    parameters: {
      values: {
        string: [
          { name: 'leadName', value: expr('{{ $json.clientName || "Unknown Lead" }}'), type: 'string' },
          { name: 'leadEmail', value: expr('{{ $json.clientEmail || "" }}'), type: 'string' },
        ],
      },
    },
    position: [1300, 0],
  },
  output: [{ leadName: 'John Doe', leadEmail: 'john@example.com' }],
});

const leadQualificationMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Simple Memory - Lead Qualification', position: [1300, 400] },
  output: [{ memory: 'chat history' }],
});

const leadQualificationOutputParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output Parser - Lead Qualification',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{ "score": 85, "category": "hot", "nextAction": "immediate_followup", "reasoning": "High value lead" }',
    },
    position: [1300, 600],
  },
  output: [{ score: 85, category: 'hot', nextAction: 'immediate_followup', reasoning: 'High value lead' }],
});

const leadQualificationAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent - Lead Qualification',
    parameters: {
      promptType: 'define',
      text: 'You are a lead qualification agent for an insurance brokerage. Score leads 0-100 based on budget, timeline, decision-maker status, insurance need urgency. Categorize as hot (80-100), warm (50-79), cold (0-49). Recommend next action.',
      hasOutputParser: true,
    },
    subnodes: { model: openAiModel, memory: leadQualificationMemory, outputParser: leadQualificationOutputParser },
    position: [1100, 0],
  },
  output: [{ score: 85, category: 'hot', nextAction: 'immediate_followup', reasoning: 'High value lead' }],
});

const qualifyByScore = switchCase({
  version: 3.5,
  config: {
    name: 'Switch - Qualification Score',
    parameters: {
      rules: {
        values: [
          { outputKey: 'hot', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'hot' }], combinator: 'and' } },
          { outputKey: 'warm', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'warm' }], combinator: 'and' } },
          { outputKey: 'cold', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'cold' }], combinator: 'and' } },
        ],
      },
      options: { fallbackOutput: 'extra', renameFallbackOutput: 'Warm' },
    },
    position: [1500, 0],
  },
  output: [{ category: 'hot' }],
});

const createLeadRecord = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Create Lead Record',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { mode: 'id', value: 'lead-tracker-spreadsheet-id' },
      sheetName: 'Leads',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'Name', value: expr('{{ $json.leadName }}'), type: 'string' },
          { name: 'Email', value: expr('{{ $json.leadEmail }}'), type: 'string' },
          { name: 'Status', value: 'New', type: 'string' },
          { name: 'Date', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [1700, -200],
  },
  output: [{ updatedRange: 'Leads!A:D' }],
});

const notifySalesSlack = node({
  type: 'n8n-nodes-base.slack',
  version: 2.7,
  config: {
    name: 'Slack - Notify Sales Team',
    parameters: {
      resource: 'message',
      operation: 'post',
      channel: '#sales-team',
      text: expr('{{ "New lead: " + $json.leadName + " (" + $json.leadEmail + ") - " + $json.qualification.category }}'),
    },
    credentials: { slackApi: newCredential('Slack Bot') },
    position: [1700, 200],
  },
  output: [{ ok: true }],
});

const sendWelcomeEmail = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Send Welcome Email',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: expr('{{ $json.leadEmail }}'),
      subject: 'Welcome to Insurance Brokerage',
      body: expr('{{ "Dear " + $json.leadName + ",\\n\\nThank you for your interest.\\n\\nBest regards,\\n[Brokerage] Team" }}'),
    },
    credentials: { gmailOAuth2: newCredential('Gmail') },
    position: [1700, 400],
  },
  output: [{ id: 'email-123', status: 'sent' }],
});

const checkLeadResponded = ifElse({
  version: 2.4,
  config: {
    name: 'IF - Lead Responded?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [{ leftValue: expr('{{ $json.leadStatus }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'responded' }],
        combinator: 'and',
      },
    },
    position: [1900, 400],
  },
  output: [{ leadStatus: 'responded' }],
});

const bookMeeting = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Send Meeting Invite',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: expr('{{ $json.leadEmail }}'),
      subject: 'Schedule Your Insurance Consultation',
      body: expr('{{ "Dear " + $json.leadName + ",\\n\\nSchedule a 15-minute consultation.\\n\\nBest regards,\\n[Brokerage] Team" }}'),
    },
    credentials: { gmailOAuth2: newCredential('Gmail') },
    position: [2100, 300],
  },
  output: [{ id: 'email-456', status: 'sent' }],
});

const updateLeadStatus = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Update Lead Status',
    parameters: {
      resource: 'sheet',
      operation: 'update',
      documentId: { mode: 'id', value: 'lead-tracker-spreadsheet-id' },
      sheetName: 'Leads',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'Status', value: expr('{{ $json.leadStatus || "contacted" }}'), type: 'string' },
          { name: 'Last Contact', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [2100, 500],
  },
  output: [{ updatedRange: 'Leads!B:D' }],
});

const notifyMeetingBooked = node({
  type: 'n8n-nodes-base.slack',
  version: 2.7,
  config: {
    name: 'Slack - Notify Meeting Booked',
    parameters: {
      resource: 'message',
      operation: 'post',
      channel: '#sales-team',
      text: expr('{{ "Meeting booked with " + $json.leadName }}'),
    },
    credentials: { slackApi: newCredential('Slack Bot') },
    position: [2300, 300],
  },
  output: [{ ok: true }],
});

// ============================================
// CHAIN 2: SCHEDULE → RENEWAL AUTOMATION
// ============================================

const scheduleTriggerRenewal = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: {
    name: 'Schedule - Daily Renewal Check',
    parameters: { triggerTimes: [{ mode: 'everyDay', hour: 9, minute: 0 }] },
    position: [200, 800],
  },
  output: [{ schedule: true }],
});

const getExpiringPolicies = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Get Expiring Policies',
    parameters: {
      values: {
        string: [
          { name: 'daysAhead', value: '60', type: 'string' },
        ],
      },
    },
    position: [500, 800],
  },
  output: [{ daysAhead: '60' }],
});

const queryPolicies = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Query Expiring Policies',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { mode: 'id', value: 'policy-tracker-spreadsheet-id' },
      sheetName: 'Policies',
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [700, 800],
  },
  output: [{ policyNumber: 'POL-001', clientName: 'Jane Smith', clientEmail: 'jane@example.com', policyType: 'Auto', expiryDate: '2026-12-01' }],
});

const renewalRiskMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Simple Memory - Renewal Risk', position: [1100, 1200] },
  output: [{ memory: 'chat history' }],
});

const renewalRiskOutputParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output Parser - Renewal Risk',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{ "riskScore": 75, "churnRisk": "high", "recommendedAction": "personalized_outreach", "reasoning": "Policy expiring soon" }',
    },
    position: [1100, 1400],
  },
  output: [{ riskScore: 75, churnRisk: 'high', recommendedAction: 'personalized_outreach', reasoning: 'Policy expiring soon' }],
});

const renewalRiskAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent - Renewal Risk Assessment',
    parameters: {
      promptType: 'define',
      text: 'You assess insurance policy renewal risk. Consider policy age, claims history, payment history. Score churn risk 0-100. Recommend action.',
      hasOutputParser: true,
    },
    subnodes: { model: openAiModel, memory: renewalRiskMemory, outputParser: renewalRiskOutputParser },
    position: [1100, 1000],
  },
  output: [{ riskScore: 75, churnRisk: 'high', recommendedAction: 'personalized_outreach', reasoning: 'Policy expiring soon' }],
});

const routeByRisk = switchCase({
  version: 3.5,
  config: {
    name: 'Switch - Renewal Risk Level',
    parameters: {
      rules: {
        values: [
          { outputKey: 'high', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.churnRisk }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'high' }], combinator: 'and' } },
          { outputKey: 'medium', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.churnRisk }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'medium' }], combinator: 'and' } },
          { outputKey: 'low', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.churnRisk }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'low' }], combinator: 'and' } },
        ],
      },
      options: { fallbackOutput: 'extra', renameFallbackOutput: 'Medium' },
    },
    position: [1300, 1000],
  },
  output: [{ churnRisk: 'high' }],
});

const sendRenewalReminder = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Send Renewal Reminder',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: expr('{{ $json.clientEmail }}'),
      subject: 'Policy Renewal Reminder',
      body: expr('{{ "Dear " + $json.clientName + ",\\n\\nYour policy is expiring soon.\\n\\nBest regards,\\n[Brokerage] Team" }}'),
    },
    credentials: { gmailOAuth2: newCredential('Gmail') },
    position: [1500, 900],
  },
  output: [{ id: 'email-789', status: 'sent' }],
});

const trackRenewalTouchpoint = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Track Renewal Touchpoint',
    parameters: {
      values: {
        string: [
          { name: 'touchpointDate', value: expr('{{ $now }}'), type: 'string' },
          { name: 'status', value: 'reminder_sent', type: 'string' },
        ],
      },
    },
    position: [1500, 1100],
  },
  output: [{ touchpointDate: '2026-10-20', status: 'reminder_sent' }],
});

const updatePolicyStatus = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Update Policy Status',
    parameters: {
      resource: 'sheet',
      operation: 'update',
      documentId: { mode: 'id', value: 'policy-tracker-spreadsheet-id' },
      sheetName: 'Policies',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'Renewal Status', value: expr('{{ $json.status || "reminder_sent" }}'), type: 'string' },
          { name: 'Last Touchpoint', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [1500, 1300],
  },
  output: [{ updatedRange: 'Policies!B:D' }],
});

const checkRenewalResponded = ifElse({
  version: 2.4,
  config: {
    name: 'IF - Client Responded to Renewal?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [{ leftValue: expr('{{ $json.renewalResponse }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'yes' }],
        combinator: 'and',
      },
    },
    position: [1700, 1100],
  },
  output: [{ renewalResponse: 'yes' }],
});

const processRenewal = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Process Renewal',
    parameters: {
      values: {
        string: [
          { name: 'renewalStatus', value: 'processed', type: 'string' },
          { name: 'commissionCalculated', value: 'true', type: 'string' },
        ],
      },
    },
    position: [1900, 1000],
  },
  output: [{ renewalStatus: 'processed', commissionCalculated: 'true' }],
});

const scheduleNextTouchpoint = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Schedule Next Touchpoint',
    parameters: {
      values: {
        string: [
          { name: 'nextTouchpoint', value: '7_days', type: 'string' },
          { name: 'status', value: 'pending', type: 'string' },
        ],
      },
    },
    position: [1900, 1200],
  },
  output: [{ nextTouchpoint: '7_days', status: 'pending' }],
});

const mergeRenewal = merge({
  version: 3.2,
  config: {
    name: 'Merge - Renewal Branch Complete',
    parameters: { mode: 'append' },
    position: [2100, 1100],
  },
  output: [{ merged: true }],
});

// ============================================
// CHAIN 3: SCHEDULE → WEEKLY REPORTING
// ============================================

const scheduleTriggerReport = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.4,
  config: {
    name: 'Schedule - Weekly Report',
    parameters: { triggerTimes: [{ mode: 'everyWeek', days: [1], hour: 9, minute: 0 }] },
    position: [200, 1400],
  },
  output: [{ schedule: true }],
});

const queryMetrics = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Query Weekly Metrics',
    parameters: {
      resource: 'sheet',
      operation: 'read',
      documentId: { mode: 'id', value: 'metrics-spreadsheet-id' },
      sheetName: 'Weekly Metrics',
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [500, 1400],
  },
  output: [{ leads: 50, renewals: 30, claims: 10, documents: 25 }],
});

const calculateKPIs = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Code - Calculate KPIs',
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: 'const leads = $json.leads || 0;\nconst renewals = $json.renewals || 0;\nconst claims = $json.claims || 0;\nconst documents = $json.documents || 0;\nreturn [{\n  totalLeads: leads,\n  totalRenewals: renewals,\n  totalClaims: claims,\n  totalDocuments: documents,\n  conversionRate: leads > 0 ? (renewals / leads * 100).toFixed(1) : 0,\n  reportDate: new Date().toISOString().split("T")[0],\n}];',
    },
    position: [700, 1400],
  },
  output: [{ totalLeads: 50, totalRenewals: 30, totalClaims: 10, totalDocuments: 25, conversionRate: '60.0', reportDate: '2026-10-20' }],
});

const reportInsightsMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Simple Memory - Report Insights', position: [900, 1800] },
  output: [{ memory: 'chat history' }],
});

const reportInsightsAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent - Generate Insights Report',
    parameters: {
      promptType: 'define',
      text: 'You generate weekly operational insights reports for an insurance brokerage. Analyze KPIs and provide recommendations.',
    },
    subnodes: { model: openAiModel, memory: reportInsightsMemory },
    position: [900, 1400],
  },
  output: [{ reportSummary: 'Strong renewal performance this week.' }],
});

const sendWeeklyReport = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Send Weekly Report',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: 'management@brokerage.com',
      subject: 'Weekly Operations Report',
      body: expr('{{ "Leads: " + $json.totalLeads + "\\nRenewals: " + $json.totalRenewals + "\\nClaims: " + $json.totalClaims + "\\nDocuments: " + $json.totalDocuments + "\\nConversion: " + $json.conversionRate + "%" }}'),
    },
    credentials: { gmailOAuth2: newCredential('Gmail') },
    position: [1100, 1400],
  },
  output: [{ id: 'email-report-1', status: 'sent' }],
});

const postReportSlack = node({
  type: 'n8n-nodes-base.slack',
  version: 2.7,
  config: {
    name: 'Slack - Post Summary',
    parameters: {
      resource: 'message',
      operation: 'post',
      channel: '#management',
      text: expr('{{ "Weekly report: " + $json.totalLeads + " leads, " + $json.totalRenewals + " renewals, " + $json.totalClaims + " claims processed." }}'),
    },
    credentials: { slackApi: newCredential('Slack Bot') },
    position: [1100, 1600],
  },
  output: [{ ok: true }],
});

const mergeReporting = merge({
  version: 3.2,
  config: {
    name: 'Merge - Reporting Complete',
    parameters: { mode: 'append' },
    position: [1300, 1400],
  },
  output: [{ merged: true }],
});

// ============================================
// CHAIN 4: DOCUMENT WEBHOOK → DOCUMENT MANAGEMENT
// ============================================

const documentUploadWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Webhook - Document Upload',
    parameters: {
      httpMethod: 'POST',
      path: 'document-upload',
      responseMode: 'responseNode',
    },
    position: [200, 1700],
  },
  output: [{ body: { fileName: 'policy.pdf', fileType: 'pdf', clientEmail: 'client@example.com', documentCategory: 'application', fileUrl: 'https://example.com/file.pdf' } }],
});

const extractDocMetadata = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Extract Document Metadata',
    parameters: {
      values: {
        string: [
          { name: 'fileName', value: expr('{{ $json.body?.fileName || "unknown" }}'), type: 'string' },
          { name: 'clientEmail', value: expr('{{ $json.body?.clientEmail || "" }}'), type: 'string' },
          { name: 'documentCategory', value: expr('{{ $json.body?.documentCategory || "general" }}'), type: 'string' },
        ],
      },
    },
    position: [500, 1700],
  },
  output: [{ fileName: 'policy.pdf', clientEmail: 'client@example.com', documentCategory: 'application' }],
});

const pdfOcr = node({
  type: 'n8n-nodes-pdfco.PDFco Api',
  version: 1.1,
  config: {
    name: 'PDF.co - OCR & Data Extraction',
    parameters: { operation: 'AI Invoice Parser' },
    credentials: { pdfcoApi: newCredential('PDF.co') },
    position: [700, 1700],
  },
  output: [{ extractedText: 'Policy Number: POL-123, Client: Jane Doe' }],
});

const docVerificationMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Simple Memory - Document Verification', position: [1100, 2100] },
  output: [{ memory: 'chat history' }],
});

const docVerificationOutputParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output Parser - Document Verification',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{ "verified": true, "missingFields": [], "confidence": 0.95, "recommendedAction": "accept" }',
    },
    position: [1100, 2300],
  },
  output: [{ verified: true, missingFields: [], confidence: 0.95, recommendedAction: 'accept' }],
});

const docVerificationAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent - Document Verification',
    parameters: {
      promptType: 'define',
      text: 'You verify insurance documents for completeness and accuracy. Check for policy number, client name, dates, signatures, coverage amounts.',
      hasOutputParser: true,
    },
    subnodes: { model: openAiModel, memory: docVerificationMemory, outputParser: docVerificationOutputParser },
    position: [900, 1700],
  },
  output: [{ verified: true, missingFields: [], confidence: 0.95, recommendedAction: 'accept' }],
});

const routeByVerification = switchCase({
  version: 3.5,
  config: {
    name: 'Switch - Verification Result',
    parameters: {
      rules: {
        values: [
          { outputKey: 'complete', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.recommendedAction }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'accept' }], combinator: 'and' } },
          { outputKey: 'partial', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.recommendedAction }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'request_missing' }], combinator: 'and' } },
          { outputKey: 'invalid', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.recommendedAction }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'reject' }], combinator: 'and' } },
        ],
      },
      options: { fallbackOutput: 'extra', renameFallbackOutput: 'Partial' },
    },
    position: [1100, 1900],
  },
  output: [{ recommendedAction: 'accept' }],
});

const requestMissingDocs = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Document Chasing Escalation (wb-08)',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: WB08_WORKFLOW_ID },
      options: { waitForSubWorkflow: false },
    },
  },
  position: [1300, 1600],
  output: [{ escalationStarted: true }],
});

const trackDocumentStatus = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Track Document Status',
    parameters: {
      values: {
        string: [
          { name: 'documentStatus', value: 'verified', type: 'string' },
          { name: 'verificationDate', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    position: [1300, 1800],
  },
  output: [{ documentStatus: 'verified', verificationDate: '2026-10-20' }],
});

const updateDocumentRecord = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Update Document Record',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { mode: 'id', value: DOCUMENT_TRACKER_SHEET_ID },
      sheetName: 'Documents',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'File Name', value: expr('{{ $json.fileName }}'), type: 'string' },
          { name: 'Status', value: expr('{{ $json.documentStatus }}'), type: 'string' },
          { name: 'Date', value: expr('{{ $now }}'), type: 'string' },
          { name: 'Consent Logged', value: expr('{{ $json.consentLogged || "false" }}'), type: 'string' },
          { name: 'Consent Channel', value: expr('{{ $json.consentChannel || "" }}'), type: 'string' },
          { name: 'Consent Date', value: expr('{{ $json.consentDate || "" }}'), type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [1300, 2000],
  },
  output: [{ updatedRange: 'Documents!A:F' }],
});

const notifyAdminMissingDocs = node({
  type: 'n8n-nodes-base.slack',
  version: 2.7,
  config: {
    name: 'Slack - Notify Admin of Missing Docs',
    parameters: {
      resource: 'message',
      operation: 'post',
      channel: '#operations',
      text: expr('{{ "Missing documents for " + $json.fileName }}'),
    },
    credentials: { slackApi: newCredential('Slack Bot') },
    position: [1300, 2200],
  },
  output: [{ ok: true }],
});

const checkDocsComplete = ifElse({
  version: 2.4,
  config: {
    name: 'IF - All Documents Complete?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [{ leftValue: expr('{{ $json.allDocsComplete }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'true' }],
        combinator: 'and',
      },
    },
    position: [1500, 1800],
  },
  output: [{ allDocsComplete: 'true' }],
});

const notifyBroker = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Multi-Party Alignment (wb-09)',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: WB09_WORKFLOW_ID },
      options: { waitForSubWorkflow: false },
    },
  },
  position: [1700, 1700],
  output: [{ partiesNotified: true }],
});

const mergeDocument = merge({
  version: 3.2,
  config: {
    name: 'Merge - Document Branch Complete',
    parameters: { mode: 'append' },
    position: [1900, 1800],
  },
  output: [{ merged: true }],
});

// ============================================
// CHAIN 5: CLAIMS WEBHOOK → CLAIMS PROCESSING
// ============================================

const claimsWebhook = trigger({
  type: 'n8n-nodes-base.webhook',
  version: 2.2,
  config: {
    name: 'Webhook - Claims Initiation',
    parameters: {
      httpMethod: 'POST',
      path: 'claims-intake',
      responseMode: 'responseNode',
    },
    position: [200, 2300],
  },
  output: [{ body: { claimType: 'auto', description: 'Vehicle accident', clientEmail: 'client@example.com', claimAmount: 5000 } }],
});

const normalizeClaimsData = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize Claims Data',
    parameters: {
      values: {
        string: [
          { name: 'claimNumber', value: expr('{{ $json.body?.claimNumber || "CLM-" + $now }}'), type: 'string' },
          { name: 'claimType', value: expr('{{ $json.body?.claimType || "general" }}'), type: 'string' },
          { name: 'claimDescription', value: expr('{{ $json.body?.description || "" }}'), type: 'string' },
          { name: 'clientEmail', value: expr('{{ $json.body?.clientEmail || "" }}'), type: 'string' },
          { name: 'claimAmount', value: expr('{{ $json.body?.claimAmount || 0 }}'), type: 'string' },
        ],
      },
    },
    position: [500, 2500],
  },
  output: [{ claimNumber: 'CLM-20261020', claimType: 'auto', claimAmount: '5000' }],
});

const claimsAssessmentMemory = memory({
  type: '@n8n/n8n-nodes-langchain.memoryBufferWindow',
  version: 1.4,
  config: { name: 'Simple Memory - Claims Assessment', position: [900, 2900] },
  output: [{ memory: 'chat history' }],
});

const claimsAssessmentOutputParser = outputParser({
  type: '@n8n/n8n-nodes-langchain.outputParserStructured',
  version: 1.3,
  config: {
    name: 'Structured Output Parser - Claims Assessment',
    parameters: {
      schemaType: 'fromJson',
      jsonSchemaExample: '{ "severity": "high", "recommendedAdjuster": "John Adjuster", "estimatedSettlement": 5000, "priority": "high", "reasoning": "Auto claim" }',
    },
    position: [900, 3100],
  },
  output: [{ severity: 'high', recommendedAdjuster: 'John Adjuster', estimatedSettlement: 5000, priority: 'high', reasoning: 'Auto claim' }],
});

const claimsAssessmentAgent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: {
    name: 'AI Agent - Claims Assessment',
    parameters: {
      promptType: 'define',
      text: 'You assess insurance claims for severity and priority. Consider claim type, amount, description.',
      hasOutputParser: true,
    },
    subnodes: { model: openAiModel, memory: claimsAssessmentMemory, outputParser: claimsAssessmentOutputParser },
    position: [700, 2500],
  },
  output: [{ severity: 'high', recommendedAdjuster: 'John Adjuster', estimatedSettlement: 5000, priority: 'high', reasoning: 'Auto claim' }],
});

const routeByClaimPriority = switchCase({
  version: 3.5,
  config: {
    name: 'Switch - Claim Priority',
    parameters: {
      rules: {
        values: [
          { outputKey: 'high', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.priority }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'high' }], combinator: 'and' } },
          { outputKey: 'medium', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.priority }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'medium' }], combinator: 'and' } },
          { outputKey: 'low', conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' }, conditions: [{ leftValue: expr('{{ $json.priority }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'low' }], combinator: 'and' } },
        ],
      },
      options: { fallbackOutput: 'extra', renameFallbackOutput: 'Medium' },
    },
    position: [900, 2700],
  },
  output: [{ priority: 'high' }],
});

const sendClaimsAcknowledgment = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Send Claims Acknowledgment',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: expr('{{ $json.clientEmail }}'),
      subject: expr('{{ "Claim Received - " + $json.claimNumber }}'),
      body: expr('{{ "Dear " + $json.clientName + ",\\n\\nClaim " + $json.claimNumber + " received." }}'),
    },
    credentials: { gmailOAuth2: newCredential('Gmail') },
    position: [1100, 2400],
  },
  output: [{ id: 'email-claim-1', status: 'sent' }],
});

const notifyClaimsTeam = node({
  type: 'n8n-nodes-base.slack',
  version: 2.7,
  config: {
    name: 'Slack - Notify Claims Team',
    parameters: {
      resource: 'message',
      operation: 'post',
      channel: '#claims-team',
      text: expr('{{ "New claim: " + $json.claimNumber + " - Priority: " + $json.claimsAssessment.priority }}'),
    },
    credentials: { slackApi: newCredential('Slack Bot') },
    position: [1100, 2600],
  },
  output: [{ ok: true }],
});

const createClaimsRecord = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Create Claims Record',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { mode: 'id', value: 'claims-tracker-spreadsheet-id' },
      sheetName: 'Claims',
      columns: {
        mappingMode: 'defineBelow',
        value: [
          { name: 'Claim Number', value: expr('{{ $json.claimNumber }}'), type: 'string' },
          { name: 'Claim Type', value: expr('{{ $json.claimType }}'), type: 'string' },
          { name: 'Client Email', value: expr('{{ $json.clientEmail }}'), type: 'string' },
          { name: 'Status', value: 'New', type: 'string' },
          { name: 'Date', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets') },
    position: [1100, 2800],
  },
  output: [{ updatedRange: 'Claims!A:E' }],
});

const trackClaimsStatus = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Track Claims Status',
    parameters: {
      values: {
        string: [
          { name: 'claimsStatus', value: 'in_review', type: 'string' },
          { name: 'lastUpdate', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    position: [1300, 2500],
  },
  output: [{ claimsStatus: 'in_review', lastUpdate: '2026-10-20' }],
});

const sendStatusUpdate = node({
  type: 'n8n-nodes-base.gmail',
  version: 2.2,
  config: {
    name: 'Gmail - Send Status Update',
    parameters: {
      resource: 'message',
      operation: 'send',
      to: expr('{{ $json.clientEmail }}'),
      subject: expr('{{ "Claim Status Update - " + $json.claimNumber }}'),
      body: expr('{{ "Dear " + $json.clientName + ",\\n\\nYour claim is being reviewed." }}'),
    },
    credentials: { gmailOAuth2: newCredential('Gmail') },
    position: [1500, 2400],
  },
  output: [{ id: 'email-claim-2', status: 'sent' }],
});

const checkClaimResolved = ifElse({
  version: 2.4,
  config: {
    name: 'IF - Claim Resolved?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [{ leftValue: expr('{{ $json.claimsStatus }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'resolved' }],
        combinator: 'and',
      },
    },
    position: [1500, 2600],
  },
  output: [{ claimsStatus: 'resolved' }],
});

const closeClaim = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Close Claim',
    parameters: {
      values: {
        string: [
          { name: 'claimsStatus', value: 'closed', type: 'string' },
          { name: 'closedDate', value: expr('{{ $now }}'), type: 'string' },
        ],
      },
    },
    position: [1700, 2500],
  },
  output: [{ claimsStatus: 'closed', closedDate: '2026-10-20' }],
});

const mergeClaims = merge({
  version: 3.2,
  config: {
    name: 'Merge - Claims Branch Complete',
    parameters: { mode: 'append' },
    position: [1900, 2600],
  },
  output: [{ merged: true }],
});

// ============================================
// WEBHOOK RESPONSE (for webhook triggers)
// ============================================

const respondToWebhook = node({
  type: 'n8n-nodes-base.respondToWebhook',
  version: 1.5,
  config: {
    name: 'Respond to Webhook',
    parameters: {
      responseMode: 'lastNode',
      httpCode: 200,
      responseBody: expr('{{ JSON.stringify({ status: "processed", timestamp: $now }) }}'),
    },
    position: [2500, 200],
  },
  output: [{ status: 'processed', timestamp: '2026-10-20T00:00:00Z' }],
});

// ============================================
// WORKFLOW ASSEMBLY
// ============================================

export default workflow(
  'insurance-broker-operations-hub',
  'Insurance Broker Operations Hub - Lead to Claims Lifecycle',
  {
    description: 'Complete insurance broker operations automation: lead management, renewal automation, document management, claims processing, and weekly reporting with AI agents.',
    settings: {
      executionOrder: 'v1',
      saveManualExecutions: true,
      saveDataErrorExecution: 'all',
      saveDataSuccessExecution: 'all',
      timeout: 3600,
    },
  }
)
  .add(
    webhookTrigger,
    normalizeInput,
    triageAgent,
    routeByType,
    extractLeadFields,
    leadQualificationAgent,
    qualifyByScore,
    createLeadRecord,
    notifySalesSlack,
    sendWelcomeEmail,
    checkLeadResponded,
    bookMeeting,
    updateLeadStatus,
    notifyMeetingBooked,
    respondToWebhook,
    scheduleTriggerRenewal,
    getExpiringPolicies,
    queryPolicies,
    renewalRiskAgent,
    routeByRisk,
    sendRenewalReminder,
    trackRenewalTouchpoint,
    updatePolicyStatus,
    checkRenewalResponded,
    processRenewal,
    scheduleNextTouchpoint,
    mergeRenewal,
    scheduleTriggerReport,
    queryMetrics,
    calculateKPIs,
    reportInsightsAgent,
    sendWeeklyReport,
    postReportSlack,
    mergeReporting,
    documentUploadWebhook,
    extractDocMetadata,
    pdfOcr,
    docVerificationAgent,
    routeByVerification,
    requestMissingDocs,
    trackDocumentStatus,
    updateDocumentRecord,
    notifyAdminMissingDocs,
    checkDocsComplete,
    notifyBroker,
    mergeDocument,
    claimsWebhook,
    normalizeClaimsData,
    claimsAssessmentAgent,
    routeByClaimPriority,
    sendClaimsAcknowledgment,
    notifyClaimsTeam,
    createClaimsRecord,
    trackClaimsStatus,
    sendStatusUpdate,
    checkClaimResolved,
    closeClaim,
    mergeClaims,
  )
  .to(
    webhookTrigger.to(normalizeInput),
    normalizeInput.to(triageAgent),
    triageAgent.to(
      routeByType
        .onCase(0, extractLeadFields)
        .onCase(1, extractLeadFields)
        .onCase(2, extractLeadFields)
        .onCase(3, extractLeadFields)
        .onCase(4, extractLeadFields)
    ),
    extractLeadFields.to(leadQualificationAgent),
    leadQualificationAgent.to(
      qualifyByScore
        .onCase(0, createLeadRecord)
        .onCase(1, sendWelcomeEmail)
        .onCase(2, sendWelcomeEmail)
        .onCase(3, sendWelcomeEmail)
    ),
    createLeadRecord.to(notifySalesSlack),
    notifySalesSlack.to(sendWelcomeEmail),
    sendWelcomeEmail.to(checkLeadResponded),
    checkLeadResponded.onTrue(bookMeeting.to(notifyMeetingBooked.to(respondToWebhook))),
    checkLeadResponded.onFalse(updateLeadStatus.to(respondToWebhook)),
    notifyMeetingBooked.to(respondToWebhook),
    scheduleTriggerRenewal.to(getExpiringPolicies),
    getExpiringPolicies.to(queryPolicies),
    queryPolicies.to(renewalRiskAgent),
    renewalRiskAgent.to(
      routeByRisk
        .onCase(0, sendRenewalReminder)
        .onCase(1, sendRenewalReminder)
        .onCase(2, sendRenewalReminder)
        .onCase(3, sendRenewalReminder)
    ),
    sendRenewalReminder.to(trackRenewalTouchpoint),
    trackRenewalTouchpoint.to(updatePolicyStatus),
    updatePolicyStatus.to(checkRenewalResponded),
    checkRenewalResponded.onTrue(processRenewal.to(mergeRenewal)),
    checkRenewalResponded.onFalse(scheduleNextTouchpoint.to(mergeRenewal)),
    mergeRenewal.to(respondToWebhook),
    scheduleTriggerReport.to(queryMetrics),
    queryMetrics.to(calculateKPIs),
    calculateKPIs.to(reportInsightsAgent),
    reportInsightsAgent.to(sendWeeklyReport),
    sendWeeklyReport.to(postReportSlack),
    postReportSlack.to(mergeReporting),
    mergeReporting.to(respondToWebhook),
    documentUploadWebhook.to(extractDocMetadata),
    extractDocMetadata.to(pdfOcr),
    pdfOcr.to(docVerificationAgent),
    docVerificationAgent.to(
      routeByVerification
        .onCase(0, trackDocumentStatus)
        .onCase(1, requestMissingDocs)
        .onCase(2, requestMissingDocs)
        .onCase(3, requestMissingDocs)
    ),
    requestMissingDocs.to(trackDocumentStatus),
    trackDocumentStatus.to(updateDocumentRecord),
    updateDocumentRecord.to(notifyAdminMissingDocs),
    notifyAdminMissingDocs.to(checkDocsComplete),
    checkDocsComplete.onTrue(notifyBroker.to(mergeDocument)),
    checkDocsComplete.onFalse(mergeDocument),
    notifyBroker.to(mergeDocument),
    mergeDocument.to(respondToWebhook),
    claimsWebhook.to(normalizeClaimsData),
    normalizeClaimsData.to(claimsAssessmentAgent),
    claimsAssessmentAgent.to(
      routeByClaimPriority
        .onCase(0, sendClaimsAcknowledgment)
        .onCase(1, sendClaimsAcknowledgment)
        .onCase(2, sendClaimsAcknowledgment)
        .onCase(3, sendClaimsAcknowledgment)
    ),
    sendClaimsAcknowledgment.to(notifyClaimsTeam),
    notifyClaimsTeam.to(createClaimsRecord),
    createClaimsRecord.to(trackClaimsStatus),
    trackClaimsStatus.to(sendStatusUpdate),
    sendStatusUpdate.to(checkClaimResolved),
    checkClaimResolved.onTrue(closeClaim.to(mergeClaims)),
    checkClaimResolved.onFalse(mergeClaims),
    closeClaim.to(mergeClaims),
    mergeClaims.to(respondToWebhook),
  );
