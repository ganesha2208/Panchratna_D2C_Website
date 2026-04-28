import "server-only";
import { Resend } from "resend";
import { formatINR } from "@/lib/utils";

// Resend free tier sends from `onboarding@resend.dev` until you verify your
// own domain. Override RESEND_FROM_EMAIL in env to use your domain.
const DEFAULT_FROM = "Panchratna <onboarding@resend.dev>";

function getClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function getRecipients(): string[] | null {
  const raw = process.env.ADMIN_NOTIFY_EMAIL;
  if (!raw) return null;
  const list = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return list.length ? list : null;
}

function adminLink(path: string): string | null {
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!base) return null;
  return `${base}${path}`;
}

type OrderItem = {
  pack_label: string;
  volume: string;
  quantity: number;
  price: number;
  line_total: number;
};

type OrderPayload = {
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
};

export async function notifyNewOrder(order: OrderPayload) {
  const client = getClient();
  const to = getRecipients();
  if (!client || !to) return;

  const itemRows = order.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 12px 6px 0">${i.volume} × ${i.quantity}</td><td style="padding:6px 0;text-align:right">${formatINR(i.line_total)}</td></tr>`,
    )
    .join("");

  const link = adminLink("/admin/orders");
  const linkHtml = link
    ? `<p style="margin:24px 0 0"><a href="${link}" style="color:#55a125;font-weight:600;text-decoration:none">View in dashboard →</a></p>`
    : "";

  const html = `
<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#14300a;background:#f8faf6;margin:0;padding:24px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e0f3e0;border-radius:12px;padding:24px">
    <div style="font-size:12px;color:#55a125;text-transform:uppercase;letter-spacing:1px;font-weight:700">New order</div>
    <h1 style="font-size:22px;margin:8px 0 4px">#${order.orderCode}</h1>
    <div style="font-size:14px;color:#44801e">${formatINR(order.total)} · ${order.paymentMethod.toUpperCase()}</div>

    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e0f3e0">
      <div style="font-size:14px"><strong>${order.customerName}</strong></div>
      <div style="font-size:13px;color:#44801e">${order.customerPhone}${order.customerEmail ? ` · ${order.customerEmail}` : ""}</div>
      <div style="font-size:13px;color:#356519;margin-top:4px">${order.city}, ${order.state} - ${order.pincode}</div>
    </div>

    <table style="width:100%;margin-top:20px;font-size:14px;border-collapse:collapse">
      ${itemRows}
      <tr><td style="padding-top:12px;border-top:1px solid #e0f3e0;color:#44801e">Subtotal</td><td style="padding-top:12px;border-top:1px solid #e0f3e0;text-align:right">${formatINR(order.subtotal)}</td></tr>
      <tr><td style="color:#44801e">Shipping</td><td style="text-align:right">${order.shippingFee === 0 ? "Free" : formatINR(order.shippingFee)}</td></tr>
      <tr><td style="padding-top:8px;font-weight:700;font-size:16px">Total</td><td style="padding-top:8px;text-align:right;font-weight:700;font-size:16px">${formatINR(order.total)}</td></tr>
    </table>

    ${linkHtml}
  </div>
</body></html>`.trim();

  try {
    await client.emails.send({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
      to,
      subject: `New order #${order.orderCode} — ${formatINR(order.total)}`,
      html,
    });
  } catch (err) {
    console.error("[notify] order email failed", err);
  }
}

type LeadPayload = {
  name: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  message: string | null;
};

export async function notifyNewLead(lead: LeadPayload) {
  const client = getClient();
  const to = getRecipients();
  if (!client || !to) return;

  const link = adminLink("/admin/leads");
  const linkHtml = link
    ? `<p style="margin:24px 0 0"><a href="${link}" style="color:#55a125;font-weight:600;text-decoration:none">View in dashboard →</a></p>`
    : "";

  const contactBits: string[] = [];
  if (lead.phone) contactBits.push(lead.phone);
  if (lead.email) contactBits.push(lead.email);
  const contactLine = contactBits.join(" · ");

  const html = `
<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#14300a;background:#f8faf6;margin:0;padding:24px">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e0f3e0;border-radius:12px;padding:24px">
    <div style="font-size:12px;color:#fb8a3a;text-transform:uppercase;letter-spacing:1px;font-weight:700">New contact lead</div>
    <h1 style="font-size:22px;margin:8px 0 4px">${lead.name}</h1>
    ${contactLine ? `<div style="font-size:14px;color:#44801e">${contactLine}</div>` : ""}
    ${lead.city ? `<div style="font-size:13px;color:#356519;margin-top:4px">${lead.city}</div>` : ""}

    ${
      lead.message
        ? `<div style="margin-top:20px;padding:14px;background:#f2faf2;border-radius:8px;font-size:14px;line-height:1.5;white-space:pre-wrap">${escapeHtml(lead.message)}</div>`
        : ""
    }

    ${linkHtml}
  </div>
</body></html>`.trim();

  try {
    await client.emails.send({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM,
      to,
      subject: `New contact lead — ${lead.name}`,
      html,
      replyTo: lead.email || undefined,
    });
  } catch (err) {
    console.error("[notify] lead email failed", err);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
