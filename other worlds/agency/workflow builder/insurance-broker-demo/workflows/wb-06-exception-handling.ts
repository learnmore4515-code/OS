import { workflow, node, trigger, sticky, expr } from '@n8n/workflow-sdk';

const subTrigger = trigger({
  type: 'n8n-nodes-base.executeWorkflowTrigger',
  version: 1.3,
  config: {
    name: 'Execute Workflow Trigger',
    parameters: {
      inputSource: 'passthrough',
    },
  },
  position: [200, 300],
  output: [{ runId: 'RUN-001', source: 'triage', workflow: 'Request Triage', requestId: 'REQ-004', category: 'claim', priority: 'high', customer: 'David Kimani', message: 'I want to file a claim for water damage at my premises', missingFields: [], flaggedForReview: false }],
});

const exceptionSwitch = node({
  type: 'n8n-nodes-base.switch',
  version: 3.5,
  config: {
    name: 'Exception Type',
    parameters: {
      mode: 'rules',
      rules: {
        values: [
          {
            outputKey: 'claim',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [
                { leftValue: expr('{{ $json.source }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'triage' },
                { leftValue: expr('{{ $json.category }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'claim' },
              ],
              combinator: 'and',
            },
          },
          {
            outputKey: 'highPriority',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [
                { leftValue: expr('{{ $json.source }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'triage' },
                { leftValue: expr('{{ $json.priority }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'high' },
              ],
              combinator: 'and',
            },
          },
          {
            outputKey: 'incompleteLead',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [
                { leftValue: expr('{{ $json.source }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'qualify' },
                { leftValue: expr('{{ $json.missingFields.length }}'), operator: { type: 'number', operation: 'greaterThan' }, rightValue: 0 },
              ],
              combinator: 'and',
            },
          },
          {
            outputKey: 'reconciliation',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [
                { leftValue: expr('{{ $json.source }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'reconcile' },
                { leftValue: expr('{{ $json.flaggedForReview }}'), operator: { type: 'boolean', operation: 'equals' }, rightValue: true },
              ],
              combinator: 'and',
            },
          },
          {
            outputKey: 'documentChase',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [
                { leftValue: expr('{{ $json.source }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'document-chase' },
                { leftValue: expr('{{ $json.escalationDay }}'), operator: { type: 'number', operation: 'greaterThan' }, rightValue: 7 },
              ],
              combinator: 'and',
            },
          },
          {
            outputKey: 'multiParty',
            conditions: {
              options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
              conditions: [
                { leftValue: expr('{{ $json.source }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'multi-party' },
                { leftValue: expr('{{ $json.milestoneStatus }}'), operator: { type: 'string', operation: 'equals' }, rightValue: 'blocked' },
              ],
              combinator: 'and',
            },
          },
        ],
      },
      options: {
        fallbackOutput: 'extra',
        renameFallbackOutput: 'No Exception',
        ignoreCase: false,
        allMatchingOutputs: false,
      },
    },
  },
  position: [520, 300],
  output: [{ source: 'triage', workflow: 'Request Triage', requestId: 'REQ-004', category: 'claim', priority: 'high', customer: 'David Kimani' }],
});

const setClaimException = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Claim Exception',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'exceptionId', value: expr('{{ $json.source }}-{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a2', name: 'exceptionType', value: 'Claim Exception', type: 'string' },
          { id: 'a3', name: 'severity', value: 'high', type: 'string' },
          { id: 'a4', name: 'assignedTo', value: 'Claims Team', type: 'string' },
          { id: 'a5', name: 'slaHours', value: 8, type: 'number' },
          { id: 'a6', name: 'recommendedAction', value: 'Acknowledge claim, assign adjuster, request supporting documentation.', type: 'string' },
          { id: 'a7', name: 'sourceWorkflow', value: expr('{{ $json.workflow }}'), type: 'string' },
          { id: 'a8', name: 'sourceId', value: expr('{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a9', name: 'createdAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Exception Handling', type: 'string' },
        ],
      },
    },
  },
  position: [840, 100],
  output: [{ exceptionId: 'triage-REQ-004', exceptionType: 'Claim Exception', severity: 'high', assignedTo: 'Claims Team', slaHours: 8, recommendedAction: 'Acknowledge claim, assign adjuster, request supporting documentation.', sourceWorkflow: 'Request Triage', sourceId: 'REQ-004', createdAt: '2026-10-21T00:00:00.000Z', workflow: 'Exception Handling' }],
});

const setHighPriorityException = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'High Priority Exception',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'exceptionId', value: expr('{{ $json.source }}-{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a2', name: 'exceptionType', value: 'High Priority Triage', type: 'string' },
          { id: 'a3', name: 'severity', value: 'high', type: 'string' },
          { id: 'a4', name: 'assignedTo', value: 'Senior Account Manager', type: 'string' },
          { id: 'a5', name: 'slaHours', value: 4, type: 'number' },
          { id: 'a6', name: 'recommendedAction', value: 'Contact customer within 4 hours; confirm coverage and next steps.', type: 'string' },
          { id: 'a7', name: 'sourceWorkflow', value: expr('{{ $json.workflow }}'), type: 'string' },
          { id: 'a8', name: 'sourceId', value: expr('{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a9', name: 'createdAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Exception Handling', type: 'string' },
        ],
      },
    },
  },
  position: [840, 300],
  output: [{ exceptionId: 'triage-REQ-007', exceptionType: 'High Priority Triage', severity: 'high', assignedTo: 'Senior Account Manager', slaHours: 4, recommendedAction: 'Contact customer within 4 hours; confirm coverage and next steps.', sourceWorkflow: 'Request Triage', sourceId: 'REQ-007', createdAt: '2026-10-21T00:00:00.000Z', workflow: 'Exception Handling' }],
});

const setIncompleteLeadException = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Incomplete Lead Exception',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'exceptionId', value: expr('{{ $json.source }}-{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a2', name: 'exceptionType', value: 'Incomplete Lead Information', type: 'string' },
          { id: 'a3', name: 'severity', value: 'medium', type: 'string' },
          { id: 'a4', name: 'assignedTo', value: 'Sales Development', type: 'string' },
          { id: 'a5', name: 'slaHours', value: 24, type: 'number' },
          { id: 'a6', name: 'recommendedAction', value: 'Request missing fields before outreach; update lead record.', type: 'string' },
          { id: 'a7', name: 'sourceWorkflow', value: expr('{{ $json.workflow }}'), type: 'string' },
          { id: 'a8', name: 'sourceId', value: expr('{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a9', name: 'createdAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Exception Handling', type: 'string' },
        ],
      },
    },
  },
  position: [840, 500],
  output: [{ exceptionId: 'qualify-LD-002', exceptionType: 'Incomplete Lead Information', severity: 'medium', assignedTo: 'Sales Development', slaHours: 24, recommendedAction: 'Request missing fields before outreach; update lead record.', sourceWorkflow: 'Lead Qualification', sourceId: 'LD-002', createdAt: '2026-10-21T00:00:00.000Z', workflow: 'Exception Handling' }],
});

