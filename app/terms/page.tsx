import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell, H } from "../components/Legal";

export const metadata: Metadata = {
  title: "Terms of Service — LazyRabbit",
  description:
    "The terms that govern your use of LazyRabbit’s AI voice-calling and messaging platform.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="23 June 2026">
      <p>
        These terms govern your use of LazyRabbit’s AI voice-calling and messaging platform (“the Service”). By
        creating an account or using the Service, you agree to them.
      </p>

      <H>1. The Service</H>
      <p>
        LazyRabbit lets you place and receive phone calls, send WhatsApp/SMS/email, run an AI assistant on those
        conversations, and manage the resulting records and integrations. We may add, change or remove features.
      </p>

      <H>2. Your responsibilities</H>
      <ul>
        <li>You must use the Service <strong>lawfully</strong> and only contact people you are permitted to contact.</li>
        <li>You are responsible for <strong>consent and disclosure</strong> — including any notice required before recording a call — in every jurisdiction you operate in.</li>
        <li>No spam, fraud, harassment, impersonation, or unsolicited bulk outreach that breaches telecom or anti-spam rules (e.g. TRAI/DND in India).</li>
        <li>You are responsible for the content of the scripts, messages and emails your assistant sends, and for the credentials you connect.</li>
        <li>Keep your login secure; you are responsible for activity under your account.</li>
      </ul>

      <H>3. Acceptable use</H>
      <p>
        You may not use the Service to break the law, infringe others’ rights, send malware, attempt to bypass
        usage or billing limits, or reverse-engineer the platform. We may suspend accounts that do.
      </p>

      <H>4. Billing</H>
      <ul>
        <li>The Service is prepaid: you add balance and calls/messages draw down minutes and usage against it.</li>
        <li>Charges are based on usage (call minutes, messages, provider fees). Prices may change with notice.</li>
        <li>Payments are processed by Razorpay. Taxes (e.g. GST) apply where required.</li>
        <li>Prepaid balances are for use within the Service and are non-refundable except where required by law.</li>
      </ul>

      <H>5. Third-party services</H>
      <p>
        The Service connects to providers like Plivo/Twilio, Google, Meta and any integrations you enable. Your
        use of those is also subject to their terms, and we aren’t responsible for their availability or actions.
      </p>

      <H>6. Data</H>
      <p>
        Our handling of data is described in our{" "}
        <Link href="/privacy">Privacy Policy</Link>. For your customers’ data, you are the controller and we act
        as your processor.
      </p>

      <H>7. Availability</H>
      <p>
        We aim for high availability but do not guarantee uninterrupted service. Calls depend on telecom and AI
        providers outside our control.
      </p>

      <H>8. Disclaimer and liability</H>
      <p>
        The Service is provided “as is” without warranties. To the maximum extent permitted by law, LazyRabbit
        is not liable for indirect or consequential losses, and our total liability is limited to the amount you
        paid us in the three months before the claim.
      </p>

      <H>9. Suspension and termination</H>
      <p>
        You may stop using the Service at any time. We may suspend or terminate accounts that breach these terms
        or pose a legal or security risk. On termination, your data is handled per the Privacy Policy.
      </p>

      <H>10. Changes</H>
      <p>We may update these terms; continued use after an update means you accept the revised terms.</p>

      <H>11. Governing law and contact</H>
      <p>
        These terms are governed by the laws of India. Questions:{" "}
        <a href="mailto:info@lazyrabbit.in">info@lazyrabbit.in</a>.
      </p>

      <p className="legal-fine">
        See also our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalShell>
  );
}
