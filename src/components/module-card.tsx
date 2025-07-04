
"use client"
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

export interface Module {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'Disponible' | 'En Desarrollo' | 'Próximamente';
  href: string;
  className?: string;
  glowColor?: string;
}

export function ModuleCard({ icon, title, description, status, href, className, glowColor }: Module) {
  const isAvailable = status === 'Disponible';

  const statusConfig = {
    'Disponible': { text: 'Disponible', color: 'bg-green-500/10 text-green-400 border-green-500/20', dot: 'bg-green-500' },
    'En Desarrollo': { text: 'En Desarrollo', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20', dot: 'bg-yellow-500' },
    'Próximamente': { text: 'Próximamente', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', dot: 'bg-blue-500' },
  };

  const currentStatus = statusConfig[status];

  return (
    <Tilt
      className="tilt-card"
      perspective={1000}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glarePosition="all"
      scale={1.02}
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      transitionSpeed={1500}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className={cn("h-full w-full", className)}
      >
        <Link href={href} className="block h-full w-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-2xl">
          <div
            className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-900/80 p-6 border border-white/10 transition-all duration-300 group hover:border-white/20"
            style={{
              '--glow-color': glowColor || 'hsl(var(--primary))',
              boxShadow: `0 0 0 1px hsl(var(--border)), 0 25px 50px -12px rgba(0,0,0,0.25)`
            } as React.CSSProperties}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at center, var(--glow-color) 0%, transparent 60%)`,
                filter: 'blur(40px)',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
              }}
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-primary">
                  {icon}
                </div>
                <div className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full border", currentStatus.color)}>
                  <span className={cn("h-2 w-2 rounded-full mr-2", currentStatus.dot)} />
                  {currentStatus.text}
                </div>
              </div>

              <div className="mt-6 flex-grow">
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{description}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <p className={cn(
                  'text-sm font-semibold flex items-center transition-colors',
                  isAvailable ? 'text-primary' : 'text-muted-foreground'
                )}>
                  {isAvailable ? 'Acceder' : 'Saber más'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 ml-1">&rarr;</span>
                </p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </Tilt>
  );
}
