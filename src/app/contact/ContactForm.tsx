"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactLead } from "./actions";

type FormState = {
  name: string;
  phone: string;
  email: string;
  city: string;
  message: string;
};

const initial: FormState = { name: "", phone: "", email: "", city: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const update = (k: keyof FormState, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setStatus({ kind: "submitting" });
    const result = await submitContactLead(form);
    if (result.ok) {
      setStatus({ kind: "success" });
      setForm(initial);
    } else {
      setStatus({ kind: "error", message: result.error });
    }
  };

  if (status.kind === "success") {
    return (
      <div className="card p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-5 text-center font-display text-2xl font-bold text-brand-950">
          Message received
        </h2>
        <p className="mt-2 text-center text-sm text-brand-700/80">
          A farmer-advisor will reach out within 24 hours. For faster help, reply to us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="btn-secondary btn-md mt-6 w-full"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8">
      <h2 className="font-display text-2xl font-bold text-brand-950">Send us a message</h2>
      <p className="mt-1 text-sm text-brand-700/70">
        We&apos;ll reply on WhatsApp or email within 24 hours.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          label="Name *"
          name="name"
          value={form.name}
          onChange={(v) => update("name", v)}
        />
        <Field
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(v) => update("phone", v)}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
        />
        <Field
          label="Village / City"
          name="city"
          value={form.city}
          onChange={(v) => update("city", v)}
        />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-brand-900">
          Crop / Question
        </label>
        <textarea
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          placeholder="e.g. I grow paddy on 3 acres, how much Panchratna do I need?"
        />
      </div>

      {status.kind === "error" && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-orange-50 p-3 text-sm text-orange-800 ring-1 ring-orange-100">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-none" />
          <span>{status.message}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="btn-primary btn-lg mt-6 w-full"
      >
        {status.kind === "submitting" ? "Sending..." : "Send message"}
      </button>
      <p className="mt-3 text-center text-xs text-brand-700/60">
        Phone or email required so we can reply.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
    </div>
  );
}
