// ============================================================================
// Google Sheets Synchronisation — Order Export
// Pattern: Database Operations (Schedule → Fetch → Transform → Write → Verify)
// Tenant-isolated. Google Sheets credential must be configured in n8n.
// Only marks orders synced after a genuine successful Sheets write.
// ============================================================================
import { workflow, node, trigger, ifElse, expr } from '@n8n/workflow-sdk';

// ----------------------------------------------------------------------------
// 1. Schedule trigger — periodic sync (e.g. every 15 minutes)
// ----------------------------------------------------------------------------
const scheduleTrigger = trigger({
  type: 'n8n-nodes-base.scheduleTrigger',
  version: 1.3,
  config: {
    name: 'Schedule - Sync Orders',
    parameters: {},
    position: [200, 200],
  },
  output: [{}],
});

// ----------------------------------------------------------------------------
// 2. Set — Orders pending sync (demo data; production reads from orders DB/Data Table)
// ----------------------------------------------------------------------------
const ordersToSync = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Orders to Sync',
    parameters: {
      mode: 'manual',
      includeOtherFields: false,
      assignments: {
        assignments: [
          {
            id: 'orderId',
            name: 'orderId',
            value: 'ORD-0001',
            type: 'string',
          },
          {
            id: 'customerName',
            name: 'customerName',
            value: 'Jane Wanjiku',
            type: 'string',
          },
          {
            id: 'grandTotal',
            name: 'grandTotal',
            value: 6300,
            type: 'number',
          },
          {
            id: 'status',
            name: 'status',
            value: 'created',
            type: 'string',
          },
          {
            id: 'syncedToSheets',
            name: 'syncedToSheets',
            value: false,
            type: 'boolean',
          },
        ],
      },
    },
    position: [500, 200],
  },
  output: [
    {
      orderId: 'ORD-0001',
      customerName: 'Jane Wanjiku',
      grandTotal: 6300,
      status: 'created',
      syncedToSheets: false,
    },
  ],
});

// ----------------------------------------------------------------------------
// 3. IF — Only sync orders not yet synced
// ----------------------------------------------------------------------------
const needsSync = ifElse({
  version: 2.2,
  config: {
    name: 'IF - Needs Sync?',
    parameters: {
      conditions: {
        options: { caseSensitive: true, leftValue: '', typeValidation: 'strict' },
        conditions: [
          {
            leftValue: expr('{{ $json.syncedToSheets }}'),
            operator: { type: 'boolean', operation: 'equals' },
            rightValue: false,
          },
        ],
        combinator: 'and',
      },
    },
    position: [800, 200],
  },
});

// ----------------------------------------------------------------------------
// 4a. Skip — already synced (no-op branch)
// ----------------------------------------------------------------------------
const skipSync = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Already Synced',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          {
            id: 'note',
            name: 'note',
            value: 'Order already synced to Google Sheets',
            type: 'string',
          },
        ],
      },
    },
    position: [1100, 100],
  },
  output: [{ note: 'Order already synced to Google Sheets' }],
});

// ----------------------------------------------------------------------------
// 4b. Google Sheets — Append order row
//    spreadsheetId / sheetName are tenant config values (credential checklist item).
// ============================================================================
const sheetsAppend = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: {
    name: 'Google Sheets - Append Order',
    parameters: {
      resource: 'sheet',
      operation: 'append',
      authentication: 'oAuth2',
      documentId: { __rl: true, mode: 'id', value: '<YOUR_SPREADSHEET_ID>' },
      sheetName: { __rl: true, mode: 'name', value: 'Orders' },
      columns: {
        mappingMode: 'defineBelow',
        value: {
          orderId: expr('{{ $json.orderId }}'),
          customerName: expr('{{ $json.customerName }}'),
          grandTotal: expr('{{ $json.grandTotal }}'),
          status: expr('{{ $json.status }}'),
        },
        schema: [
          { id: 'orderId', displayName: 'Order ID', type: 'string', canBeUsedToMatch: true },
          { id: 'customerName', displayName: 'Customer Name', type: 'string' },
          { id: 'grandTotal', displayName: 'Total (KES)', type: 'number' },
          { id: 'status', displayName: 'Status', type: 'string' },
        ],
      },
      options: {
        cellFormat: 'USER_ENTERED',
        locationDefine: { values: { headerRow: 1 } },
        handlingExtraData: 'insertInNewColumn',
        useAppend: false,
      },
    },
    credentials: {
      googleApi: newCredential('Google API'),
      googleSheetsOAuth2Api: newCredential('Google Sheets'),
    },
    position: [1100, 300],
  },
  output: [{ updated: true }],
});

// ----------------------------------------------------------------------------
// 5. Respond/Log — Sync result
// ----------------------------------------------------------------------------
const syncResult = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: {
    name: 'Set - Sync Result',
    parameters: {
      mode: 'manual',
      includeOtherFields: true,
      assignments: {
        assignments: [
          {
            id: 'syncStatus',
            name: 'syncStatus',
            value: expr('{{ $json.updated ? "synced" : "failed" }}'),
            type: 'string',
          },
        ],
      },
    },
    position: [1400, 300],
  },
  output: [{ syncStatus: 'synced' }],
});

export default workflow('google-sheets-sync', 'Google Sheets Sync - Orders')
  .add(scheduleTrigger)
  .to(ordersToSync)
  .to(needsSync.onTrue(sheetsAppend.to(syncResult)).onFalse(skipSync));
