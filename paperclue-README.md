# 🧭 Paperclue – Frontend [Project ID: P-346]

The frontend for Paperclue.AI: a modern Next.js app for research paper management, AI-powered analysis, semantic search, and subscription flows—with i18n and dark mode.

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

This is the **frontend** of Paperclue.AI, a platform for managing and analyzing research papers. It provides the UI for uploading papers, viewing metadata, running AI analysis and insights, semantic search with filters, and subscription/billing flows. The app is built with Next.js and TypeScript for a responsive, accessible experience and talks to the Paperclue backend API for all data and AI features.

---

## ✨ Features

- **Modern UI/UX** – Responsive layout with Tailwind CSS and Shadcn/ui.
- **Paper management** – Upload (e.g. drag-and-drop), view, and organize research papers.
- **AI analysis** – Request summaries, key insights, and citations via the backend.
- **Search** – Full-text and semantic search with filters and sorting.
- **Internationalization** – Multi-language support (e.g. next-intl).
- **Dark mode** – Built-in theme switching.
- **State management** – Jotai for client state; TanStack Query for server state.
- **Forms** – React Hook Form with validation (e.g. Zod).

---

## 🧠 Tech Stack

| Category        | Technologies |
|----------------|--------------|
| **Languages**  | TypeScript |
| **Framework**  | Next.js 15 |
| **Styling**    | Tailwind CSS |
| **UI**         | Shadcn/ui, Radix UI, Lucide React |
| **State**      | Jotai, TanStack React Query |
| **Forms**      | React Hook Form, Zod |
| **i18n**       | next-intl, i18next |
| **Other**      | Axios, Framer Motion, Recharts, React PDF Viewer |

---

## ⚙️ Installation

```bash
# Clone the repository (from project root)
git clone https://github.com/Polymath1108/paperclue.git
cd paperclue/paperclue

# Install dependencies
npm install
# or
pnpm install
```

Copy environment file and set variables:

```bash
cp .env.example .env.local
# Edit .env.local with NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL, etc.
```

---

## 🚀 Usage

```bash
# Development
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

Create or edit `.env.local` in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Point `NEXT_PUBLIC_API_URL` to your Paperclue backend base URL.

---

## 🖼 Screenshots
![alt text](image.png)
![alt text](citation_checker.png)
---

## 📜 API Documentation

The frontend consumes the **Paperclue backend API**. Main areas:

- **Auth** – `/api/v1/auth/*` (login, register, tokens).
- **Papers** – `/api/v1/papers/*` (CRUD, upload).
- **Search** – `/api/v1/search/*` (semantic/full-text).
- **Analysis** – `/api/v1/analysis/*` (AI analysis, insights).

Backend docs when running: [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger), [http://localhost:8000/redoc](http://localhost:8000/redoc) (ReDoc).

---

## 📬 Contact

- **Author:** PJS  
- **Email:** ruka59171@gmail.com  
- **GitHub:** @Polymath1108  
- **Website/Portfolio:**  

---

## 🌟 Acknowledgements

- **Next.js** – React framework and App Router.
- **Shadcn/ui & Radix** – Accessible UI components.
- **Tailwind CSS** – Styling.
- **Paperclue backend** – API and AI services.
