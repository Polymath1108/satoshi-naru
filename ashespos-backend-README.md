# 🧭 Ashpos – Backend [Ashpos]

The Ashpos dispensary POS API: GraphQL server (Hapi + Apollo) with Prisma and PostgreSQL—organizations, dispensaries, products, packages, orders, customers, inventory, loyalty, Metrc integration, and JWT auth.

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

This is the **backend** of Ashpos, a cannabis dispensary point-of-sale and inventory system. It exposes a **GraphQL API** built with **Hapi** and **Apollo Server** (SDL-first): the schema is defined in `schema.graphql` and resolvers use **Prisma** against **PostgreSQL**. The API covers organizations, dispensaries, products, packages, orders, customers, drawers, inventory, transfers, loyalty, discounts, tax settings, Metrc sync, reports, and user/auth. JWT auth protects mutations and queries; optional SendGrid and Twilio are used for email and SMS (e.g. notifications, registration).

---

## ✨ Features

- **Organizations & dispensaries** – Multi-tenant orgs and stores; store link names, licenses, timezone, Metrc connection.
- **Products & packages** – Product catalog, package management, status and assignment; MJ vs non-MJ; Metrc categories and adjustments.
- **Orders & order items** – Order lifecycle, order items, customer queue; pagination and search.
- **Customers & loyalty** – Customer CRUD, loyalty programs, loyalty history.
- **Inventory** – Drawers, inventory, transfers, adjustments; zero/tiny Metrc quantity reports; audit discrepancy.
- **Discounts & tax** – Discounts, tax settings, tax history, tax apply.
- **Metrc** – Metrc API integration (sync, items, categories, adjustments); sync history.
- **Users & auth** – User model, JWT (Hapi JWT, jsonwebtoken); login/register; role/types (UserType).
- **Email & SMS** – SendGrid (e.g. registration, notifications), Twilio (SMS); email templates in `src/email/`.
- **Scheduled jobs** – node-cron for recurring tasks.
- **GraphQL** – Full schema in `schema.graphql`; codegen for TypeScript types.

---

## 🧠 Tech Stack

| Category        | Technologies |
|----------------|--------------|
| **Languages**  | TypeScript |
| **Runtime**    | Node.js |
| **Framework**  | Hapi |
| **GraphQL**    | Apollo Server 4, @as-integrations/hapi, graphql-scalars |
| **Database**   | PostgreSQL, Prisma ORM |
| **Auth**       | JWT (@hapi/jwt, hapi-auth-jwt2, jsonwebtoken) |
| **Validation** | Joi |
| **Email/SMS**  | SendGrid, Twilio |
| **Tools**      | dotenv, node-cron, nodemon, pm2, GraphQL Codegen |

---

## ⚙️ Installation

```bash
# Clone the repository (from Ashpos root or backend folder)
git clone https://github.com/polymath1108/ashesbackend.git
cd ashesbackend

# Install dependencies
npm install
```

Create a `.env` file in the project root (see [Configuration](#configuration)) with `DATABASE_URL` and other variables.

Generate Prisma client and run migrations:

```bash
npm run prisma-generate
npm run prisma-migrate
# Optional: seed database
npm run prisma-seed
```

---

## 🚀 Usage

**Development:**

```bash
npm run dev
```

Then open your browser and go to:

👉 GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)

**With auto-reload:**

```bash
npm run server
```

**Production (e.g. with PM2):**

```bash
npm run pm2-serve
# or: pm2 start npm --name backend -- run server
```

---

## 🧾 Configuration

Create a `.env` file in the backend root with:

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public

# JWT
JWT_SECRET=your_jwt_secret

# Optional: SendGrid (email)
SENDGRID_API_KEY=...

# Optional: Twilio (SMS)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...

# Optional: Metrc (cannabis compliance)
# Metrc API base URL and keys as required by your resolvers
```

- **DATABASE_URL** – Used by Prisma; must point to a PostgreSQL instance.
- **JWT_SECRET** – Used to sign and verify JWT tokens for auth.

Prisma schema is in `prisma/schema.prisma`; switch provider or connection string there if needed.

---

## 🖼 Screenshots

N/A for backend; see frontend README for UI screenshots.

---

## 📜 API Documentation

The API is **GraphQL**. The schema is defined in **`schema.graphql`** at the project root.

**Endpoint:** `POST /graphql` (and often GET for Playground) at `http://localhost:4000/graphql`.

**Main areas:**

| Domain       | Examples (Query / Mutation) |
|-------------|-----------------------------|
| **Organization** | `organization`, `allOrganizations` |
| **Dispensary**   | `dispensary`, `allDispensaries`, `allDispensariesByOrganizationId` |
| **Product**      | `product`, `allProductsByDispensaryId`, `allProductsByDispensaryIdWithPages`, `getProductRowsByNameSearch`, `topProductsForCustomerByDispensaryId`, `getProductAndPackagesByNameSearch` |
| **Package**      | `package`, `allPackagesByDispensaryId`, `allPackagesByDispensaryIdWithPages`, `allPendingAdjustedPackagesByDispensaryId`, `packagesByDispensaryIdAndStatus`, `getZeroMetrcQtyPackagesByDispensaryId`, `auditDiscrepancyPackages` |
| **Order**        | Order CRUD, order items, customer queue |
| **Customer**     | Customer list/search, loyalty |
| **User / Auth**  | Login, register, JWT-protected resolvers |

Generate TypeScript types and operations for the frontend (or other clients) with:

```bash
npm run codegen
```

Codegen config: `codegen.ts` (introspection from running server or from `schema.graphql`).

---

## 📬 Contact

- **Author:** PJS  
- **Email:** ruka59171@gmail.com  
- **GitHub:** @Polymath1108  
- **Website/Portfolio:**  

---

## 🌟 Acknowledgements

- **Hapi** – Web framework.
- **Apollo Server** – GraphQL server and Hapi integration.
- **Prisma** – ORM and migrations.
- **PostgreSQL** – Database.
- **JWT** – Authentication.
- **SendGrid & Twilio** – Email and SMS.
- **Ashpos frontend** – Primary consumer of this API.
