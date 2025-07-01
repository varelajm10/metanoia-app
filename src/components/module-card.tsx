"use client"
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Module {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'Disponible' | 'En Desarrollo' | 'Próximamente';
  href: string;
}

export function ModuleCard({ icon, title, description, status, href }: Module) {
  const isAvailable = status === 'Disponible';

  const cardContent = (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 group">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="text-accent">{icon}</div>
        <Badge
          className={cn({
            'bg-green-100 text-green-800 border-green-200': status === 'Disponible',
            'bg-yellow-100 text-yellow-800 border-yellow-200': status === 'En Desarrollo',
            'bg-gray-100 text-gray-800 border-gray-200': status === 'Próximamente',
          })}
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <CardTitle className="text-lg font-bold font-headline">{title}</CardTitle>
          <CardDescription className="mt-2 text-sm h-12">{description}</CardDescription>
        </div>
        <div
          className={cn(
            'text-sm font-semibold mt-4 flex items-center',
            isAvailable ? 'text-accent group-hover:text-accent/90' : 'text-muted-foreground'
          )}
        >
          {isAvailable ? 'Probar ahora' : 'Solicitar Demo'}
          <span className="transition-transform duration-300 group-hover:translate-x-1 ml-1">&rarr;</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Link href={href} className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg">
        {cardContent}
    </Link>
  );
}
