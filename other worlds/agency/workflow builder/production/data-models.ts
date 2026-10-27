// ============================================================================
// AI Sales Agent & CRM — Production Data Models
// Tenant-isolated, reusable across retailers. Edit per-tenant via settings, not code.
// ============================================================================

// ----------------------------------------------------------------------------
// Tenants & retailer settings
// ----------------------------------------------------------------------------
export type TenantStatus = 'active' | 'paused' | 'demo' | 'suspended';

export interface Tenant {
  id: string;                 // e.g. "tn_nairobi_trendz"
  name: string;               // retailer display name
  status: TenantStatus;
  createdAt: string;          // ISO 8601
  updatedAt: string;
  settings: TenantSettings;
}

export interface TenantSettings {
  brandName: string;
  themeColor: string;         // hex
  demoMode: boolean;
  mpesaTill: string;          // demo: "554433"
  whatsappNumber?: string;    // international format, no +
  deliveryZones: Record<string, number>; // zone -> fee KES
  discountAllowed: boolean;
  followUpsAllowed: boolean;
  optOutRequired: boolean;
  currency: string;           // "KES"
  language: string;           // "en"
  humanHandoffEnabled: boolean;
  googleSheetsSpreadsheetId?: string;
  googleSheetsTab?: string;
  // WhatsApp Business Platform
  whatsappPhoneNumberId?: string;
  whatsappWebhookVerifyToken?: string;
  // M-Pesa Daraja
  mpesaConsumerKey?: string;
  mpesaConsumerSecret?: string;
  mpesaShortcode?: string;
  mpesaPasskey?: string;
  mpesaEnvironment: 'sandbox' | 'production';
}

// ----------------------------------------------------------------------------
// Products & variants
// ----------------------------------------------------------------------------
export interface ProductVariant {
  id: string;                 // e.g. "p_1_v_sneakers_42"
  productId: string;
  name: string;               // e.g. "EU 42"
  type: 'size' | 'colour' | 'custom';
  sku?: string;
  priceAdjustment: number;    // KES, can be 0
  stock: number | null;       // null = unknown / on request
}

