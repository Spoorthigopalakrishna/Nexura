# Nexura | B2B Procurement Hub

![Nexura Banner](src/assets/hero.png)

Nexura is an enterprise-grade B2B procurement platform designed to streamline the lifecycle of corporate purchasing. Built with a focus on high-performance aesthetics and developer-first architecture, Nexura provides a seamless interface for discovery, requisition, and vendor management.

This repository represents the full implementation (Phases 1-5) of the Nexura procurement ecosystem.

### Key Features
- **Phase 1: Discovery & Requisition**: High-performance catalogue with sub-second searching and category filtering.
- **Phase 2: Automated Approval Workflow**: Multi-stage approval routing (Manager, Finance, Admin) based on dynamic business rules.
- **Phase 3: Purchase Order & Blockchain**: Automated PO generation with immutable records written to Nexura Chain (Testnet).
- **Phase 4: Vendor Fulfillment**: Dedicated Vendor Portal for milestone tracking, order acknowledgment, and compliance document uploads.
- **Phase 5: Invoicing & Payment**: OCR-simulated 2-way matching, discrepancy flagging, and blockchain-verified payment execution.
- **Premium UI/UX**:
  - Glassmorphic design system with real-time blur.
  - Industrial-grade product imagery and enterprise typography.
  - Fluid micro-animations and responsive, mobile-first layouts.

## 🛠 Technology Stack
- **Framework**: React 19 + Vite 8
- **Language**: TypeScript (Strict Mode)
- **Styling**: Vanilla CSS (Modern CSS Variables & Custom Design Tokens)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Tooling**: ESLint 9 + TypeScript 6

## 📂 Project Structure
```text
/src
  /assets      <- Branded assets and hero images
  /components  <- Modular UI components (Sidebar, StatCard)
  /context     <- Global state management (Auth, Shopping Cart)
  /pages       <- Main application views (Dashboard, Catalog, etc.)
  /styles      <- Centralized design tokens and global styles
  /types       <- Enterprise-grade shared TypeScript definitions
```

## 🚥 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Spoorthigopalakrishna/Nexura.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛣 Roadmap
- [x] Phase 1: Discovery & Requisition Implementation
- [x] Phase 2: Automated Approval Workflows & Routing
- [x] Phase 3: Purchase Order Generation & Blockchain Immuntability
- [x] Phase 4: Vendor Fulfillment Portal & Milestone Tracking
- [x] Phase 5: Invoicing, 2-Way Matching & Payment Settlement

---

Built with precision by **Antigravity** for **Sanskriti Labs**.
