
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BrainCircuit,
  Settings,
  FileText,
  Building,
  CreditCard,
  Headset,
  Workflow,
  HeartHandshake,
  DollarSign,
  BarChart2,
  SlidersHorizontal,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Logo } from './logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const menuItems = [
  {
    title: 'Command Center',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Customer Intelligence',
    icon: HeartHandshake,
    subItems: [
      { title: 'CRM', href: '/customer-management', icon: Users },
      { title: 'Créditos', href: '/credit-management', icon: CreditCard },
      { title: 'Atención al Cliente', href: '/customer-service', icon: Headset },
    ],
  },
  {
    title: 'AI & Analytics',
    icon: BrainCircuit,
    subItems: [
      { title: 'Business Intelligence', href: '/business-intelligence', icon: BarChart2 },
      { title: 'Análisis Financiero', href: '/financial-analysis', icon: DollarSign },
      { title: 'Process Automation', href: '/process-automation', icon: Workflow },
    ],
  },
  {
    title: 'Company',
    icon: Building,
    subItems: [
        { title: 'Human Resources', href: '/hr', icon: Users },
    ]
  },
  {
    title: 'Reporting',
    href: '/reports',
    icon: FileText,
  },
  {
    title: 'Mission Control',
    href: '/settings',
    icon: SlidersHorizontal,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

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
                    <AccordionTrigger className="text-muted-foreground hover:text-foreground hover:no-underline rounded-md px-3 py-2 w-full justify-start text-base font-medium">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 pt-2 pb-0">
                      <ul className="space-y-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.title}>
                            <Link
                              href={subItem.href}
                              className={cn(
                                'flex items-center rounded-md px-3 py-2 text-sm font-medium',
                                pathname === subItem.href
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
                      pathname === item.href
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
