# Alpha Asset Managers

A premium, high-fidelity front-end web application representing **Alpha Asset Managers**, built with React, TypeScript, Vite, and Tailwind CSS. The application is designed to be mobile-first, highly accessible, and aligned with modern visual web standards.

---

## 🚀 Technology Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📦 Directory Structure

```text
src/
├── assets/             # Brand logos and high-quality images
├── components/
│   ├── Navigation/     # Global Navigation elements (Navbar, Footer)
│   └── UI/             # Reusable UI Components (Accordion, ServiceCard, FeatureCard, Buttons)
├── pages/              # Application Views / Pages
│   ├── Home.tsx        # Homepage with Hero, Philosophy, and FAQs
│   ├── About.tsx       # Detail on Philosophy, Team, Governance, and Insights
│   ├── Invest.tsx      # Overview of available investment portfolios
│   ├── InvestDetail.tsx# Specialized detail view for each investment mandate
│   ├── News.tsx        # Market research, finance knowledge, and news
│   └── Contact.tsx     # Advisory booking and onboarding form
├── App.tsx             # Main routing and global layout
├── main.tsx            # React application entrypoint
└── index.css           # Global stylesheet and CSS variable tokens
```

---

## 🎨 Design System

We use CSS variables for primary and brand colors, which are mapped through `tailwind.config.js`:

| CSS Variable | Tailwind Class | Description |
| :--- | :--- | :--- |
| `--color-brand-dark` (`#002e2e`) | `bg-brand-dark` | Deep dark teal used for dark sections and footer backgrounds |
| `--color-brand-primary` (`#005b5c`) | `text-brand-primary` | Main logo teal color used for headings and secondary accents |
| `--color-brand-green` (`#b0de96`) | `bg-brand-green` | Vibrant light green used for Call-to-Action (CTA) highlights |
| `--color-brand-gray` (`#818286`) | `text-brand-gray` | Muted logo gray for secondary body elements |
| `--color-brand-card-bg` (`#e1efef`) | `bg-brand-cardBg` | Soft mint background used for service cards |
| `--color-brand-faq-bg` (`#e8f4e8`) | `bg-brand-faqBg` | Soft sage background for the accordion sections |

---

## ⚙️ Getting Started

### 📋 Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 🔧 Installation

Install the project dependencies:

```bash
npm install
```

### ⚡ Development Server

Run the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

### 🏗️ Production Build

To compile the application bundle for production:

```bash
npm run build
```

This compiles TypeScript definitions (`tsc -b`) and bundles the static assets with Vite. The output will be located in the `dist/` directory.

### 🔍 Linting

To inspect codebase for styling and quality concerns:

```bash
npm run lint
```

---

## ⚖️ Regulatory Notice

Alpha Asset Managers is regulated by the **Capital Markets Authority (CMA)** of Uganda.
