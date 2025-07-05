
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
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';


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

  // --- Single Menu Item ---
  if (!item.subItems || item.subItems.length === 0) {
    return (
      <SidebarMenuItem>
        <Link href={item.href!} passHref>
          <SidebarMenuButton
            asChild
            isActive={pathname.endsWith(item.href!)}
            tooltip={item.title}
          >
            <a>
              <item.icon />
              <span className="truncate">{item.title}</span>
            </a>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  }

  // --- Collapsed Menu Group ---
  if (!isExpanded) {
    return (
      <SidebarMenuItem>
        <SidebarMenuSub>
          <SidebarMenuButton asChild tooltip={item.title}>
            <button>
              <item.icon />
              <span className="sr-only">{item.title}</span>
            </button>
          </SidebarMenuButton>
          <SidebarMenuSubItem className="p-1">
            <div className="px-2 py-1.5 text-sm font-semibold text-foreground">
              {item.title}
            </div>
            {item.subItems.map((subItem) => (
              <Link href={subItem.href!} passHref key={subItem.href}>
                <SidebarMenuSubButton
                  asChild
                  isActive={pathname.endsWith(subItem.href!)}
                >
                  <a>
                    <subItem.icon />
                    <span className="truncate">{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </Link>
            ))}
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </SidebarMenuItem>
    );
  }

  // --- Expanded Menu Group ---
  return (
    <Collapsible asChild defaultOpen={item.subItems.some(si => si.href && pathname.endsWith(si.href))} className="group">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="w-full justify-between">
            <div className="flex w-full items-center justify-between">
              <span className="flex items-center gap-2">
                  <item.icon />
                  <span className="truncate">{item.title}</span>
              </span>
              <ChevronDown className="size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:-rotate-180" />
            </div>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <SidebarMenuSub>
            {item.subItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.href}>
                <Link href={subItem.href!} passHref>
                  <SidebarMenuSubButton
                    asChild
                    isActive={pathname.endsWith(subItem.href!)}
                  >
                    <a>
                      <subItem.icon />
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </Link>
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
  const { state: sidebarState } = useSidebar();

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
        { title: t('financialAnalysis'), href: '/financial-analysis', icon: DollarSign },
        { title: t('processAutomation'), href: '/process-automation', icon: Workflow },
        { title: t('intelligentInventory'), href: '/intelligent-inventory', icon: Warehouse },
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
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-20 justify-center group-data-[collapsible=icon]:justify-center">
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
            <button className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors">
                {sidebarState === 'expanded' ? <PanelLeftClose /> : <PanelLeftOpen />}
            </button>
        </SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  );
}
