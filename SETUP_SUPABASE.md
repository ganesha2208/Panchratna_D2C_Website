# Backend setup

The site uses **Supabase** for storing orders (placed at checkout) and
contact leads (from the contact form). The **/admin** dashboard lets you sign
in and view both.

Admin sign-in is **simple username/password** — credentials live in env vars,
not in Supabase Auth — so no extra user management is needed. Defaults are
`admin` / `admin`.

## 1. Create a Supabase project

1. Go to https://supabase.com → **New project**.
2. Pick a region close to your customers — for India, **Mumbai (ap-south-1)**
   is the lowest latency.
3. Save the database password somewhere safe.

## 2. Run the schema

In the Supabase dashboard:

1. **SQL Editor → New query**.
2. Open `supabase/schema.sql` from this repo, paste the whole file, **Run**.
3. You should see `Success. No rows returned.`

This creates the `contact_leads` and `orders` tables, indexes, and locks them
down with Row Level Security (only the service-role key can read/write).

## 3. Fill in `.env.local`

Copy `.env.local.example` to `.env.local`, then edit:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API → `anon` public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → `service_role` secret |
| `ADMIN_USERNAME` | Defaults to `admin`. Change for production. |
| `ADMIN_PASSWORD` | Defaults to `admin`. Change for production. |
| `ADMIN_AUTH_SECRET` | Run `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |

> The `service_role` key bypasses Row Level Security. Never commit it,
> never expose it to the browser. It's only read by server actions.

Restart `npm run dev` after saving `.env.local` so it picks the new env vars up.

## 4. Sign in

Visit http://localhost:3000/admin — you'll be redirected to
`/admin/login`. Sign in with the username and password you set (defaults
`admin`/`admin`). The dashboard lists the most recent 100 orders and 100
contact leads.

## 5. Verify it works end-to-end

- Submit the contact form on `/contact` → row appears in `contact_leads`.
- Place a test order via `/checkout` → row appears in `orders`.
- Both show up in the admin dashboard within a refresh.

## Production checklist

Before deploying:

- [ ] Change `ADMIN_USERNAME` and `ADMIN_PASSWORD` away from defaults.
- [ ] Set a strong, random `ADMIN_AUTH_SECRET` (32+ bytes hex).
- [ ] Make sure cookies are sent only over HTTPS — handled automatically when
      `NODE_ENV=production`.
- [ ] Confirm `.env.local` (or the equivalent on your host) is not committed.

## Notes

- Writes go through server actions using the service-role key. RLS denies
  everything else, so the anon key alone cannot read order or lead data.
- Order prices are recomputed server-side from `src/lib/product.ts` so a
  tampered cart cannot underpay. If you change pack prices in `product.ts`,
  existing orders keep their original totals (stored as columns).
- The contact form requires either a phone or an email — that constraint
  lives in `src/app/contact/actions.ts`.
