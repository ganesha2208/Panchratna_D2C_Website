import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="April 2026">
      <p>
        By using {site.domain} (&ldquo;the Site&rdquo;) and placing an order with Green
        Raise Agro Pvt Ltd, you agree to the following terms.
      </p>

      <h2>1. Products & pricing</h2>
      <p>
        All prices listed are in Indian Rupees (₹) and include applicable taxes. We may
        change prices, product availability, and promotions at any time without notice.
        Images are representative; actual packaging may vary.
      </p>

      <h2>2. Orders</h2>
      <p>
        An order is confirmed only after our team verifies it by phone or WhatsApp. We
        reserve the right to refuse or cancel any order.
      </p>

      <h2>3. Payments</h2>
      <p>
        Currently we accept Cash on Delivery (COD) only. Online payment options will be
        added soon.
      </p>

      <h2>4. Shipping & delivery</h2>
      <p>
        See our <a href="/legal/shipping">Shipping Policy</a> for delivery timelines, fees, and coverage.
      </p>

      <h2>5. Returns & refunds</h2>
      <p>
        See our <a href="/legal/returns">Returns Policy</a>.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        All content, logos, trademarks, and product names on the Site are the property of
        Green Raise Agro Pvt Ltd and may not be used without permission.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        While we stand by Panchratna&apos;s quality, agricultural outcomes depend on many
        factors (soil, climate, crop type, application method). Our liability is limited
        to the purchase price of the product.
      </p>

      <h2>8. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any disputes are subject to the
        exclusive jurisdiction of the courts at our registered office.
      </p>

      <h2>9. Contact</h2>
      <p>
        For any questions: {site.contact.email} · {site.contact.phone}
      </p>
    </LegalLayout>
  );
}
