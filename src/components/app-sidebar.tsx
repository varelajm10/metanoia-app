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
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import { Logo } from './logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const menuItems = [
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
    <div className="hidden lg:flex flex-col w-64 border-r border-white/10 p-4 space-y-8 bg-background sticky top-0 h-screen">
      <div className="px-2">
        <Logo />
      </div>
      <nav className="flex-1">
        <Accordion type="multiple" defaultValue={['Customer Intelligence', 'AI & Analytics', 'Company']} className="w-full">
          <ul className="space-y-2">
            {menuItems.map((item) =>
              item.subItems ? (
                <li key={item.title}>
                  <AccordionItem value={item.title} className="border-b-0">
                    <AccordionTrigger className="text-muted-foreground hover:text-foreground hover:no-underline rounded-md px-3 py-2 w-full text-base font-medium">
                       <span className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.title}
                       </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 pt-2 pb-0">
                      <ul className="space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                'flex items-center rounded-md px-3 py-2 text-sm font-medium',
                                pathname.endsWith(subItem.href)
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                              )}
                            >
                              <subItem.icon className="mr-3 h-4 w-4" />
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </li>
              ) : (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center rounded-md px-3 py-2 text-base font-medium',
                      pathname.endsWith(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </Accordion>
      </nav>
    </div>
  );
}