export interface Product {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  price: number;              // KES, base unit price
  imageUrl?: string;
  variants: ProductVariant[];
  stock: number | null;       // product-level stock when no variants
  active: boolean;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Inventory (per-tenant snapshot)
// ----------------------------------------------------------------------------
export interface InventoryItem {
  productId: string;
  variantId?: string;
  quantityAvailable: number;
  reserved: number;
  lastSyncedAt: string;
  source: 'manual' | 'sheets' | 'pos' | 'api';
}

// ----------------------------------------------------------------------------
// Customers & CRM
// ----------------------------------------------------------------------------
export interface Customer {
  id: string;                 // e.g. "c_254712345678"
  tenantId: string;
  phone: string;              // international format, primary key-ish
  name?: string;
  email?: string;
  alternatePhones?: string[];
  totalOrders: number;
  totalSpent: number;         // KES
  lastOrderAt?: string;
  optedOut: boolean;          // marketing/follow-up opt-out
  optOutAt?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Conversations & messages
// ----------------------------------------------------------------------------
export interface Conversation {
  id: string;
  tenantId: string;
  customerId: string;
  channel: 'whatsapp' | 'web_demo';
  externalMessageId?: string; // WhatsApp message id
  state: ConversationState;
  cartId?: string;
  orderId?: string;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  humanHandoff: boolean;      // true if escalated to human
  handoffReason?: string;
}

export type ConversationState =
  | 'GREETING' | 'DISCOVERY' | 'PRODUCT_SELECTED' | 'VARIANT_SELECTION'
  | 'CART_BUILDING' | 'DELIVERY_SELECTION' | 'CUSTOMER_DETAILS' | 'ORDER_REVIEW'
  | 'AWAITING_CONFIRMATION' | 'ORDER_CREATED' | 'AWAITING_PAYMENT'
  | 'PAYMENT_VERIFIED' | 'FULFILMENT' | 'COMPLETED' | 'HUMAN_HANDOFF'
  | 'ERROR';

export interface Message {
  id: string;
  conversationId: string;
  direction: 'inbound' | 'outbound';
  channel: 'whatsapp' | 'web_demo';
  externalMessageId?: string;
  text: string;
  payload?: any;              // structured payload (product card, buttons, etc.)
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Carts
// ----------------------------------------------------------------------------
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  unitPrice: number;          // KES, snapshot at add time
  variantName?: string;
}

export interface Cart {
  id: string;
  tenantId: string;
  customerId?: string;
  conversationId: string;
  items: CartItem[];
  subtotal: number;           // KES
  deliveryFee: number;
  discount: number;
  grandTotal: number;         // KES
  deliveryZone?: string;
  status: 'active' | 'converted' | 'abandoned';
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;         // cart abandonment window
}

// ----------------------------------------------------------------------------
// Orders & order items
// ----------------------------------------------------------------------------
export type OrderStatus = 'created' | 'awaiting_payment' | 'paid' | 'fulfilled' | 'completed' | 'cancelled' | 'refunded';

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;          // KES
  lineTotal: number;          // KES
}

export interface Order {
  id: string;                 // e.g. "ORD-0001"
  tenantId: string;
  customerId: string;
  conversationId: string;
  cartId: string;
  items: OrderItem[];
  subtotal: number;           // KES
  discount: number;           // KES
  deliveryFee: number;        // KES
  grandTotal: number;         // KES
  amountPaid: number;         // KES, 0 until trusted verification
  outstandingBalance: number; // KES
  status: OrderStatus;
  paymentStatus: 'unpaid' | 'pending' | 'verified' | 'failed' | 'refunded';
  deliveryZone: string;
  customerName: string;
  customerPhone: string;
  paymentMethod?: 'mpesa' | 'cash_on_delivery' | 'other';
  paymentReference?: string;  // M-Pesa transaction id
  paymentVerifiedAt?: string;
  fulfilledAt?: string;
  completedAt?: string;
  syncedToSheets: boolean;
  syncError?: string;
  demoOrder: boolean;         // true for demo/simulated orders
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Order events (audit trail per order)
// ----------------------------------------------------------------------------
export type OrderEventType =
  | 'order.created' | 'order.confirmed' | 'payment.instructions_sent'
  | 'payment.verified' | 'payment.failed' | 'fulfilment.started'
  | 'fulfilment.completed' | 'order.cancelled' | 'human.handoff'
  | 'sync.sheets.success' | 'sync.sheets.failed' | 'followup.sent';

export interface OrderEvent {
  id: string;
  orderId: string;
  type: OrderEventType;
  actor: 'customer' | 'agent' | 'system' | 'human';
  message?: string;
  metadata?: any;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Payments
// ----------------------------------------------------------------------------
export type PaymentStatus = 'pending' | 'verified' | 'failed' | 'refunded';

export interface Payment {
  id: string;
  orderId: string;
  tenantId: string;
  method: 'mpesa' | 'cash_on_delivery' | 'other';
  amount: number;             // KES
  transactionReference?: string; // M-Pesa transaction id
  phoneNumber?: string;
  status: PaymentStatus;
  verifiedAt?: string;
  callbackReceivedAt?: string;
  rawCallback?: any;          // full webhook payload for audit
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Delivery & fulfilment
// ----------------------------------------------------------------------------
export type FulfilmentStatus = 'pending' | 'preparing' | 'dispatched' | 'delivered' | 'failed';

export interface Delivery {
  id: string;
  orderId: string;
  zone: string;
  fee: number;                // KES
  address?: string;
  status: FulfilmentStatus;
  trackingNumber?: string;
  estimatedDelivery?: string; // ISO
  deliveredAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------------
// Follow-ups & opt-outs
// ----------------------------------------------------------------------------
export type FollowUpType = 'incomplete_checkout' | 'post_purchase' | 'review_request' | 'promotional';

export interface FollowUp {
  id: string;
  tenantId: string;
  customerId: string;
  conversationId?: string;
  orderId?: string;
  type: FollowUpType;
  channel: 'whatsapp';
  scheduledAt: string;
  sentAt?: string;
  status: 'scheduled' | 'sent' | 'skipped' | 'cancelled';
  consentVerified: boolean;   // opted-in / not opted-out
  templateId?: string;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Human handoffs
// ----------------------------------------------------------------------------
export interface HumanHandoff {
  id: string;
  conversationId: string;
  tenantId: string;
  customerId: string;
  reason: string;
  assignedTo?: string;        // staff member
  status: 'open' | 'resolved' | 'closed';
  createdAt: string;
  resolvedAt?: string;
}

// ----------------------------------------------------------------------------
// Integration events
// ----------------------------------------------------------------------------
export type IntegrationResult = 'success' | 'failure' | 'retrying';

export interface IntegrationEvent {
  id: string;
  tenantId: string;
  integration: 'whatsapp' | 'mpesa' | 'google_sheets' | 'webhook';
  eventType: string;
  referenceId?: string;       // order id, payment id, etc.
  direction: 'inbound' | 'outbound';
  status: IntegrationResult;
  requestPayload?: any;
  responsePayload?: any;
  errorMessage?: string;
  retryCount: number;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Audit logs
// ----------------------------------------------------------------------------
export type AuditAction = 'create' | 'read' | 'update' | 'delete' | 'escalate' | 'opt_out';

export interface AuditLog {
  id: string;
  tenantId: string;
  actor: string;              // user/system id
  action: AuditAction;
  entityType: string;
  entityId: string;
  before?: any;
  after?: any;
  createdAt: string;
}

// ----------------------------------------------------------------------------
// Demo / simulation helpers
// ----------------------------------------------------------------------------
export interface DemoOrder {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  items: string;
  zone: string;
  grandTotal: number;
  paid: number;
  paymentVerified: boolean;
  syncedToSheets: boolean;
  status: string;
}

export interface CartLine {
  productId: number | string;
  price: number;
  qty: number;
  variant?: string;
}
