import { workflow, node, trigger, sticky, expr, merge } from '@n8n/workflow-sdk';

const startDemo = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Start Demo' },
  position: [200, 200],
  output: [{ runId: 'RUN-DEMO-001', startedAt: '2026-10-21T09:00:00Z' }],
});

const loadData = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Load Synthetic Demo Data',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'requests', value: expr('[{ "requestId": "REQ-001", "customer": "Sarah Muthoni", "message": "I want a quote for comprehensive car insurance", "channel": "website", "receivedAt": "2026-10-21T09:00:00Z" }, { "requestId": "REQ-002", "customer": "James Otieno", "message": "My motor policy expires next month, please send renewal", "channel": "email", "receivedAt": "2026-10-21T09:30:00Z" }, { "requestId": "REQ-003", "customer": "Grace Wanjiku", "message": "I have not received my policy documents", "channel": "portal", "receivedAt": "2026-10-21T10:00:00Z" }, { "requestId": "REQ-004", "customer": "David Kimani", "message": "I want to file a claim for water damage at my premises", "channel": "phone", "receivedAt": "2026-10-21T10:30:00Z" }, { "requestId": "REQ-005", "customer": "Alice Njeri", "message": "General inquiry about business insurance for my shop", "channel": "website", "receivedAt": "2026-10-21T11:00:00Z" }, { "requestId": "REQ-006", "customer": "Peter Ochieng", "message": "Third-party motor insurance quote for new vehicle", "channel": "email", "receivedAt": "2026-10-21T11:30:00Z" }, { "requestId": "REQ-007", "customer": "Mercy Chebet", "message": "My health policy is due for renewal, what is the premium?", "channel": "phone", "receivedAt": "2026-10-21T12:00:00Z" }, { "requestId": "REQ-008", "customer": "Samuel Ndungu", "message": "URGENT: my policy lapsed and I need immediate reinstatement", "channel": "phone", "receivedAt": "2026-10-21T12:30:00Z" }]'), type: 'array' },
          { id: 'd2', name: 'leads', value: expr('[{ "leadId": "LD-001", "customer": "Akoth Okello", "businessType": "Logistics", "budget": "high", "timeline": "1 month", "authority": "decision-maker", "need": "explicit", "email": "akoth@example.com", "phone": "+254700000001", "source": "website" }, { "leadId": "LD-002", "customer": "Brian Kipchoge", "businessType": "Retail", "budget": "medium", "timeline": "2-3 months", "authority": "influencer", "need": "implicit", "email": "brian@example.com", "phone": "", "source": "website" }, { "leadId": "LD-003", "customer": "Carol Akinyi", "businessType": "Farming", "budget": "low", "timeline": "6 months", "authority": "researcher", "need": "none", "email": "", "phone": "", "source": "referral" }, { "leadId": "LD-004", "customer": "David Ochieng", "businessType": "Construction", "budget": "high", "timeline": "1 month", "authority": "decision-maker", "need": "explicit", "email": "david@example.com", "phone": "", "source": "website" }, { "leadId": "LD-005", "customer": "Esther Njeri", "businessType": "Hospitality", "budget": "medium", "timeline": "3 months", "authority": "influencer", "need": "implicit", "email": "esther@example.com", "phone": "+254700000005", "source": "walk-in" }, { "leadId": "LD-006", "customer": "Francis Omondi", "businessType": "Transport", "budget": "low", "timeline": "6 months", "authority": "researcher", "need": "explicit", "email": "francis@example.com", "phone": "+254700000006", "source": "referral" }]'), type: 'array' },
          { id: 'd3', name: 'policies', value: expr('[{ "policyId": "POL-001", "customer": "Sarah Muthoni", "policyType": "Motor Comprehensive", "expiryDate": "2026-11-04", "premium": 25000, "status": "active", "renewalContact": "+254700000001" }, { "policyId": "POL-002", "customer": "James Otieno", "policyType": "Motor Third-Party", "expiryDate": "2026-12-05", "premium": 18000, "status": "active", "renewalContact": "+254700000002" }, { "policyId": "POL-003", "customer": "Grace Wanjiku", "policyType": "Health", "expiryDate": "2027-01-19", "premium": 42000, "status": "active", "renewalContact": "+254700000003" }, { "policyId": "POL-004", "customer": "Peter Ochieng", "policyType": "Motor Comprehensive", "expiryDate": "2026-10-25", "premium": 28000, "status": "active", "renewalContact": "+254700000006" }, { "policyId": "POL-005", "customer": "Mercy Chebet", "policyType": "Health", "expiryDate": "2026-10-19", "premium": 40000, "status": "active", "renewalContact": "+254700000007" }, { "policyId": "POL-006", "customer": "Samuel Ndungu", "policyType": "Business Package", "expiryDate": "2026-11-20", "premium": 55000, "status": "active", "renewalContact": "+254700000008" }, { "policyId": "POL-007", "customer": "Alice Njeri", "policyType": "Motor Third-Party", "expiryDate": "2026-12-20", "premium": 20000, "status": "active", "renewalContact": "+254700000001" }]'), type: 'array' },
          { id: 'd4', name: 'mpesaTransactions', value: expr('[{ "id": "MP-001", "customer": "Sarah Muthoni", "policyRef": "POL-001", "amount": 25000, "date": "2026-10-21", "mpesaReference": "MPESA123456" }, { "id": "MP-002", "customer": "James Otieno", "policyRef": "POL-002", "amount": 40000, "date": "2026-10-21", "mpesaReference": "MPESA123457" }, { "id": "MP-003", "customer": "Grace Wanjiku", "policyRef": "POL-999", "amount": 15000, "date": "2026-10-21", "mpesaReference": "MPESA123458" }, { "id": "MP-004", "customer": "Sarah Muthoni", "policyRef": "POL-001", "amount": 25000, "date": "2026-10-21", "mpesaReference": "MPESA123459" }, { "id": "MP-005", "customer": "Peter Ochieng", "policyRef": "POL-002", "amount": 30000, "date": "2026-10-21", "mpesaReference": "MPESA123460" }, { "id": "MP-006", "customer": "Grace Wanjiku", "policyRef": "POL-003", "amount": 10000, "date": "2026-10-16", "mpesaReference": "MPESA123461" }, { "id": "MP-007", "customer": "Peter Ochieng", "policyRef": "POL-004", "amount": 28000, "date": "2026-10-21", "mpesaReference": "MPESA123462" }]'), type: 'array' },
          { id: 'd5', name: 'insurerStatements', value: expr('[{ "id": "IS-001", "customer": "Sarah Muthoni", "policyRef": "POL-001", "amount": 25000, "date": "2026-10-21" }, { "id": "IS-002", "customer": "James Otieno", "policyRef": "POL-002", "amount": 18000, "date": "2026-10-21" }, { "id": "IS-003", "customer": "Peter Ochieng", "policyRef": "POL-004", "amount": 28000, "date": "2026-10-21" }, { "id": "IS-004", "customer": "Mercy Chebet", "policyRef": "POL-005", "amount": 40000, "date": "2026-10-18" }, { "id": "IS-005", "customer": "Samuel Ndungu", "policyRef": "POL-006", "amount": 55000, "date": "2026-10-20" }]'), type: 'array' },
        ],
      },
    },
  },
  position: [520, 200],
  output: [{ runId: 'RUN-DEMO-001', startedAt: '2026-10-21T09:00:00Z', requests: [], leads: [], policies: [], mpesaTransactions: [], insurerStatements: [] }],
});

