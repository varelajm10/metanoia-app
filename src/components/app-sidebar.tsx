
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  FileText,
  Building,
  CreditCard,
  Headset,
  Workflow,
  HeartHandshake,
  DollarSign,
  BarChart2,
  SlidersHorizontal,
  Warehouse,
  FolderKanban,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Wand2,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { Logo } from './logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  useSidebar,
  sidebarMenuButtonVariants
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';


type MenuItemProps = {
  title: string;
  href?: string;
  icon: React.ElementType;
  subItems?: Omit<MenuItemProps, 'subItems'>[];
};


function MenuItem({ item }: { item: MenuItemProps }) {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();
  const isExpanded = sidebarState === 'expanded';

  if (!item.subItems || item.subItems.length === 0) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname.endsWith(item.href!)} tooltip={item.title}>
          <Link href={item.href!}>
            <item.icon />
            <span className="truncate">{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  if (!isExpanded) {
    return (
      <SidebarMenuItem>
        <SidebarMenuSub>
            <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.subItems[0].href!}>
                    <item.icon />
                    <span className="sr-only">{item.title}</span>
                </Link>
            </SidebarMenuButton>
          <SidebarMenuSubItem className="p-1">
            <div className="px-2 py-1.5 text-sm font-semibold text-foreground">
              {item.title}
            </div>
            {item.subItems.map((subItem) => (
              <SidebarMenuSubButton asChild key={subItem.href} isActive={pathname.endsWith(subItem.href!)}>
                <Link href={subItem.href!}>
                  <subItem.icon />
                  <span className="truncate">{subItem.title}</span>
                </Link>
              </SidebarMenuSubButton>
            ))}
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuItem>
    );
  }

  return (
    <Collapsible asChild defaultOpen={item.subItems.some(si => si.href && pathname.endsWith(si.href))} className="group">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
            <button className={cn(sidebarMenuButtonVariants(), 'w-full justify-between')}>
                <div className='flex items-center gap-2'>
                    <item.icon />
                    <span className="truncate">{item.title}</span>
                </div>
                <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
            </button>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <SidebarMenuSub>
            {item.subItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton asChild isActive={pathname.endsWith(subItem.href!)}>
                  <Link href={subItem.href!}>
                    <subItem.icon />
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}


export function AppSidebar() {
  const t = useTranslations('Sidebar');
  const { state: sidebarState, setOpenMobile } = useSidebar();

  const menuItems: MenuItemProps[] = [
    {
      title: t('commandCenter'),
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: t('customerIntelligence'),
      icon: HeartHandshake,
      subItems: [
        { title: t('crm'), href: '/customer-management', icon: Users },
        { title: t('credits'), href: '/credit-management', icon: CreditCard },
        { title: t('customerService'), href: '/customer-service', icon: Headset },
      ],
    },
    {
      title: t('aiAndAnalytics'),
      icon: BrainCircuit,
      subItems: [
        { title: t('businessIntelligence'), href: '/business-intelligence', icon: BarChart2 },
        { title:t('financialAnalysis'), href: '/financial-analysis', icon: DollarSign },
        { title: t('processAutomation'), href: '/process-automation', icon: Workflow },
        { title: t('intelligentInventory'), href: '/intelligent-inventory', icon: Warehouse },
        { title: t('quotationGenerator'), href: '/quotation-generator', icon: Wand2 },
      ],
    },
    {
      title: t('company'),
      icon: Building,
      subItems: [
          { title: t('humanResources'), href: '/hr', icon: Users },
          { title: t('documentManagement'), href: '/document-management', icon: FolderKanban },
      ]
    },
    {
      title: t('reporting'),
      href: '/reports',
      icon: FileText,
    },
    {
      title: t('missionControl'),
      href: '/settings',
      icon: SlidersHorizontal,
    },
  ];

  return (
    <Sidebar>
        <SidebarHeader className="h-20 flex items-center justify-center">
            <Logo />
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
            {menuItems.map((item) => (
                <MenuItem key={item.title} item={item} />
            ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="hidden md:flex justify-center p-4">
            <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                    {sidebarState === 'expanded' ? <PanelLeftClose /> : <PanelLeftOpen />}
                </Button>
            </SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  );
}
