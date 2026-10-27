import { workflow, node, trigger, sticky, expr } from '@n8n/workflow-sdk';

const start = trigger({
  type: 'n8n-nodes-base.executeWorkflowTrigger',
  version: 1.3,
  config: { name: 'Execute Workflow Trigger', parameters: { inputSource: 'passthrough' } },
  position: [200, 200],
  output: [{ leads: [] }],
});

const splitLeads = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: { name: 'Split Leads', parameters: { fieldToSplitOut: 'leads', include: 'allOtherFields' } },
  position: [520, 200],
  output: [{ leadId: 'LD-001', customer: 'Akoth Okello', businessType: 'Logistics', budget: 'high', timeline: '1 month', authority: 'decision-maker', need: 'explicit', email: 'akoth@example.com', phone: '+254700000001' }],
});

const qualify = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Qualification Result',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'leadId', value: expr('{{ $json.leadId }}'), type: 'string' },
          { id: 'a2', name: 'customer', value: expr('{{ $json.customer }}'), type: 'string' },
          { id: 'a3', name: 'businessType', value: expr('{{ $json.businessType }}'), type: 'string' },
          { id: 'a4', name: 'budget', value: expr('{{ $json.budget }}'), type: 'string' },
          { id: 'a5', name: 'timeline', value: expr('{{ $json.timeline }}'), type: 'string' },
          { id: 'a6', name: 'authority', value: expr('{{ $json.authority }}'), type: 'string' },
          { id: 'a7', name: 'need', value: expr('{{ $json.need }}'), type: 'string' },
          { id: 'a8', name: 'qualificationStatus', value: expr('{{ $json.budget == "high" ? "priority-review" : "standard-review" }}'), type: 'string' },
          { id: 'a9', name: 'missingContactData', value: expr('{{ (!$json.email ? "email " : "") + (!$json.phone ? "phone" : "") }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Lead Qualification', type: 'string' },
          { id: 'a11', name: 'source', value: 'qualify', type: 'string' },
        ],
      },
    },
  },
  position: [840, 200],
  output: [{ leadId: 'LD-001', customer: 'Akoth Okello', businessType: 'Logistics', budget: 'high', timeline: '1 month', authority: 'decision-maker', need: 'explicit', qualificationStatus: 'priority-review', missingContactData: '', workflow: 'Lead Qualification', source: 'qualify' }],
});

const note = sticky('## WB-03 Lead Qualification\nNative qualification path: preserves lead evidence, marks high-budget leads for priority review, and flags missing contact data. No Code node or model credentials required.', [start, splitLeads, qualify], { color: 2 });

export default workflow('wb-03-lead-qualification', 'WB-03 Lead Qualification')
  .add(start)
  .to(splitLeads)
  .to(qualify)
  .add(note)
  .group('Qualification Pipeline', [splitLeads, qualify], { description: 'Splits leads and creates a deterministic qualification record' });