const setReconciliationException = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Reconciliation Exception',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'exceptionId', value: expr('{{ $json.source }}-{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a2', name: 'exceptionType', value: 'Reconciliation Exception', type: 'string' },
          { id: 'a3', name: 'severity', value: 'medium', type: 'string' },
          { id: 'a4', name: 'assignedTo', value: 'Finance Operations', type: 'string' },
          { id: 'a5', name: 'slaHours', value: 24, type: 'number' },
          { id: 'a6', name: 'recommendedAction', value: 'Match payment to statement or request proof of payment from customer.', type: 'string' },
          { id: 'a7', name: 'sourceWorkflow', value: expr('{{ $json.workflow }}'), type: 'string' },
          { id: 'a8', name: 'sourceId', value: expr('{{ $json.requestId || $json.leadId || $json.transactionId || $json.statementId || "unknown" }}'), type: 'string' },
          { id: 'a9', name: 'createdAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Exception Handling', type: 'string' },
        ],
      },
    },
  },
  position: [840, 700],
  output: [{ exceptionId: 'reconcile-MP-003', exceptionType: 'Reconciliation Exception', severity: 'medium', assignedTo: 'Finance Operations', slaHours: 24, recommendedAction: 'Match payment to statement or request proof of payment from customer.', sourceWorkflow: 'Payment Reconciliation', sourceId: 'MP-003', createdAt: '2026-10-21T00:00:00.000Z', workflow: 'Exception Handling' }],
});

