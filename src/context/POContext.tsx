/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode, type FC } from 'react';
import type { PurchaseOrder, Requisition, BlockchainRecord, POStatus } from '../types';

interface POContextType {
  purchaseOrders: PurchaseOrder[];
  generatePO: (requisition: Requisition) => PurchaseOrder;
  dispatchPO: (poId: string) => void;
  acknowledgePO: (poId: string) => void;
  updatePOStatus: (poId: string, status: POStatus) => void;
  uploadDocument: (poId: string, doc: { name: string; url: string; addedAt: string }) => void;
  submitInvoice: (poId: string) => void;
  approveInvoice: (poId: string) => void;
  executePayment: (poId: string) => void;
  closePO: (poId: string) => void;
}

const POContext = createContext<POContextType | undefined>(undefined);

// --- Utility: Simulate blockchain hash generation ---
const generateTxHash = (): string => {
  const chars = '0123456789abcdef';
  return '0x' + Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * 16)]).join('');
};

const generateContractAddress = (): string => {
  const chars = '0123456789abcdef';
  return '0x' + Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * 16)]).join('');
};

const STANDARD_TERMS = `1. Payment terms: Net-30 from invoice date.
2. Delivery must be completed within the agreed timeframe specified in the PO.
3. All goods are subject to quality inspection upon receipt.
4. Any discrepancies must be reported within 48 hours of delivery.
5. This PO is governed by the laws of the jurisdiction of the Buyer.
6. The Supplier shall maintain adequate insurance coverage.`;

export const POProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);

  const generateBlockchainRecord = (): BlockchainRecord => ({
    txHash: generateTxHash(),
    blockNumber: Math.floor(18_000_000 + Math.random() * 999_999),
    network: 'Nexura Chain (Testnet)',
    timestamp: new Date().toISOString(),
    contractAddress: generateContractAddress(),
  });

  const generatePO = (requisition: Requisition): PurchaseOrder => {
    const blockchain = generateBlockchainRecord();
    const vendor = requisition.items[0]?.supplier ?? 'Unknown Vendor';

    const newPO: PurchaseOrder = {
      id: `PO-${Math.floor(10000 + Math.random() * 90000)}`,
      requisitionId: requisition.id,
      vendor,
      items: requisition.items,
      totalAmount: requisition.totalAmount,
      termsAndConditions: STANDARD_TERMS,
      status: 'Blockchain_Recorded',
      createdAt: new Date().toISOString(),
      blockchain,
    };

    // Auto-dispatch after simulated blockchain confirmation (1.5s delay)
    setTimeout(() => {
      setPurchaseOrders(prev =>
        prev.map(po =>
          po.id === newPO.id
            ? { ...po, status: 'Dispatched' as POStatus, dispatchedAt: new Date().toISOString() }
            : po
        )
      );
    }, 2500);

    setPurchaseOrders(prev => [newPO, ...prev]);
    return newPO;
  };

  const dispatchPO = (poId: string) => {
    setPurchaseOrders(prev =>
      prev.map(po =>
        po.id === poId
          ? { ...po, status: 'Dispatched', dispatchedAt: new Date().toISOString() }
          : po
      )
    );
  };

  const acknowledgePO = (poId: string) => {
    setPurchaseOrders(prev =>
      prev.map(po =>
        po.id === poId
          ? { ...po, status: 'Acknowledged', acknowledgedAt: new Date().toISOString() }
          : po
      )
    );
  };

  const updatePOStatus = (poId: string, status: POStatus) => {
    setPurchaseOrders(prev =>
      prev.map(po => {
        if (po.id !== poId) return po;
        const blockchain = {
          ...po.blockchain,
          blockNumber: po.blockchain.blockNumber + 1,
          timestamp: new Date().toISOString()
        };
        return { ...po, status, blockchain };
      })
    );
  };

  const uploadDocument = (poId: string, doc: { name: string; url: string; addedAt: string }) => {
    setPurchaseOrders(prev =>
      prev.map(po => {
        if (po.id !== poId) return po;
        const docs = po.documents ? [...po.documents, doc] : [doc];
        const blockchain = {
          ...po.blockchain,
          blockNumber: po.blockchain.blockNumber + 1,
          timestamp: new Date().toISOString()
        };
        return { ...po, documents: docs, blockchain };
      })
    );
  };

  const submitInvoice = (poId: string) => {
    setPurchaseOrders(prev =>
      prev.map(po => {
        if (po.id !== poId) return po;

        // Simulate OCR & 2-Way Match
        const discrepancies: string[] = [];
        // Randomly simulate a discrepancy for demo purposes (1 in 5 chance)
        if (Math.random() < 0.2) {
          discrepancies.push('Price Mismatch: Unit price for item 1 differs from PO');
        }

        const invoice = {
          id: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
          poId: po.id,
          items: po.items,
          totalAmount: po.totalAmount,
          submittedAt: new Date().toISOString(),
          status: discrepancies.length > 0 ? 'Flagged' : 'Pending',
          discrepancies: discrepancies.length > 0 ? discrepancies : undefined,
          ocrProcessed: true,
        };

        const blockchain = {
          ...po.blockchain,
          blockNumber: po.blockchain.blockNumber + 1,
          timestamp: new Date().toISOString()
        };

        return { 
          ...po, 
          status: invoice.status === 'Flagged' ? 'Under_Review' : 'Invoiced', 
          invoice: invoice as any, 
          blockchain 
        };
      })
    );
  };

  const approveInvoice = (poId: string) => {
    setPurchaseOrders(prev =>
      prev.map(po => {
        if (po.id !== poId || !po.invoice) return po;
        const blockchain = {
          ...po.blockchain,
          blockNumber: po.blockchain.blockNumber + 1,
          timestamp: new Date().toISOString()
        };
        return { 
          ...po, 
          status: 'Payment_Pending', 
          invoice: { ...po.invoice, status: 'Approved' }, 
          blockchain 
        };
      })
    );
  };

  const executePayment = (poId: string) => {
    setPurchaseOrders(prev =>
      prev.map(po => {
        if (po.id !== poId || !po.invoice) return po;
        const blockchain = {
          ...po.blockchain,
          blockNumber: po.blockchain.blockNumber + 1,
          timestamp: new Date().toISOString()
        };
        return { 
          ...po, 
          status: 'Paid', 
          paidAt: new Date().toISOString(),
          invoice: { ...po.invoice, status: 'Paid' }, 
          blockchain 
        };
      })
    );
  };

  const closePO = (poId: string) => {
    setPurchaseOrders(prev =>
      prev.map(po => {
        if (po.id !== poId) return po;
        const blockchain = {
          ...po.blockchain,
          blockNumber: po.blockchain.blockNumber + 1,
          timestamp: new Date().toISOString()
        };
        return { ...po, status: 'Closed', closedAt: new Date().toISOString(), blockchain };
      })
    );
  };

  return (
    <POContext.Provider value={{ 
      purchaseOrders, generatePO, dispatchPO, acknowledgePO, 
      updatePOStatus, uploadDocument, submitInvoice, 
      approveInvoice, executePayment, closePO 
    }}>
      {children}
    </POContext.Provider>
  );
};

export const usePO = () => {
  const context = useContext(POContext);
  if (context === undefined) {
    throw new Error('usePO must be used within a POProvider');
  }
  return context;
};
