# Nexura | B2B Procurement Hub

![Nexura Banner](src/assets/hero.png)

Nexura is an enterprise-grade B2B procurement platform designed to streamline the lifecycle of corporate purchasing. Built with a focus on high-performance aesthetics and developer-first architecture, Nexura provides a seamless interface for discovery, requisition, and vendor management.

## 🚀 Phase 1: Discovery & Requisition

This repository represents the initial implementation (Phase 1) focused on the core procurement workflow for employees and account executives.

### Key Features
- **Product Discovery**: High-performance catalogue with sub-second searching and category filtering.
- **Enterprise Requisition**: Multi-item shopping cart system with localized pricing (INR ₹).
- **Formal Submission**: Detailed requisition process capturing business justification, priority levels, and document attachments.
- **Premium UI/UX**:
  - Glassmorphic design system with real-time blur.
  - Custom industrial-grade product imagery.
  - Fluid micro-animations powered by Framer Motion.
  - Fully responsive, mobile-first layouts.

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
- [ ] Phase 2: RFQ (Request for Quotation) Module
- [ ] Phase 3: Vendor Portal & Supplier Management
- [ ] Phase 4: Financial Approval Workflows & ERP Integration

---

Built with precision by **Antigravity** for **Sanskriti Labs**.
