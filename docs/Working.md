# Nexura — How It Works

A technical walkthrough of each phase of the Nexura B2B Procurement Hub.

---

## 🏛 Architecture Overview

Nexura uses a **Context-first, provider-layered** React architecture. There are no external state libraries — each business domain owns its state via a dedicated Context Provider, which are nested in `main.tsx`.

```
AuthProvider
  └── RequisitionProvider
        └── POProvider
              └── CartProvider
                    └── App
```

---

## Phase 1: Discovery & Requisition

### How it flows:
1. **Login** (`LoginPage.tsx`) — User enters their email. The role is automatically assigned based on the email prefix (e.g., `manager@...` → `Manager` role).
2. **Catalog** (`CatalogPage.tsx`) — Employee browses products with real-time search and category filtering. Products are added to the Cart via `CartContext`.
3. **Requisition** (`RequisitionPage.tsx`) — Employee reviews cart, adds business justification and priority level, then submits. Submission calls `submitRequisition()` in `RequisitionContext`, which runs the **Rules Engine**.

### Rules Engine (`RequisitionContext.tsx`):
Automatically generates an `approvalChain` array based on the total order value:
- **Any amount** → Adds Manager step.
- **> ₹50,000** → Adds Finance step.
- **> ₹2,00,000** → Adds Admin step.

---

## Phase 2: Approval Workflow

### How it flows:
1. The submitted requisition appears in the **Approvals** tab for the user whose role matches `approvalChain[currentStepIndex].approverRole`.
2. The Approver reviews items, justification, and the visual approval timeline.
3. **Approve** → Advances `currentStepIndex`. If it was the final step, status becomes `Approved` and a final-approval event fires.
4. **Reject** (requires a comment) → Status immediately becomes `Rejected`. Chain is terminated.

### Key Design: Final Approval Event
`RequisitionContext` exposes `onFinalApproval(callback)`. `POContext` registers a listener on mount:
```ts
onFinalApproval((approvedReq) => generatePO(approvedReq));
```
This decouples the approval and purchasing systems cleanly.

---

## Phase 3: Purchase Order Generation

### How it flows:
1. **PO Creation** — `generatePO()` in `POContext` receives the approved requisition. It assigns a unique `PO-XXXXX` number and applies standard Terms & Conditions.
2. **Blockchain Recording** — A simulated `BlockchainRecord` is generated containing:
   - `txHash`: 64-character hex transaction hash (`0x...`)
   - `blockNumber`: A realistic simulated block number (~18,000,000+)
   - `contractAddress`: 40-character hex smart contract address
   - `network`: `Nexura Chain (Testnet)`
3. **Auto-Dispatch** — 2.5 seconds after PO creation, status updates to `Dispatched` to simulate blockchain confirmation time and email dispatch to vendor.
4. **Acknowledgement** — Admin or Manager can mark the PO as `Acknowledged` from the **My Orders** tab.

### PO Status Lifecycle:
```
Generated → Blockchain_Recorded → Dispatched → Acknowledged
```

---

## 📂 File Map

| File | Responsibility |
| :--- | :--- |
| `src/context/AuthContext.tsx` | Identity, role assignment, login/logout |
| `src/context/CartContext.tsx` | Shopping cart state |
| `src/context/RequisitionContext.tsx` | PR lifecycle, Rules Engine, approval chain |
| `src/context/POContext.tsx` | PO generation, blockchain simulation, dispatch |
| `src/pages/CatalogPage.tsx` | Product discovery UI |
| `src/pages/RequisitionPage.tsx` | PR form and submission |
| `src/pages/ApprovalsPage.tsx` | Approve/Reject workflow UI |
| `src/pages/OrdersPage.tsx` | PO management, blockchain details, dispatch |
| `src/types/index.ts` | All shared TypeScript interfaces |
| `src/styles/index.css` | Design tokens, glassmorphic system |

---
*This file is local-only and excluded from the public repository via `.gitignore`.*
