# 🧭 Ashpos – Frontend [Ashpos]

The Ashpos dispensary POS frontend: Next.js app (Turborepo) for multi-org, multi-store cannabis retail—inventory, orders, customers, loyalty, barcode scanning, reports, and optional Electron desktop build.

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

This is the **frontend** of Ashpos, a cannabis dispensary point-of-sale and inventory system. The app supports multiple organizations and stores (routing by `organizationId` and `storeLinkName`), staff auth (JWT), and a full POS workflow: products, packages, orders, customers, loyalty, drawers, reports, and Metrc-oriented flows. The UI is built as a Turborepo with the main **ashpos** Next.js app; optional Electron build is available for desktop. All data is consumed via the Ashpos GraphQL backend.

---

## ✨ Features

- **Multi-org / multi-store** – Route by organization and store link name; org-access and per-store dashboards.
- **POS & orders** – Order creation, order items, checkout; customer queue and order flow.
- **Products & packages** – Product catalog, package management, search, pagination, MJ vs non-MJ; barcode scanning (Dynamsoft, react-barcode).
- **Inventory** – Inventory views, drawer management, transfers, adjustments; Metrc-related package status.
- **Customers & loyalty** – Customer list/search, loyalty programs, loyalty history.
- **Reports & analytics** – Reports, charts (Chart.js, ApexCharts, Recharts), exports (Excel/ExcelJS).
- **Auth** – JWT-based login; token storage and refresh; role-aware UI.
- **i18n** – Multi-language support (en, es, fr, de, etc.) via locales in `public/locales`.
- **Optional Electron** – Desktop app build via `electron/` (electron:dev, electron:build, electron:dist).
- **Image upload** – S3 presigned upload (AWS SDK) for assets.

---

## 🧠 Tech Stack

| Category        | Technologies |
|----------------|--------------|
| **Languages**  | TypeScript |
| **Framework**  | Next.js 14 (App Router), Turborepo |
| **Data**       | GraphQL (Apollo/client), generated types & operations (.gql → codegen) |
| **State**      | Jotai (atoms), Redux (theme/slice), TanStack React Query |
| **Styling**    | Tailwind CSS, Mantine, Headless UI |
| **UI**         | Mantine DataTable, ApexCharts, FullCalendar, Flatpickr, Tippy, Swiper |
| **Forms**      | Formik, Yup |
| **Barcode/Scan** | Dynamsoft (Camera Enhancer, Capture Vision, Barcode), react-barcode |
| **Other**      | JWT (jwt-decode, @hapi/jwt), date-fns, moment, i18next, ExcelJS, file-saver, react-to-print |

---

## ⚙️ Installation

```bash
# Clone the repository (from Ashpos root or frontend folder)
git clone https://github.com/polymath1108/ashesfrontend.git
cd ashesfrontend

# Install dependencies (from monorepo root)
npm install
# or
pnpm install
```

Create `.env.local` (or per-app env) with backend GraphQL URL and any API keys (see [Configuration](#configuration)).

For the **ashpos** app, generate GraphQL types and operations:

```bash
cd apps/ashpos
npm run codegen
```

---

## 🚀 Usage

**From monorepo root (recommended):**

```bash
# Development (runs all apps; ashpos is the main app)
npm run dev
# or
pnpm dev
```

**From ashpos app only:**

```bash
cd apps/ashpos
npm run dev
```

Then open your browser and go to:

👉 [http://localhost:3000](http://localhost:3000)

Routes are under `/org/[organizationId]/[storeLinkName]/...` for store-specific dashboards and POS.

**Production:**

```bash
npm run build
npm run start
# or from apps/ashpos
cd apps/ashpos && npm run build && npm run start
```

**Electron (desktop):**

```bash
cd apps/ashpos
npm run electron:dev
# or electron:build / electron:dist
```

---

## 🧾 Configuration

Create a `.env.local` (or `.env`) in the repo root or in `apps/ashpos` with:

```env
# GraphQL backend (Ashpos API)
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
# or your deployed backend URL

# Optional: AWS S3 for image uploads
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
S3_BUCKET=...
```

Point `NEXT_PUBLIC_GRAPHQL_URL` to the Ashpos backend GraphQL endpoint (e.g. `http://localhost:4000/graphql`). Codegen uses this for schema introspection (see `apps/ashpos/codegen.yml`).

---

## 🖼 Screenshots
![alt text](image.png)

---

## 📜 API Documentation

The frontend talks to the **Ashpos backend** over **GraphQL**. All operations are defined in `apps/ashpos/api/query/*.gql` and `apps/ashpos/api/mutation/*.gql` and used via generated TypeScript (e.g. `src/__generated__/operationsWithAuth.ts`).

Main domains (see backend `schema.graphql`):

- **Organization** – organization, allOrganizations.
- **Dispensary** – dispensary, allDispensaries, allDispensariesByOrganizationId.
- **Product** – product, allProductsByDispensaryId, search, pagination, topProductsForCustomer.
- **Package** – package, allPackagesByDispensaryId, search, status filters, audit.
- **Order** – order CRUD, order items, customer queue.
- **Customer** – customer list/search, loyalty.
- **User / Auth** – login, register, JWT-protected operations.

Run the backend and use GraphQL Playground at [http://localhost:4000/graphql](http://localhost:4000/graphql) to explore the full schema.

---

## 📬 Contact

- **Author:** PJS  
- **Email:** ruka59171@gmail.com  
- **GitHub:** @Polymath1108  
- **Website/Portfolio:**  

---

## 🌟 Acknowledgements

- **Next.js** – React framework and routing.
- **Turborepo** – Monorepo build and tasks.
- **GraphQL Codegen** – Typed operations and schema.
- **Ashpos backend** – GraphQL API (Hapi, Apollo, Prisma).
- **Dynamsoft** – Barcode and capture vision.
- **Mantine / Tailwind** – UI and styling.
