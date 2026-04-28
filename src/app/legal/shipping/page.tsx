import type { Metadata } from "next";
import LegalLayout from "@/components/legal/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Shipping Policy" };

export default function ShippingPage() {
  return (
    <LegalLayout title="Shipping Policy" updated="April 2026">
      <p>We deliver Panchratna to serviceable pincodes across India.</p>

      <h2>Delivery timeline</h2>
      <p>Typical delivery time is {site.shipping.deliveryDays} from the date of order confirmation.</p>
      <ul>
        <li>Metros and Tier-1 cities: 3–5 working days</li>
        <li>Tier-2, Tier-3 towns and villages: 5–7 working days</li>
        <li>Remote areas: up to 10 working days</li>
      </ul>

      <h2>Shipping charges</h2>
      <ul>
        <li>Free shipping on orders above ₹{site.shipping.freeAbove}</li>
        <li>Flat fee of ₹{site.shipping.flatFee} on orders below ₹{site.shipping.freeAbove}</li>
      </ul>

      <h2>Order tracking</h2>
      <p>
        Once your order ships, we will send tracking details via WhatsApp and SMS. You can
        also call us for updates.
      </p>

      <h2>Undeliverable addresses</h2>
      <p>
        If our courier is unable to deliver (incorrect address, customer unavailable), we
        will attempt to reach you. After three failed attempts, the order will be returned
        to us and a refund processed (minus shipping cost).
      </p>

      <h2>Damaged packages</h2>
      <p>
        Inspect your package at the time of delivery. If it appears tampered or damaged,
        refuse it and call us immediately at {site.contact.phone}.
      </p>

      <h2>Contact</h2>
      <p>
        Shipping queries: {site.contact.email} · {site.contact.phone}
      </p>
    </LegalLayout>
  );
}
