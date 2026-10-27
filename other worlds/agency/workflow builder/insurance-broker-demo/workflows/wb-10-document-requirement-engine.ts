import { workflow, node, trigger, sticky, expr } from '@n8n/workflow-sdk';

// ============================================
// CREDENTIALS (never hardcode secrets in text fields)
// ============================================

const sheetsCredential = newCredential('Google Sheets');

const DOCUMENT_TRACKER_SHEET_ID = 'document-tracker-spreadsheet-id';

// ============================================
// TRIGGERS
// ============================================

// Entry from Chain 4 (operations-hub) when document requirements are needed for a policy type
const requirementsTrigger = trigger({
  type: 'n8n-nodes-base.executeWorkflowTrigger',
  version: 1.3,
  config: {
    name: 'Document Requirements Trigger',
    parameters: { inputSource: 'passthrough' },
  },
  position: [200, 200],
  output: [{
    policyType: 'motor_comprehensive',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    caseId: 'CASE-001',
  }],
});

// ============================================
// NORMALIZE INCOMING REQUEST
// ============================================

const normalizeRequest = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Normalize Request',
    parameters: {
      values: {
        string: [
          { name: 'policyType', value: expr('{{ $json.policyType || "motor_comprehensive" }}'), type: 'string' },
          { name: 'clientName', value: expr('{{ $json.clientName || "" }}'), type: 'string' },
          { name: 'clientEmail', value: expr('{{ $json.clientEmail || "" }}'), type: 'string' },
          { name: 'caseId', value: expr('{{ $json.caseId || "" }}'), type: 'string' },
        ],
      },
      options: { keepOnlySet: false },
    },
  },
  position: [520, 200],
  output: [{ policyType: 'motor_comprehensive', clientName: 'John Doe', clientEmail: 'john@example.com', caseId: 'CASE-001' }],
});

// ============================================
// LOOK UP DOCUMENT REQUIREMENTS BY POLICY TYPE
// ============================================

const lookupRequirements = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Code - Lookup Document Requirements',
    parameters: {
      mode: 'runOnceForAllItems',
      jsCode: 'const requirements = {\n  motor_comprehensive: ["National ID", "KRA PIN", "Vehicle Logbook", "Driving License", "Previous Insurance Policy"],\n  motor_third_party: ["National ID", "KRA PIN", "Driving License"],\n  health: ["National ID", "KRA PIN", "Medical History Report", "Previous Health Policy"],\n  fire_burglary: ["National ID", "KRA PIN", "Property Title Deed", "Property Valuation Report", "Previous Fire Policy"],\n  commercial_psv: ["National ID", "KRA PIN", "Business Permit", "PSV License", "Previous Commercial Policy"],\n};\nconst policyType = $json.policyType || "motor_comprehensive";\nconst docs = requirements[policyType] || requirements.motor_comprehensive;\nreturn [{ json: { ...$json, requiredDocuments: docs, documentCount: docs.length } }];',
    },
  },
  position: [840, 200],
  output: [{ policyType: 'motor_comprehensive', clientName: 'John Doe', clientEmail: 'john@example.com', caseId: 'CASE-001', requiredDocuments: ['National ID', 'KRA PIN', 'Vehicle Logbook', 'Driving License', 'Previous Insurance Policy'], documentCount: 5 }],
});

// ============================================
// BUILD PERSONALIZED REQUIREMENT LIST
// ============================================

const buildRequirementList = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Build Requirement List',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'a1', name: 'requirementList', value: expr('{{ JSON.stringify($json.requiredDocuments) }}'), type: 'string' },
          { id: 'a2', name: 'documentCount', value: expr('{{ $json.documentCount }}'), type: 'string' },
          { id: 'a3', name: 'requirementsGeneratedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a4', name: 'status', value: 'requirements_generated', type: 'string' },
        ],
      },
    },
  },
  position: [1160, 200],
  output: [{ requirementList: '["National ID","KRA PIN","Vehicle Logbook","Driving License","Previous Insurance Policy"]', documentCount: '5', requirementsGeneratedAt: '2026-10-22T00:00:00.000Z', status: 'requirements_generated' }],
});

// ============================================
// STORE REQUIREMENTS IN TRACKER
// ============================================

const storeRequirements = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Store Requirements',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      documentId: { mode: 'id', value: DOCUMENT_TRACKER_SHEET_ID },
      sheetName: { __rl: true, mode: 'name', value: 'Document Requirements' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          'Case ID': expr('{{ $json.caseId }}'),
          'Policy Type': expr('{{ $json.policyType }}'),
          'Client Name': expr('{{ $json.clientName }}'),
          'Required Documents': expr('{{ $json.requirementList }}'),
          'Document Count': expr('{{ $json.documentCount }}'),
          'Generated At': expr('{{ $json.requirementsGeneratedAt }}'),
          'Status': expr('{{ $json.status }}'),
        },
      },
    },
  },
  credentials: { googleSheetsOAuth2Api: sheetsCredential },
  position: [1480, 200],
  output: [{ updatedRange: 'Document Requirements!A:G' }],
});

const notePurpose = sticky('## WB-10 Document Requirement Engine\nPersonalized document requirement lists per policy type (motor, fire/burglary, health, commercial/PSV). Triggered when a new policy/quote/claim is created. Returns a personalized list of required documents for the client.', [requirementsTrigger], { color: 7 });

export default workflow('wb-10-document-requirement-engine', 'WB-10 Document Requirement Engine')
  .add(requirementsTrigger)
  .to(normalizeRequest)
  .to(lookupRequirements)
  .to(buildRequirementList)
  .to(storeRequirements)
  .add(notePurpose)
  .group('Requirement Engine', [normalizeRequest, lookupRequirements, buildRequirementList, storeRequirements], { description: 'Look up and build personalized document requirement lists per policy type' });
