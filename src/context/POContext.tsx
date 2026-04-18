/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode, type FC } from 'react';
import type { PurchaseOrder, Requisition, BlockchainRecord, POStatus } from '../types';

interface POContextType {
  purchaseOrders: PurchaseOrder[];
  generatePO: (requisition: Requisition) => PurchaseOrder;
  dispatchPO: (poId: string) => void;
  acknowledgePO: (poId: string) => void;
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

  return (
    <POContext.Provider value={{ purchaseOrders, generatePO, dispatchPO, acknowledgePO }}>
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