const exTriage = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Triage All Requests',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: 'X0c4evB8rOwvFfYC' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [840, 0],
  output: [{ requestId: 'REQ-001', customer: 'Sarah Muthoni', category: 'lead', priority: 'medium', confidence: 0.85, source: 'triage' }],
});

const exQualify = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Qualify All Leads',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: 'Ax9rDZmxJz2dUaDT' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [840, 200],
  output: [{ leadId: 'LD-001', customer: 'Akoth Okello', score: 100, tier: 'hot', source: 'qualify' }],
});

const exRenewal = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Process Renewals',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: 'Ze5V0CAR5ZPBlaOU' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [840, 400],
  output: [{ policyId: 'POL-001', customer: 'Sarah Muthoni', bucket: '30-Day Reminder', priority: 'medium', source: 'renewal' }],
});

const exReconcile = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Reconcile Payments',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: '19JabpGh1ZBsyJan' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [840, 600],
  output: [{ transactionId: 'MP-001', policyRef: 'POL-001', status: 'matched', source: 'reconcile' }],
});

const exDocumentChasing = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Document Chasing Escalation',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: 'wb-08-document-chasing-escalation' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [840, 800],
  output: [{ caseId: 'CASE-003', customer: 'Peter Ochieng', escalationDay: 14, source: 'document-chase' }],
});

const exMultiParty = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Multi-Party Alignment',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: 'wb-09-multi-party-alignment' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [840, 1000],
  output: [{ milestoneId: 'MILE-002', customer: 'Grace Wanjiku', milestoneStatus: 'blocked', source: 'multi-party' }],
});

const mergeResults = merge({
  version: 3.2,
  config: {
    name: 'Combine All Demo Results',
    parameters: { mode: 'append', numberInputs: 6 },
  },
  position: [1160, 300],
  output: [{ requestId: 'REQ-001', source: 'triage' }],
});

const exException = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Build Exception Queue',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: 'PggdzFMu73eaZSVn' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [1480, 100],
  output: [{ exceptionId: 'triage-REQ-004', exceptionType: 'Claim Exception', severity: 'high', source: 'Exception Handling' }],
});

