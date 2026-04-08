import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Love Key"

interface OrderReceiptProps {
  customerName?: string
  orderDetails?: string
  totalAmount?: string
  shippingAddress?: string
  sessionId?: string
}

const OrderReceiptEmail = ({
  customerName,
  orderDetails,
  totalAmount,
  shippingAddress,
  sessionId,
}: OrderReceiptProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your {SITE_NAME} order confirmation</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Heading style={logo}>❤️ {SITE_NAME}</Heading>
        </Section>
        <Hr style={divider} />
        <Heading style={h1}>
          {customerName ? `Thank you, ${customerName}!` : 'Thank you for your order!'}
        </Heading>
        <Text style={text}>
          Your order has been received and is being processed. Here's a summary:
        </Text>
        {orderDetails && (
          <Section style={orderBox}>
            <Text style={label}>Items</Text>
            <Text style={value}>{orderDetails}</Text>
          </Section>
        )}
        {totalAmount && (
          <Section style={orderBox}>
            <Text style={label}>Total</Text>
            <Text style={value}>{totalAmount}</Text>
          </Section>
        )}
        {shippingAddress && (
          <Section style={orderBox}>
            <Text style={label}>Shipping to</Text>
            <Text style={value}>{shippingAddress}</Text>
          </Section>
        )}
        {sessionId && (
          <Text style={refText}>Order ref: {sessionId.substring(0, 16)}</Text>
        )}
        <Hr style={divider} />
        <Text style={text}>
          We'll send you a shipping update once your order is on its way. If you have any questions, reply to this email or reach out at hello@lovekey.com.au.
        </Text>
        <Text style={footer}>With love, The {SITE_NAME} Team 💛</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderReceiptEmail,
  subject: 'Your Love Key order confirmation',
  displayName: 'Order receipt',
  previewData: {
    customerName: 'Jane',
    orderDetails: '2x Love Key Guardian (Pink), 1x Love Key Essential (Blue)',
    totalAmount: 'A$24.85',
    shippingAddress: '123 Main St, Sydney NSW 2000, AU',
    sessionId: 'cs_test_abc123def456',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Helvetica Neue', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '560px', margin: '0 auto' }
const headerSection = { textAlign: 'center' as const, padding: '20px 0 10px' }
const logo = { fontSize: '24px', fontWeight: 'bold' as const, color: '#c82333', margin: '0' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '20px 0 10px' }
const text = { fontSize: '14px', color: '#555555', lineHeight: '1.6', margin: '0 0 16px' }
const orderBox = { backgroundColor: '#fafafa', borderRadius: '8px', padding: '12px 16px', margin: '0 0 8px' }
const label = { fontSize: '11px', color: '#999999', textTransform: 'uppercase' as const, margin: '0 0 4px', letterSpacing: '0.5px' }
const value = { fontSize: '14px', color: '#1a1a1a', margin: '0', fontWeight: '500' as const }
const refText = { fontSize: '12px', color: '#999999', margin: '12px 0 0' }
const divider = { borderColor: '#eeeeee', margin: '20px 0' }
const footer = { fontSize: '13px', color: '#888888', margin: '20px 0 0', textAlign: 'center' as const }
