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
  output: [{ runId: 'RUN-001', startedAt: '2026-10-21T08:00:00Z', mpesaTransactions: [], insurerStatements: [], requests: [], leads: [], policies: [] }],
});

const splitTxn = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: {
    name: 'Split M-Pesa Transactions',
    parameters: {
      fieldToSplitOut: 'mpesaTransactions',
      include: 'allOtherFields',
    },
  },
  position: [520, 200],
  output: [{ runId: 'RUN-001', startedAt: '2026-10-21T08:00:00Z', transactionId: 'MP-001', customer: 'Sarah Muthoni', policyRef: 'POL-001', amount: 25000, date: '2026-10-21', mpesaReference: 'MPESA123456' }],
});

const splitStmt = node({
  type: 'n8n-nodes-base.splitOut',
  version: 1.1,
  config: {
    name: 'Split Insurer Statements',
    parameters: {
      fieldToSplitOut: 'insurerStatements',
      include: 'allOtherFields',
    },
  },
  position: [520, 400],
  output: [{ runId: 'RUN-001', startedAt: '2026-10-21T08:00:00Z', statementId: 'IS-001', customer: 'Sarah Muthoni', policyRef: 'POL-001', amount: 25000, date: '2026-10-21' }],
});

const reconcilePayments = node({
  type: 'n8n-nodes-base.code',
  version: 2,
  config: {
    name: 'Match Payments to Statements',
    parameters: {
      mode: 'runOnceForEachItem',
      language: 'javaScript',
      jsCode: 'const bundle = _items[0].json;\nconst txns = bundle.mpesaTransactions || [];\nconst stmts = bundle.insurerStatements || [];\nconst now = $today.toISO();\nconst stmtByRef = {};\nfor (const s of stmts) { stmtByRef[s.policyRef] = s; }\nconst seenKeys = {};\nconst results = [];\nfor (const t of txns) {\n  const ref = t.policyRef;\n  const stmt = stmtByRef[ref];\n  const key = ref + "|" + t.amount;\n  let status = "unmatched";\n  let reason = "No insurer statement found for this policy reference.";\n  let matchedStatementId = null;\n  let amountDiff = 0;\n  let flagged = true;\n  if (stmt) {\n    const amtDiff = Math.abs(t.amount - stmt.amount);\n    const pctDiff = stmt.amount > 0 ? amtDiff / stmt.amount : 1;\n    const txDate = new Date(t.date);\n    const stmtDate = new Date(stmt.date || t.date);\n    const dayDiff = Math.abs((txDate - stmtDate) / (1000 * 60 * 60 * 24));\n    if (seenKeys[key]) {\n      status = "duplicate";\n      reason = "Duplicate transaction: same policy reference and amount already received.";\n      matchedStatementId = stmt.id;\n      amountDiff = 0;\n      flagged = true;\n    } else if (pctDiff <= 0.01 && dayDiff <= 2) {\n      status = "matched";\n      reason = "Payment matches insurer statement within tolerance.";\n      matchedStatementId = stmt.id;\n      amountDiff = amtDiff;\n      flagged = false;\n      seenKeys[key] = true;\n    } else if (pctDiff > 0.01 && dayDiff <= 2) {\n      status = "discrepancy";\n      reason = "Payment received but amount differs from insurer statement by " + amtDiff.toFixed(0) + " KES.";\n      matchedStatementId = stmt.id;\n      amountDiff = amtDiff;\n      flagged = true;\n    } else {\n      status = "unmatched";\n      reason = "No matching statement within the 2-day reconciliation window.";\n      matchedStatementId = stmt.id;\n      amountDiff = amtDiff;\n      flagged = true;\n    }\n  } else {\n    if (seenKeys[key]) {\n      status = "duplicate";\n      reason = "Duplicate transaction: same policy reference and amount already received.";\n      matchedStatementId = stmt.id;\n      amountDiff = 0;\n      flagged = true;\n    }\n    seenKeys[key] = true;\n  }\n  results.push({\n    json: {\n      transactionId: t.id,\n      policyRef: ref,\n      customer: t.customer,\n      amount: t.amount,\n      date: t.date,\n      mpesaReference: t.mpesaReference,\n      status: status,\n      reason: reason,\n      matchedStatementId: matchedStatementId,\n      amountDiff: amtDiff,\n      flaggedForReview: flagged,\n      reconciledAt: now,\n      workflow: "Payment Reconciliation",\n      source: "reconcile",\n    },\n  });\n}\nfor (const s of stmts) {\n  const matched = results.some(function(r) { return r.json.matchedStatementId === s.id && r.json.status === "matched"; });\n  if (!matched) {\n    results.push({\n      json: {\n        statementId: s.id,\n        policyRef: s.policyRef,\n        customer: s.customer,\n        amount: s.amount,\n        date: s.date,\n        status: "unmatchedStatement",\n        reason: "Insurer statement recorded with no corresponding M-Pesa payment.",\n        matchedStatementId: null,\n        amountDiff: s.amount,\n        flaggedForReview: true,\n        reconciledAt: now,\n        workflow: "Payment Reconciliation",\n        source: "reconcile",\n      },\n    });\n  }\n}\nreturn results;',
    },
  },
  position: [840, 200],
  output: [{ transactionId: 'MP-001', policyRef: 'POL-001', customer: 'Sarah Muthoni', amount: 25000, date: '2026-10-21', status: 'matched', reason: 'Payment matches insurer statement within tolerance.', matchedStatementId: 'IS-001', amountDiff: 0, flaggedForReview: false, reconciledAt: '2026-10-21T09:00:00Z', workflow: 'Payment Reconciliation', source: 'reconcile' }],
});

