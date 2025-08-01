
import { createContext, useContext } from 'react';
import { SidebarProps } from '@/components/ui/sidebar';

interface InterfaceBehaviorContextType {
    sidebarVariant: SidebarProps['variant'];
    setSidebarVariant: (variant: SidebarProps['variant']) => void;
    sidebarCollapsible: SidebarProps['collapsible'];
    setSidebarCollapsible: (collapsible: SidebarProps['collapsible']) => void;
}

export const InterfaceBehaviorContext = createContext<InterfaceBehaviorContextType | undefined>(undefined);

export const useInterfaceBehavior = () => {
    const context = useContext(InterfaceBehaviorContext);
    if (!context) {
        throw new Error('useInterfaceBehavior must be used within an InterfaceBehaviorProvider');
    }
    return context;
};
