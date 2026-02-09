# 🧭 Paperclue – Backend [Project ID: P-346]

The backend service for Paperclue.AI: FastAPI app providing AI-powered paper analysis (Mistral/OpenAI), semantic search, journal formatting, subscriptions (Stripe), and auth—with PostgreSQL and Alembic.

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

This is the **backend** of Paperclue.AI. It powers paper uploads, AI analysis (e.g. Mistral, OpenAI), semantic search, journal formatting and guide fetching (multi-API: Crossref, DOAJ, Elsevier, IEEE, OpenAlex, PMC, etc.), proofreading, subscriptions and payments (Stripe), team management, and authentication. The goal is a single API that the Paperclue frontend (and other clients) use for all research-paper and billing features.

---

## ✨ Features

- **AI paper analysis** – Summaries, insights, and analysis using Mistral/OpenAI.
- **Semantic search** – Find papers by natural language queries.
- **Paper management** – Upload, store, and manage papers and metadata.
- **Journal APIs** – Integrations with Crossref, DOAJ, Elsevier, IEEE, OpenAlex, PMC, Taylor & Francis, Wiley, Web of Science, OJS.
- **Journal formatting** – Format manuscripts to journal guidelines; fetch journal guides.
- **Proofreader & humanization** – AI-assisted proofreading and style adjustments.
- **User auth** – Registration, login, JWT, OAuth (e.g. Keycloak).
- **Subscriptions** – Stripe subscriptions, webhooks, promo codes, team invites.
- **Email** – Brevo for transactional and marketing emails (verification, billing, etc.).
- **API docs** – Swagger UI and ReDoc.

---

## 🧠 Tech Stack

| Category        | Technologies |
|----------------|--------------|
| **Languages**  | Python |
| **Framework**  | FastAPI |
| **Database**   | PostgreSQL, SQLAlchemy |
| **Migrations** | Alembic |
| **AI / LLM**   | Mistral AI, OpenAI (e.g. Groq) |
| **Payments**   | Stripe |
| **Email**      | Brevo |
| **Docs/PDF**   | python-docx, PyMuPDF, PyPDF2, BeautifulSoup |
| **Tools**      | Pydantic, python-dotenv, Uvicorn |

---

## ⚙️ Installation

```bash
# Clone the repository (from project root)
git clone https://github.com/Polymath1108/paperclue.git
cd paperclue/paperclue-backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Unix/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Copy environment file and set variables:

```bash
cp .env.example .env
# Edit .env with database, API keys, Stripe, etc.
```

Create database and run migrations:

```bash
alembic upgrade head
```

---

## 🚀 Usage

```bash
# Development
uvicorn main:app --reload
```

Then open your browser and go to:

👉 API docs: [http://localhost:8000/docs](http://localhost:8000/docs)  
👉 ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

```bash
# Production
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🧾 Configuration

Create a `.env` file (see `.env.example`). Example:

```env
# Database
POSTGRES_SERVER=localhost
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=llm_db
DATABASE_URL=postgresql://user:password@localhost:5432/llm_db

# App
API_V1_STR=/api/v1
PROJECT_NAME=PaperClue.AI
SECRET_KEY=your_secret_key
ALLOWED_HOSTS=["http://localhost:3000","https://www.paperclue.ai","https://paperclue.ai"]

# LLM
MISTRAL_API_KEY=your_mistral_api_key
MISTRAL_MODEL=mistral-tiny

# Stripe (subscriptions, webhooks)
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...

# Brevo (email)
BREVO_API_KEY=...
```

---

## 🖼 Screenshots

N/A for backend; see frontend README for UI screenshots.

---

## 📜 API Documentation

When the server is running:

- **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **OpenAPI JSON:** `{API_V1_STR}/openapi.json`

Main route groups:

| Prefix | Description |
|--------|-------------|
| `/api/v1/auth/*` | Authentication (register, login, tokens). |
| `/api/v1/papers/*` | Paper CRUD, upload, metadata. |
| `/api/v1/search/*` | Semantic and full-text search. |
| `/api/v1/analysis/*` | AI analysis, insights, proofreading. |
| Subscription / webhook routes | Stripe subscriptions and events. |

---

## 📬 Contact

- **Author:** PJS  
- **Email:** ruka59171@gmail.com  
- **GitHub:** @Polymath1108  
- **Website/Portfolio:**  

---

## 🌟 Acknowledgements

- **FastAPI** – API framework and docs.
- **Mistral AI / OpenAI** – LLM and analysis.
- **Stripe** – Subscriptions and payments.
- **PostgreSQL & SQLAlchemy** – Database.
- **Paperclue frontend** – Primary consumer of this API.
