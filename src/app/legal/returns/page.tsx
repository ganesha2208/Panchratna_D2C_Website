import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <LegalLayout title="Returns & Refunds" updated="April 2026">
      <p>
        We stand behind the quality of Panchratna. This policy explains when a return or
        refund is possible.
      </p>

      <h2>When can you return a product?</h2>
      <ul>
        <li>The product arrived damaged or with a broken seal</li>
        <li>You received the wrong product or pack size</li>
        <li>The product is defective (e.g. contaminated, wet, infested)</li>
      </ul>

      <p>
        Return requests must be raised within <strong>48 hours</strong> of delivery by
        calling {site.contact.phone} or emailing {site.contact.email} with photos.
      </p>

      <h2>Non-returnable</h2>
      <ul>
        <li>Opened or partially used bags (due to the organic nature of the product)</li>
        <li>Products damaged by improper storage after delivery</li>
        <li>Orders placed by mistake (we recommend calling us if unsure about dosage)</li>
      </ul>

      <h2>Refund process</h2>
      <ul>
        <li>Once the return is verified, we will issue a refund or replacement within 7 working days.</li>
        <li>For Cash on Delivery orders, refunds are processed by bank transfer or UPI.</li>
      </ul>

      <h2>Cancellations</h2>
      <p>
        You can cancel a pending order free of charge before it is dispatched. Call{" "}
        {site.contact.phone} as soon as possible.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about a return: {site.contact.email} · {site.contact.phone}
      </p>
    </LegalLayout>
  );
}
