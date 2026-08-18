import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, H } from "../components/Legal";

export const metadata: Metadata = {
  title: "Privacy Policy — LazyRabbit",
  description:
    "How LazyRabbit handles your data on its AI voice-calling and messaging platform — what we collect, why, our sub-processors, and your rights.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="23 June 2026">
      <p>
        LazyRabbit (“LazyRabbit”, “we”, “us”) provides an AI voice-calling and messaging platform that lets
        businesses place and receive phone calls, send WhatsApp/email/SMS, and manage the resulting customer
        records. This policy explains what data we handle, why, and your rights over it.
      </p>
      <p>
        For data about <em>your</em> customers (the people you call or message), <strong>you are the data
        controller and LazyRabbit is your processor</strong> — we handle that data only to provide the service
        to you and on your instructions.
      </p>

      <H>1. Information we handle</H>
      <ul>
        <li><strong>Account data:</strong> your name, business name, username, email, phone, billing details and GSTIN.</li>
        <li><strong>Call data:</strong> call recordings, transcripts, AI-generated summaries, call metadata (numbers, time, duration, outcome) and token/usage counts.</li>
        <li><strong>Customer (CRM) data:</strong> the name, phone and conversation history of the people you call or message, plus follow-up schedules.</li>
        <li><strong>Messaging data:</strong> WhatsApp / SMS / email content you send through the platform and inbound replies.</li>
        <li><strong>Integration credentials:</strong> the keys, tokens and passwords you enter to connect providers (telephony, WhatsApp, SMTP, payment, Google, custom APIs).</li>
        <li><strong>Payment data:</strong> handled by our payment processor (Razorpay); we store invoices and the amount, not card details.</li>
        <li><strong>KYC data</strong> (only if you request a phone number): business name and PAN; Aadhaar is stored masked (last 4 digits only) — never in full.</li>
      </ul>

      <H>2. How we use it</H>
      <ul>
        <li>To place/receive calls and messages and transcribe, summarise and store them so you can review and follow up.</li>
        <li>To run connected integrations you enable (e.g. check a calendar, send an email) during or after a call.</li>
        <li>To bill you, prevent abuse, and provide support.</li>
        <li>We do <strong>not</strong> sell your data or your customers’ data, and we do not use it to train third-party models beyond what is needed to generate a single response.</li>
      </ul>

      <H>3. Sub-processors</H>
      <p>We rely on a small number of trusted service providers to deliver the service. Each processes only the data needed for its function, under contract, and only to provide the service to you:</p>
      <ul>
        <li><strong>Cloud database and file storage</strong> — to store your account, call and customer records (hosted in the India region).</li>
        <li><strong>Telephony and messaging providers</strong> — to place and receive calls and deliver WhatsApp/SMS.</li>
        <li><strong>AI speech and language providers</strong> — for real-time speech-to-text, language understanding and text-to-speech.</li>
        <li><strong>Payment processor</strong> — to handle billing and process payments securely; we do not store card details.</li>
        <li><strong>Integrations you connect</strong> — only if you enable them (e.g. calendar, spreadsheets, email/SMTP, chat, custom APIs), and only the data needed to perform the action you set up.</li>
      </ul>
      <p>A current list of our named sub-processors is available on request at <a href="mailto:info@lazyrabbit.in">info@lazyrabbit.in</a>.</p>

      <H>4. Where data is stored</H>
      <p>Your data is stored on Supabase infrastructure in the <strong>Mumbai (India)</strong> region. Some sub-processors may process data in other regions to deliver their service.</p>

      <H>5. Security</H>
      <ul>
        <li>All traffic is <strong>encrypted in transit (HTTPS/TLS)</strong>.</li>
        <li>Each account’s data is <strong>logically isolated</strong> — you can only access your own calls, customers and recordings.</li>
        <li>Access is protected by authentication and per-account scoping.</li>
      </ul>

      <H>6. How long we keep it</H>
      <p>
        We retain your account data, call recordings, transcripts and customer records for as long as your
        account is active, so you can review past activity. You can delete any call, recording or customer record
        at any time from your dashboard. On account closure or written request, we delete your data within a
        reasonable period, except where we must retain it to meet legal, tax or fraud-prevention obligations.
      </p>

      <H>7. Your rights</H>
      <p>
        You can access, export, correct or delete your data. To exercise these rights, or for any privacy
        question, contact us at <a href="mailto:info@lazyrabbit.in">info@lazyrabbit.in</a>.
      </p>

      <H>8. Call recording and consent</H>
      <p>
        Calls placed or received through the platform may be recorded and transcribed. <strong>You are responsible
        for providing any disclosure or obtaining any consent required by law</strong> in the jurisdictions you call,
        and for using the platform only for lawful, consented outreach.
      </p>

      <H>9. Cookies</H>
      <p>We use a minimal set of storage (an authentication token) needed to keep you signed in. We do not use third-party advertising cookies.</p>

      <H>10. Children</H>
      <p>The service is for businesses and is not directed to anyone under 18.</p>

      <H>11. Changes</H>
      <p>We may update this policy; we’ll revise the “last updated” date above and, for material changes, notify you.</p>

      <H>12. Contact</H>
      <p>LazyRabbit — <a href="mailto:info@lazyrabbit.in">info@lazyrabbit.in</a></p>

      <p className="legal-fine">
        See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalShell>
  );
}
