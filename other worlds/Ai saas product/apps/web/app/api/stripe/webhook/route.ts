import { NextRequest, NextResponse } from 'next/server';
import { getStripe, verifyWebhookSignature, handleStripeWebhook } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  if (!verifyWebhookSignature(Buffer.from(body), signature)) {
    console.error('Invalid webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    console.error('Stripe not configured');
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook constructEvent failed:', err);
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 });
  }

  await handleStripeWebhook(event);

  return NextResponse.json({ received: true });
}