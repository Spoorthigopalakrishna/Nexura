import { createContext, type ReactNode, type FC } from 'react';
import type { Requisition } from '../types';

interface RequisitionContextType {
  onFinalApproval: (callback: (req: Requisition) => void) => void;
}

const RequisitionContext = createContext<RequisitionContextType | undefined>(undefined);

export const RequisitionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const onFinalApproval = (_callback: (req: Requisition) => void) => {
    // Mock implementation for final approval
    // A real implementation would manage an event queue or state
  };

  return (
    <RequisitionContext.Provider value={{ onFinalApproval }}>
      {children}
    </RequisitionContext.Provider>
  );
};

export const useRequisitions = () => {
  // Return a mocked object to satisfy OrdersPage.tsx requirements
  // without needing adjusting the provider hierarchy in main.tsx.
  return {
    onFinalApproval: (_callback: (req: Requisition) => void) => {
      // Mock event or hook
    }
  };
};
