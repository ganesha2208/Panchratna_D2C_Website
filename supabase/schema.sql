-- Panchratna Website — Supabase schema
-- Run this once in your Supabase project: SQL Editor → New query → paste → Run.
-- Safe to re-run: every statement uses IF NOT EXISTS / OR REPLACE where possible.

-- =============================================================
-- Tables
-- =============================================================

create table if not exists public.contact_leads (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text not null,
  phone        text,
  email        text,
  city         text,
  message      text,
  status       text not null default 'new'
);

create index if not exists contact_leads_created_at_idx
  on public.contact_leads (created_at desc);

create table if not exists public.orders (
  id                  uuid primary key default gen_random_uuid(),
  order_code          text unique not null,
  created_at          timestamptz not null default now(),
  customer_name       text not null,
  customer_phone      text not null,
  customer_email      text,
  shipping_address1   text not null,
  shipping_address2   text,
  shipping_city       text not null,
  shipping_state      text not null,
  shipping_pincode    text not null,
  shipping_notes      text,
  items               jsonb not null,
  subtotal            integer not null,
  shipping_fee        integer not null default 0,
  total               integer not null,
  payment_method      text not null default 'cod',
  status              text not null default 'pending'
);

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

-- =============================================================
-- Row Level Security
--
-- Strategy:
--   * All writes (lead capture, order placement) and admin reads go through
--     server-side code using the service-role key, which bypasses RLS.
--   * RLS is enabled with NO policies, so anon and authenticated roles get
--     nothing. Defence-in-depth: the anon key alone cannot read this data.
-- =============================================================

alter table public.contact_leads enable row level security;
alter table public.orders        enable row level security;
