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
  position: [200, 200],
  output: [{ runId: 'RUN-001', startedAt: '2026-10-21T08:00:00Z', policies: [], requests: [], leads: [], mpesaTransactions: [], insurerStatements: [] }],
});

const splitPolicies = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: {
    name: 'Split Policies',
    parameters: {
      fieldToSplitOut: 'policies',
      include: 'allOtherFields',
    },
  },
  position: [520, 200],
  output: [{ runId: 'RUN-001', startedAt: '2026-10-21T08:00:00Z', policyId: 'POL-001', customer: 'Sarah Muthoni', policyType: 'Motor Comprehensive', expiryDate: '2026-11-04', premium: 25000, status: 'active', renewalContact: '+254700000001' }],
});

const daysToExpiry = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Days to Expiry',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'd1', name: 'daysToExpiry', value: expr('{{ Math.round((new Date($json.policies.expiryDate).getTime() - new Date($today.toISO()).getTime()) / 86400000) }}'), type: 'number' },
        ],
      },
    },
  },
  position: [840, 200],
  output: [{ policyId: 'POL-001', customer: 'Sarah Muthoni', policyType: 'Motor Comprehensive', expiryDate: '2026-11-04', daysToExpiry: 14 }],
});

const renewalResult = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Renewal Result',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'policyId', value: expr('{{ $json.policies.policyId }}'), type: 'string' },
          { id: 'a2', name: 'customer', value: expr('{{ $json.policies.customer }}'), type: 'string' },
          { id: 'a3', name: 'policyType', value: expr('{{ $json.policies.policyType }}'), type: 'string' },
          { id: 'a4', name: 'expiryDate', value: expr('{{ $json.policies.expiryDate }}'), type: 'string' },
          { id: 'a5', name: 'daysToExpiry', value: expr('{{ $json.daysToExpiry }}'), type: 'number' },
          { id: 'a6', name: 'bucket', value: expr('{{ (function(){ var d = $json.daysToExpiry; if(d <= 0) return "Expired"; if(d <= 30) return "30-Day Reminder"; if(d <= 60) return "60-Day Reminder"; return "No Action Needed"; })() }}'), type: 'string' },
          { id: 'a7', name: 'priority', value: expr('{{ (function(){ var d = $json.daysToExpiry; if(d <= 0) return "high"; if(d <= 7) return "high"; if(d <= 30) return "medium"; if(d <= 60) return "medium"; return "low"; })() }}'), type: 'string' },
          { id: 'a8', name: 'reminderAction', value: expr('{{ (function(){ var d = $json.daysToExpiry; if(d <= 0) return "Contact immediately - policy has lapsed."; if(d <= 7) return "Contact immediately - policy expires within a week."; if(d <= 30) return "Send 30-day renewal notice."; if(d <= 60) return "Send 60-day early reminder."; return "None - monitor policy."; })() }}'), type: 'string' },
          { id: 'a9', name: 'processedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Renewal Processing', type: 'string' },
          { id: 'a11', name: 'source', value: 'renewal', type: 'string' },
        ],
      },
    },
  },
  position: [1160, 200],
  output: [{ policyId: 'POL-001', customer: 'Sarah Muthoni', policyType: 'Motor Comprehensive', expiryDate: '2026-11-04', daysToExpiry: 14, bucket: '30-Day Reminder', priority: 'medium', reminderAction: 'Send 30-day renewal notice.', processedAt: '2026-10-21T09:00:01Z', workflow: 'Renewal Processing', source: 'renewal' }],
});

const notePurpose = sticky('## WB-04 Renewal Processing\nComputes days to expiry for every policy and buckets it into Expired / 30-Day Reminder / 60-Day Reminder / No Action, with priority and a recommended reminder action. All date math is deterministic Set-node expressions.', [subTrigger, splitPolicies, daysToExpiry, renewalResult], { color: 3 });

export default workflow('wb-04-renewal-processing', 'WB-04 Renewal Processing')
  .add(subTrigger)
  .to(splitPolicies)
  .to(daysToExpiry)
  .to(renewalResult)
  .add(notePurpose)
  .group('Renewal Pipeline', [splitPolicies, daysToExpiry, renewalResult], { description: 'Buckets every policy by days to expiry and assigns a renewal action' });