const setDocumentChasingException = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Document Chasing Exception',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'exceptionId', value: expr('{{ $json.source }}-{{ $json.caseId || $json.documentId || "unknown" }}'), type: 'string' },
          { id: 'a2', name: 'exceptionType', value: 'Document Chasing Exception', type: 'string' },
          { id: 'a3', name: 'severity', value: 'high', type: 'string' },
          { id: 'a4', name: 'assignedTo', value: 'Operations Team', type: 'string' },
          { id: 'a5', name: 'slaHours', value: 24, type: 'number' },
          { id: 'a6', name: 'recommendedAction', value: 'Escalate document chase to phone and exception queue per Day +14 SLA.', type: 'string' },
          { id: 'a7', name: 'sourceWorkflow', value: expr('{{ $json.workflow }}'), type: 'string' },
          { id: 'a8', name: 'sourceId', value: expr('{{ $json.caseId || $json.documentId || "unknown" }}'), type: 'string' },
          { id: 'a9', name: 'createdAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Exception Handling', type: 'string' },
        ],
      },
    },
  },
  position: [840, 900],
  output: [{ exceptionId: 'document-chase-CASE-003', exceptionType: 'Document Chasing Exception', severity: 'high', assignedTo: 'Operations Team', slaHours: 24, recommendedAction: 'Escalate document chase to phone and exception queue per Day +14 SLA.', sourceWorkflow: 'Document Chasing Escalation', sourceId: 'CASE-003', createdAt: '2026-10-21T00:00:00.000Z', workflow: 'Exception Handling' }],
});

const setMultiPartyAlignmentException = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Multi-Party Alignment Exception',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'exceptionId', value: expr('{{ $json.source }}-{{ $json.milestoneId || $json.caseId || "unknown" }}'), type: 'string' },
          { id: 'a2', name: 'exceptionType', value: 'Multi-Party Alignment Exception', type: 'string' },
          { id: 'a3', name: 'severity', value: 'medium', type: 'string' },
          { id: 'a4', name: 'assignedTo', value: 'Broker Operations', type: 'string' },
          { id: 'a5', name: 'slaHours', value: 48, type: 'number' },
          { id: 'a6', name: 'recommendedAction', value: 'Re-align broker, insurer, and loss adjuster on milestone; schedule sync call.', type: 'string' },
          { id: 'a7', name: 'sourceWorkflow', value: expr('{{ $json.workflow }}'), type: 'string' },
          { id: 'a8', name: 'sourceId', value: expr('{{ $json.milestoneId || $json.caseId || "unknown" }}'), type: 'string' },
          { id: 'a9', name: 'createdAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Exception Handling', type: 'string' },
        ],
      },
    },
  },
  position: [840, 1100],
  output: [{ exceptionId: 'multi-party-MILE-002', exceptionType: 'Multi-Party Alignment Exception', severity: 'medium', assignedTo: 'Broker Operations', slaHours: 48, recommendedAction: 'Re-align broker, insurer, and loss adjuster on milestone; schedule sync call.', sourceWorkflow: 'Multi-Party Alignment', sourceId: 'MILE-002', createdAt: '2026-10-21T00:00:00.000Z', workflow: 'Exception Handling' }],
});

const notePurpose = sticky('## WB-06 Exception Handling\nRoutes incomplete, ambiguous, high-priority, or failed cases into a structured review queue instead of pretending every case can be handled automatically. Non-matching items (fallback) are dropped; only real exceptions reach the queue.', [subTrigger, exceptionSwitch, setClaimException, setHighPriorityException, setIncompleteLeadException, setReconciliationException, setDocumentChasingException, setMultiPartyAlignmentException], { color: 5 });

export default workflow('wb-06-exception-handling', 'WB-06 Exception Handling')
  .add(subTrigger)
  .to(exceptionSwitch
    .onCase(0, setClaimException)
    .onCase(1, setHighPriorityException)
    .onCase(2, setIncompleteLeadException)
    .onCase(3, setReconciliationException)
    .onCase(4, setDocumentChasingException)
    .onCase(5, setMultiPartyAlignmentException))
  .add(notePurpose)
  .group('Exception Routing', [exceptionSwitch, setClaimException, setHighPriorityException, setIncompleteLeadException, setReconciliationException, setDocumentChasingException, setMultiPartyAlignmentException], { description: 'Routes flagged items into a review queue by exception type' });
