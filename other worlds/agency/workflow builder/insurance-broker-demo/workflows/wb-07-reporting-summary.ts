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
  output: [{ runId: 'RUN-001', source: 'triage', workflow: 'Request Triage', requestId: 'REQ-001', category: 'lead', priority: 'medium', customer: 'Sarah Muthoni' }],
});

// Aggregates every demo item grouped by workflow -> one count item per workflow
const summarizeByWorkflow = node({
  type: 'n8n-nodes-base.itemLists',
  version: 3.1,
  config: {
    name: 'Count by Workflow',
    parameters: {
      operation: 'summarize',
      fieldsToSplitBy: 'workflow',
      fieldsToSummarize: {
        values: [{ aggregation: 'count', field: 'workflow' }],
      },
      outputFormat: 'separateItems',
    },
  },
  position: [520, 200],
  output: [{ workflow: 'Request Triage', count: 8 }],
});

const finalSummary = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Final Summary',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 's1', name: 'summaryType', value: 'Business Summary', type: 'string' },
          { id: 's2', name: 'completedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
        ],
      },
    },
  },
  position: [840, 200],
  output: [{ workflow: 'Request Triage', count: 8, summaryType: 'Business Summary', completedAt: '2026-10-21T00:00:00.000Z' }],
});

const notePurpose = sticky('## WB-07 Reporting & Summary\nAggregates every sub-workflow output into a business summary dashboard: one count item per workflow (requests processed, leads, renewals, reconciliation results, exceptions). Deterministic Item Lists aggregation — no Code node, no model credentials required.', [subTrigger, summarizeByWorkflow, finalSummary], { color: 6 });

export default workflow('wb-07-reporting-summary', 'WB-07 Reporting & Summary')
  .add(subTrigger)
  .to(summarizeByWorkflow)
  .to(finalSummary)
  .add(notePurpose)
  .group('Reporting Pipeline', [summarizeByWorkflow, finalSummary], { description: 'Aggregates all sub-workflow outputs into a business summary dashboard' });
