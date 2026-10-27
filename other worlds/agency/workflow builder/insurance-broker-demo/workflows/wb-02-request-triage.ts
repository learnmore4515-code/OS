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
  output: [{ runId: 'RUN-001', startedAt: '2026-10-21T08:00:00Z', requests: [], leads: [], policies: [], mpesaTransactions: [], insurerStatements: [] }],
});

const splitRequests = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: {
    name: 'Split Customer Requests',
    parameters: {
      fieldToSplitOut: 'requests',
      include: 'allOtherFields',
    },
  },
  position: [520, 200],
  output: [{ runId: 'RUN-001', startedAt: '2026-10-21T08:00:00Z', requestId: 'REQ-001', customer: 'Sarah Muthoni', message: 'I want a quote for comprehensive car insurance', channel: 'website', receivedAt: '2026-10-21T09:00:00Z' }],
});

const classifyRequest = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Classify Request',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          { id: 'c1', name: 'category', value: expr('{{ (function(){ var m = (($json.requests.message || "")).toLowerCase(); if (m.includes("claim") || m.includes("damage") || m.includes("stolen") || m.includes("theft")) return "claim"; if (m.includes("expire") || m.includes("renew") || m.includes("expir") || m.includes("renewal")) return "renewal"; if (m.includes("quote") || m.includes("prospect") || m.includes("new business") || m.includes("interested")) return "lead"; if (m.includes("document") || m.includes("policy doc") || m.includes("paperwork")) return "document follow-up"; return "other"; })() }}'), type: 'string' },
        ],
      },
    },
  },
  position: [840, 200],
  output: [{ requestId: 'REQ-001', customer: 'Sarah Muthoni', message: 'I want a quote for comprehensive car insurance', category: 'lead' }],
});

const triageResult = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Triage Result',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'a1', name: 'requestId', value: expr('{{ $json.requests.requestId }}'), type: 'string' },
          { id: 'a2', name: 'customer', value: expr('{{ $json.requests.customer }}'), type: 'string' },
          { id: 'a3', name: 'message', value: expr('{{ $json.requests.message }}'), type: 'string' },
          { id: 'a4', name: 'category', value: expr('{{ $json.category }}'), type: 'string' },
          { id: 'a5', name: 'priority', value: expr('{{ (function(){ var c = $json.category; if(c == "claim") return "high"; if(c == "renewal") return "medium"; if(c == "lead") return "medium"; return "low"; })() }}'), type: 'string' },
          { id: 'a6', name: 'confidence', value: expr('{{ (function(){ var c = $json.category; if(c == "claim") return 0.95; if(c == "renewal") return 0.9; if(c == "lead") return 0.85; if(c == "document follow-up") return 0.8; return 0.6; })() }}'), type: 'number' },
          { id: 'a7', name: 'reason', value: expr('{{ (function(){ var c = $json.category; if(c == "claim") return "Claim-related keywords detected; routed to claims team for assessment."; if(c == "renewal") return "Policy expiry or renewal language detected; routed to renewal processing."; if(c == "lead") return "New business inquiry language detected; routed to lead qualification."; if(c == "document follow-up") return "Document delivery request detected; routed to document follow-up."; return "No strong keyword match detected; routed to general operations queue for manual review."; })() }}'), type: 'string' },
          { id: 'a8', name: 'routedTo', value: expr('{{ (function(){ var c = $json.category; if(c == "claim") return "Claims Processing"; if(c == "renewal") return "Renewal Processing"; if(c == "lead") return "Lead Qualification"; if(c == "document follow-up") return "Document Follow-up"; return "Exception Handling"; })() }}'), type: 'string' },
          { id: 'a9', name: 'classifiedAt', value: expr('{{ $now.toISO() }}'), type: 'string' },
          { id: 'a10', name: 'workflow', value: 'Request Triage', type: 'string' },
          { id: 'a11', name: 'source', value: 'triage', type: 'string' },
        ],
      },
    },
  },
  position: [1160, 200],
  output: [{ requestId: 'REQ-001', customer: 'Sarah Muthoni', message: 'I want a quote for comprehensive car insurance', category: 'lead', priority: 'medium', confidence: 0.85, reason: 'New business inquiry language detected; routed to lead qualification.', routedTo: 'Lead Qualification', classifiedAt: '2026-10-21T09:00:01Z', workflow: 'Request Triage', source: 'triage' }],
});

const notePurpose = sticky('## WB-02 Request Triage\nClassifies every inbound customer request into one of five categories (lead, renewal, document follow-up, claim, other) with a priority, a confidence score, and a reason. Purely deterministic Set-node expressions — no Code node, no model credentials required.', [subTrigger, splitRequests, classifyRequest, triageResult], { color: 1 });

export default workflow('wb-02-request-triage', 'WB-02 Request Triage')
  .add(subTrigger)
  .to(splitRequests)
  .to(classifyRequest)
  .to(triageResult)
  .add(notePurpose)
  .group('Triage Pipeline', [splitRequests, classifyRequest, triageResult], { description: 'Splits bundled requests and classifies each one deterministically' });
