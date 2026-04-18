# Nexura Test Credentials

Use these credentials to test role-based workflows across all three phases.
> Note: The password field is accepted but not validated — role is determined by email prefix.

| Role | Email | Password | Phase Access | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Employee** | `employee@nexura.com` | `password123` | Phase 1 | Browse catalog, create & submit requisitions. |
| **Manager** | `manager@nexura.com` | `password123` | Phase 1 & 2 | All employee rights + Level 1 approval authority. |
| **Finance** | `finance@nexura.com` | `password123` | Phase 2 | Level 2 approval authority (requisitions > ₹50,000). |
| **Admin** | `admin@nexura.com` | `password123` | Phase 2 & 3 | Level 3 approval + PO acknowledgement rights. |

## Approval Routing Rules (Rules Engine)

| Total Amount | Required Approval Chain |
| :--- | :--- |
| Any amount | Manager (Level 1) |
| > ₹50,000 | Manager → Finance (Level 2) |
| > ₹2,00,000 | Manager → Finance → Admin (Level 3) |

## Phase 3: PO Dispatch Flow

Once a requisition is **finally approved**, the system automatically:
1. Generates a PO with a unique `PO-XXXXX` number.
2. Records an immutable hash on the **Nexura Chain** (simulated blockchain).
3. Dispatches the PO to the vendor (~2.5 seconds after blockchain confirmation).
4. Awaits acknowledgement from Admin/Manager via the **My Orders** tab.

---
*This file is local-only and excluded from the public repository via `.gitignore`.*
