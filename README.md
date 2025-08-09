# FundHive – Crowdfunding Web App (React + Firebase)

A modern crowdfunding dashboard where **Companies** can create and manage fund-raising campaigns and **Investors** can browse and fund them via Stripe. Built with React (Vite), Tailwind + shadcn/ui, Firebase Auth + Firestore, and Cloudinary for image uploads.

> This README is tailored from the repository contents you shared and is ready to paste into GitHub.

---

## ✨ Features

- **Auth & Roles**: Email/password auth with roles (**Company**, **Investor**). Companies can create, edit, and manage campaigns; investors can fund them. 【turn1file3†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L75-L83】【turn1file1†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L100-L114】
- **Realtime Campaigns & Transactions**: Subscriptions to Firestore for live updates of `campaigns` and `transactions`. 【turn1file1†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L54-L75】【turn1file5†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L24-L37】
- **Payments**: Stripe Checkout flow on campaign details to fund a campaign. 【turn1file12†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L9-L23】
- **Media Uploads**: Cloudinary image upload while creating campaigns. 【turn1file12†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L79-L85】【turn1file12†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L104-L112】
- **UI/UX**: Tailwind, shadcn/ui components, lucide icons, route protection, responsive layout. 【turn1file10†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L52-L61】【turn1file8†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L58-L66】

---

## 🏗 Tech Stack

- **Frontend**: React 18, Vite, React Router, Tailwind CSS, shadcn/ui, lucide-react
- **State/Auth**: Firebase Auth, custom `AuthContext` provider
- **Database**: Firestore (campaigns, transactions, users)
- **Payments**: Stripe Checkout
- **Uploads**: Cloudinary
- **Forms/Validation**: react-hook-form + zod
- **Date/UX**: dayjs, react-hot-toast

See `package.json` for scripts & dependencies. 【turn1file4†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L65-L77】【turn1file4†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L78-L99】

---

## 📁 Project Structure (key paths)

```
src/
  api/              # Firestore CRUD & transactional helpers
  app/
    Layout/         # Layout with Sidebar
    dashboard/      # Dashboard + AllCampaigns
    pages/          # Login/Register/Forgot, Create/Edit/List/Details/Transactions
  components/       # common + shadcn/ui components
  context/          # AuthContext (Auth + Firestore subscriptions)
  firebase/         # firebase.js (app, auth, db)
  lib/              # utils (progress calc, daysLeft, etc.)
```

Routing map (see `src/App.jsx`): 【turn1file8†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L58-L75】

- `/login`, `/register`, `/forgot-password`
- Protected routes wrapped by `RequireAdmin` + `MainLayout`:
  - `/` (Dashboard)
  - `/all-campaigns`, `/my-campaigns`
  - `/create-campaign`, `/edit-campaign/:id`
  - `/campaign-details/:id`
  - `/transactions`

---

## 🚀 Quick Start

### 1) Prerequisites
- Node.js 18+ and npm
- Firebase project with **Authentication** and **Firestore**
- A **Stripe** account + publishable key
- A **Cloudinary** account (unsigned upload preset)

### 2) Clone & Install
```bash
npm install
```

### 3) Configure Environment

> The repo currently inlines config in code. For production, move these into env vars (recommended).

**Firebase** — replace the placeholder config in `src/firebase/firebase.js` with your own Firebase project config: 【turn1file2†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L4-L12】

```js
// src/firebase/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
```

**Stripe (Publishable key)** — in `src/app/pages/CampaignDetails.jsx` set your `publishableKey`. Do **not** expose Stripe secret keys in the frontend. 【turn1file12†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L9-L23】

**Cloudinary** — in `CreateCampaign.jsx`, set your `cloud_name` and `upload_preset` used for unsigned uploads. 【turn1file12†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L79-L85】

> 🔒 **Security tip**: Replace inline keys with `import.meta.env.VITE_*` variables and load from a `.env` file. Example:
>
> ```bash
> VITE_FIREBASE_API_KEY=...
> VITE_STRIPE_PUBLISHABLE_KEY=...
> VITE_CLOUDINARY_CLOUD_NAME=...
> VITE_CLOUDINARY_UPLOAD_PRESET=...
> ```

### 4) Firestore Collections

Create these collections (documents are created by the app):
- `users` — created at registration via `createUserInDb()` 【turn1file3†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L101-L113】
- `campaigns` — created when a company creates a campaign
- `transactions` — appended on successful funding 【turn1file6†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L6-L18】

The app subscribes to `campaigns` and `transactions` for live UI. 【turn1file1†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L54-L75】【turn1file5†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L24-L37】

### 5) Run Dev Server
```bash
npm run dev
```
Vite dev server starts (default port is 5173). 【turn1file13†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L58-L65】【turn1file4†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L72-L77】

### 6) Build & Preview
```bash
npm run build
npm run preview
```

---

## 🧩 Key Flows

### Authentication
- Using Firebase Auth (email/password). `AuthContext` manages session, error handling, redirects, and role-based access. 【turn1file3†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L56-L75】【turn1file1†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L20-L36】

### Create Campaign
- `CreateCampaign.jsx` uses **react-hook-form** + **zod** validation.
- Images upload to Cloudinary, then a Firestore document is created under `campaigns`. 【turn1file12†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L85-L103】

### Fund Campaign
- `CampaignDetails.jsx` renders Stripe Checkout; success writes a transaction, increments campaign totals atomically, and app navigates back. 【turn1file12†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L9-L23】【turn1file6†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L6-L18】

---

## 🔐 Security & Compliance

- **Never store secrets** (Stripe secret key, Cloudinary API secret) in the frontend.
- Configure **Firestore Security Rules** to restrict writes/reads by role (Company vs Investor) and by owner where required.
- Enable **Email Verification** if needed and handle it in UI (currently `emailVerified` is available in context). 【turn1file1†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L26-L33】

---

## 🧭 Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview built app
- `npm run lint` – run ESLint

From `package.json`. 【turn1file4†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L72-L77】

---

## 📦 Notable Dependencies

`firebase`, `react-router-dom`, `react-hook-form`, `zod`, `dayjs`, `axios`, `react-hot-toast`, `@tanstack/react-table`, `@radix-ui/*`, `lucide-react`, `tailwindcss-animate`. 【turn1file4†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L78-L99】

---

## 🗺 Roadmap Ideas

- Move configs to `.env` with `VITE_*` variables
- Add Firestore rules & server-side checks
- Add pagination/filters for campaigns and transactions
- Add unit tests and E2E
- Add CI for lint/build/preview

---

## 📜 License

No license file detected. Consider adding `LICENSE` (e.g., MIT).

---

## 🙌 Credits

Built with Vite + React, Tailwind + shadcn/ui. Project wiring and routes visible in `src/App.jsx`. 【turn1file8†repomix-output-saicheboina-BlockChain_Fund_Raise.md†L58-L75】
