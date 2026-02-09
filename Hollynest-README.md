# 🧭 Hollynest Clone (Website) [Project ID: P-343]

The Hollynest marketing and portal site: Next.js app with Supabase auth, Stripe subscriptions, embedded chatbot (RAG + session/analytics), and user dashboard—about, blog, pricing, creators, FAQ, and contact.

---

## 📚 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Screenshots](#screenshots)
- [API Documentation](#api-documentation)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## 🧩 About

This project is the **Hollynest website clone**: the main marketing and user portal for Hollynest. It provides public pages (about, blog, FAQ, pricing, creators, contact), user authentication and profiles (Supabase Auth), subscription flows (Stripe: Basic, Premium, VIP), and an embedded chatbot with session management and analytics backed by Supabase (RAG, conversations). The goal is a single Next.js app that serves the site, auth, billing, and chatbot UI, optionally proxying chat to an external backend via `NEXT_PUBLIC_CHATBOT_API_URL`.

---

## ✨ Features

- **Marketing & content** – About, blog, FAQ, pricing, creators, contact-us; privacy/terms.
- **Auth** – Login, register, forgot-password, reset-password; Supabase Auth; OAuth callback.
- **User dashboard** – Profile, change-password, delete-account; user-profile pages with embedded chatbot.
- **Subscriptions** – Stripe checkout (Basic/Premium/VIP), customer portal, webhooks; pricing and success/cancel pages.
- **Chatbot** – Embedded chat UI; API routes for chat, session, analytics, openai; can use external backend or internal RAG/session logic.
- **Session & analytics** – Session management, conversation storage, RAG/summaries; analytics and monitor routes.
- **STT / TTS** – API routes for speech-to-text and text-to-speech.
- **Forms & security** – EmailJS, hCaptcha, reCAPTCHA; docs for security patches and deployment.

---

## 🧠 Tech Stack

| Category        | Technologies |
|----------------|--------------|
| **Languages**  | TypeScript |
| **Framework**  | Next.js 15 (App Router) |
| **Database/Auth** | Supabase (PostgreSQL, Auth, SSR) |
| **Payments**   | Stripe |
| **Styling**    | Tailwind CSS |
| **UI**         | Radix UI, Shadcn-style, Lucide React |
| **State/Data** | TanStack React Query |
| **Forms**      | React Hook Form, Zod |
| **Other**      | next-themes, Framer Motion, Recharts, EmailJS, hCaptcha, Howler (audio) |

---

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hollynest-clone.git

# Navigate to the project directory
cd hollynest-clone

# Install dependencies
npm install
# or
pnpm install
```

Copy environment file and set variables (see [Configuration](#configuration)):

```bash
cp .env.example .env.local
# Edit .env.local with Supabase, Stripe, chatbot API URL, etc.
```

Run Supabase migrations/schema as needed (see `lib/supabase/schema.sql` and `docs/`).

---

## 🚀 Usage

```bash
# Development (binds to 0.0.0.0 for network access)
npm run dev
# or
pnpm dev
```

Then open your browser and go to:

👉 [http://localhost:3000](http://localhost:3000)

```bash
# Production build
npm run build
npm run start
# or
pnpm build
pnpm start
```

---

## 🧾 Configuration

Create a `.env.local` file in the project root. Example (see `docs/STRIPE_SETUP.md` and `docs/` for full lists):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=sk_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...
STRIPE_VIP_PRICE_ID=price_...

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Chatbot (optional – external backend)
NEXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000

# Email / Captcha (optional)
# EmailJS, hCaptcha, reCAPTCHA keys as needed
```

- **Supabase** – Auth and database (RAG, conversations, sessions).
- **Stripe** – Subscriptions, checkout, customer portal, webhooks.
- **NEXT_PUBLIC_CHATBOT_API_URL** – Base URL for chatbot API (default `http://localhost:8000`); used by `lib/chatbot-config.ts`.

---

## 🖼 Screenshots

![alt text](image.png)
---

## 📜 API Documentation

Next.js API routes (under `app/api/`):

| Area | Route | Description |
|------|-------|-------------|
| **Auth** | `/api/auth/login` | Login. |
| | `/api/auth/register` | Register. |
| | `/api/auth/logout` | Logout. |
| | `/api/auth/callback` | OAuth callback. |
| | `/api/auth/forgot-password` | Forgot password. |
| | `/api/auth/avatars` | Avatar-related. |
| **Dashboard** | `/api/dashboard/change-password` | Change password. |
| | `/api/dashboard/delete-account` | Delete account. |
| **Chatbot** | `/api/chatbot/chat` | Chat message. |
| | `/api/chatbot/session` | Session management. |
| | `/api/chatbot/analytics` | Analytics. |
| | `/api/chatbot/monitor` | Monitor. |
| | `/api/chatbot/openai` | OpenAI proxy/usage. |
| **Stripe** | `/api/stripe/create-checkout-session` | Create checkout session. |
| | `/api/stripe/customer-portal` | Customer portal. |
| | `/api/stripe/verify-session` | Verify session. |
| | `/api/stripe/webhook` | Stripe webhooks. |
| **Voice** | `/api/stt` | Speech-to-text. |
| | `/api/tts` | Text-to-speech. |

Chatbot client config: `lib/chatbot-config.ts` (base URL, endpoints). Database integration and analytics: `docs/CHATBOT_DATABASE_INTEGRATION.md`.

---

## 📬 Contact

- **Author:** PJS  
- **Email:** ruka59171@gmail.com  
- **GitHub:** @Polymath1108  
- **Website/Portfolio:**  

---

## 🌟 Acknowledgements

- **Next.js** – App Router and API routes.
- **Supabase** – Auth, database, RAG/session storage.
- **Stripe** – Subscriptions and payments.
- **Radix UI / Shadcn** – UI components.
- **Hollynest chatbot backend** – Optional external chat API.
- Docs: `docs/CHATBOT_DATABASE_INTEGRATION.md`, `docs/STRIPE_SETUP.md`, `docs/PERFORMANCE_OPTIMIZATION_GUIDE.md`, and other guides in `docs/`.