const reconciliationResult = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Reconciliation Result',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          { id: 'r1', name: 'transactionId', value: expr('{{ $json.transactionId }}'), type: 'string' },
          { id: 'r2', name: 'policyRef', value: expr('{{ $json.policyRef }}'), type: 'string' },
          { id: 'a3', name: 'customer', value: expr('{{ $json.customer }}'), type: 'string' },
          { id: 'a4', name: 'amount', value: expr('{{ $json.amount }}'), type: 'number' },
          { id: 'a5', name: 'date', value: expr('{{ $json.date }}'), type: 'string' },
          { id: 'a6', name: 'status', value: expr('{{ $json.status }}'), type: 'string' },
          { id: 'a7', name: 'reason', value: expr('{{ $json.reason }}'), type: 'string' },
          { id: 'a8', name: 'matchedStatementId', value: expr('{{ $json.matchedStatementId }}'), type: 'string' },
          { id: 'a9', name: 'amountDiff', value: expr('{{ $json.amountDiff }}'), type: 'number' },
          { id: 'a10', name: 'flaggedForReview', value: expr('{{ $json.flaggedForReview }}'), type: 'boolean' },
          { id: 'a11', name: 'reconciledAt', value: expr('{{ $json.reconciledAt }}'), type: 'string' },
          { id: 'a12', name: 'workflow', value: 'Payment Reconciliation', type: 'string' },
          { id: 'a13', name: 'source', value: 'reconcile', type: 'string' },
        ],
      },
    },
  },
  position: [840, 200],
  output: [{ transactionId: 'MP-001', policyRef: 'POL-001', customer: 'Sarah Muthoni', amount: 25000, date: '2026-10-21', status: 'matched', reason: 'Payment matches insurer statement within tolerance.', matchedStatementId: 'IS-001', amountDiff: 0, flaggedForReview: false, reconciledAt: '2026-10-21T09:00:00Z', workflow: 'Payment Reconciliation', source: 'reconcile' }],
});

const notePurpose = sticky('## WB-05 Payment Reconciliation\nMatches synthetic M-Pesa transactions to insurer statement entries by policy reference, amount tolerance (1%) and a 2-day date window. Flags unmatched payments, amount discrepancies, and unmatched statements. Deterministic matching logic.', [subTrigger, splitTxn, splitStmt, reconcilePayments], { color: 4 });

export default workflow('wb-05-payment-reconciliation', 'WB-05 Payment Reconciliation')
  .add(subTrigger)
  .to(splitTxn)
  .to(splitStmt)
  .to(reconcilePayments)
  .add(notePurpose)
  .group('Reconciliation Pipeline', [splitTxn, splitStmt, reconcilePayments], { description: 'Matches M-Pesa transactions to insurer statements and flags exceptions' });
