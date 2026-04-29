import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Love Key"
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "support@lovekey.com.au"

interface AdminOrderNotificationProps {
  customerName?: string
  customerEmail?: string
  orderDetails?: string
  totalAmount?: string
  shippingAddress?: string
  sessionId?: string
}

const AdminOrderNotificationEmail = ({
  customerName,
  customerEmail,
  orderDetails,
  totalAmount,
  shippingAddress,
  sessionId,
}: AdminOrderNotificationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New order from {customerName || 'a customer'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🛒 New Order Received</Heading>
        <Hr style={divider} />
        <Section style={infoBox}>
          <Text style={label}>Customer</Text>
          <Text style={value}>{customerName || 'N/A'}</Text>
          {customerEmail && <Text style={emailText}>{customerEmail}</Text>}
        </Section>
        {orderDetails && (
          <Section style={infoBox}>
            <Text style={label}>Items</Text>
            <Text style={value}>{orderDetails}</Text>
          </Section>
        )}
        {totalAmount && (
          <Section style={infoBox}>
            <Text style={label}>Total</Text>
            <Text style={value}>{totalAmount}</Text>
          </Section>
        )}
        {shippingAddress && (
          <Section style={infoBox}>
            <Text style={label}>Deliver to</Text>
            <Text style={value}>{shippingAddress}</Text>
          </Section>
        )}
        {sessionId && (
          <Section style={infoBox}>
            <Text style={label}>Stripe Session</Text>
            <Text style={value}>{sessionId}</Text>
          </Section>
        )}
        <Hr style={divider} />
        <Text style={footer}>This is an automated notification from {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminOrderNotificationEmail,
  subject: (data: Record<string, any>) => `New order from ${data.customerName || 'a customer'}`,
  displayName: 'Admin order notification',
  to: ADMIN_EMAIL,
  previewData: {
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    orderDetails: '2x Love Key Guardian (Pink), 1x Love Key Guardian (Blue)',
    totalAmount: 'A$24.85',
    shippingAddress: '123 Main St, Sydney NSW 2000, AU',
    sessionId: 'cs_test_abc123def456',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Helvetica Neue', Arial, sans-serif" }
const container = { padding: '20px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a1a1a', margin: '0 0 10px' }
const infoBox = { backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '12px 16px', margin: '0 0 8px' }
const label = { fontSize: '11px', color: '#999999', textTransform: 'uppercase' as const, margin: '0 0 4px', letterSpacing: '0.5px' }
const value = { fontSize: '14px', color: '#1a1a1a', margin: '0', fontWeight: '500' as const }
const emailText = { fontSize: '13px', color: '#666666', margin: '4px 0 0' }
const divider = { borderColor: '#eeeeee', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '0', textAlign: 'center' as const }
