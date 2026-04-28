import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="April 2026">
      <p>
        Green Raise Agro Pvt Ltd (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)
        operates {site.domain} and respects the privacy of every customer. This policy
        explains what information we collect, how we use it, and the choices you have.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>Name, phone, email, and shipping address (for order delivery)</li>
        <li>Order history and product preferences</li>
        <li>Basic device and browsing data (cookies, analytics)</li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To process and deliver your orders</li>
        <li>To contact you about your orders and support queries</li>
        <li>To send occasional updates and farming tips (you can unsubscribe anytime)</li>
        <li>To improve our website, products, and service</li>
      </ul>

      <h2>3. Sharing of information</h2>
      <p>
        We share your information only with trusted logistics and communication partners
        who help fulfill your order (e.g. courier services, SMS/WhatsApp providers). We
        never sell your personal data.
      </p>

      <h2>4. Data security</h2>
      <p>
        We use reasonable technical and organizational measures to protect your data.
        However, no online transmission can be guaranteed 100% secure.
      </p>

      <h2>5. Your rights</h2>
      <p>
        You can request access, correction, or deletion of your data by writing to{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
      </p>

      <h2>6. Contact</h2>
      <p>
        For any privacy-related questions, reach us at {site.contact.email} or call{" "}
        {site.contact.phone}.
      </p>
    </LegalLayout>
  );
}