const mergeAll = merge({
  version: 3.2,
  config: {
    name: 'Combine Results + Exceptions',
    parameters: { mode: 'append', numberInputs: 2 },
  },
  position: [1800, 300],
  output: [{ requestId: 'REQ-001', source: 'triage' }],
});

const exReport = node({
  type: 'n8n-nodes-base.executeWorkflow',
  version: 1.4,
  config: {
    name: 'Generate Business Summary',
    parameters: {
      source: 'database',
      mode: 'once',
      workflowId: { __rl: true, mode: 'id', value: 'KJDUGNuQ92xgCP6e' },
      options: { waitForSubWorkflow: true },
    },
  },
  position: [2120, 300],
  output: [{ runId: 'RUN-DEMO-001', requestsProcessed: 8, totalLeads: 6, totalRenewals: 7, totalExceptions: 12, workflow: 'Reporting & Summary' }],
});

const finalSummary = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Demo Complete — Business Summary',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'f1', name: 'demoStatus', value: 'Complete', type: 'string' },
          { id: 'f2', name: 'completedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
        ],
      },
    },
  },
  position: [2440, 300],
  output: [{ runId: 'RUN-DEMO-001', demoStatus: 'Complete', completedAt: '2026-10-21T09:05:00Z', workflow: 'Reporting & Summary' }],
});

const noteStart = sticky('## WB-01 Demo Launcher & Orchestrator\nClick "Start Demo" to run the full insurance brokerage operations demo end-to-end. All data is bundled and fictional — no webhook, no client data, no external credentials required.', [startDemo], { color: 0 });

const noteData = sticky('## Demo Data Bundle\n8 customer requests, 6 leads, 7 policies, 7 M-Pesa transactions and 5 insurer statements — including deliberate edge cases (unmatched payment, duplicate, amount discrepancy, expired policy, missing lead fields).', [loadData], { color: 1 });

const noteTriage = sticky('Calls WB-02 Request Triage on all 8 requests.', [exTriage], { color: 2 });
const noteQualify = sticky('Calls WB-03 Lead Qualification on all 6 leads.', [exQualify], { color: 2 });
const noteRenewal = sticky('Calls WB-04 Renewal Processing on all 7 policies.', [exRenewal], { color: 2 });
const noteReconcile = sticky('Calls WB-05 Payment Reconciliation on all transactions and statements.', [exReconcile], { color: 2 });

const noteDocumentChasing = sticky('Calls WB-08 Document Chasing Escalation on cases with missing documents.', [exDocumentChasing], { color: 2 });
const noteMultiParty = sticky('Calls WB-09 Multi-Party Alignment on blocked milestones.', [exMultiParty], { color: 2 });

const noteMerge = sticky('## Fan-in\nAll four sub-workflows run in parallel branches, then merge by append. No data is lost and no item is processed twice.', [mergeResults], { color: 1 });

const noteException = sticky('## Exception Queue\nFlagged items from every sub-workflow are routed to a structured review queue instead of being silently dropped.', [exException], { color: 5 });

const noteReport = sticky('## Reporting\nAggregates every sub-workflow output into one business summary with recommended actions.', [exReport], { color: 6 });

export default workflow('wb-01-demo-launcher', 'WB-01 Demo Launcher & Orchestrator')
  .add(startDemo)
  .to(loadData)
  .to(exTriage.to(mergeResults.input(0)))
  .add(loadData)
  .to(exQualify.to(mergeResults.input(1)))
  .add(loadData)
  .to(exRenewal.to(mergeResults.input(2)))
  .add(loadData)
  .to(exReconcile.to(mergeResults.input(3)))
  .add(loadData)
  .to(exDocumentChasing.to(mergeResults.input(4)))
  .add(loadData)
  .to(exMultiParty.to(mergeResults.input(5)))
  .add(mergeResults)
  .to(exException.to(mergeAll.input(1)))
  .add(mergeResults)
  .to(mergeAll.input(0))
  .add(mergeAll)
  .to(exReport)
  .to(finalSummary)
  .add(noteStart)
  .add(noteData)
  .add(noteTriage)
  .add(noteQualify)
  .add(noteRenewal)
  .add(noteReconcile)
  .add(noteDocumentChasing)
  .add(noteMultiParty)
  .add(noteMerge)
  .add(noteException)
  .add(noteReport)
  .group('Demo Pipeline', [loadData, exTriage, exQualify, exRenewal, exReconcile, exDocumentChasing, exMultiParty, mergeResults, exException, mergeAll], { description: 'Loads bundled data, calls six sub-workflows in parallel, merges results, and builds the exception queue' })
  .group('Reporting', [exReport, finalSummary], { description: 'Produces the final business summary for the demo' });
