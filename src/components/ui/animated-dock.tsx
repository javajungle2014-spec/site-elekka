"use client";

import * as React from "react";
import { useRef } from "react";
import { MotionValue, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...args: unknown[]) => twMerge(clsx(args));

export interface DockItemData {
  Icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export interface AnimatedDockProps {
  items: DockItemData[];
  className?: string;
}

export function AnimatedDock({ items, className }: AnimatedDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "flex h-12 items-end gap-3 rounded-2xl bg-paper-2/80 border border-line shadow-sm backdrop-blur-sm px-3 pb-2",
        className,
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX} label={item.label} onClick={item.onClick}>
          {item.Icon}
        </DockItem>
      ))}
    </motion.div>
  );
}

interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function DockItem({ mouseX, children, label, onClick }: DockItemProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-120, 0, 120], [32, 54, 32]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const iconScale = useTransform(size, [32, 54], [1, 1.4]);
  const iconSpring = useSpring(iconScale, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{ width: size, height: size }}
      className="aspect-square rounded-full bg-ink text-on-ink flex items-center justify-center cursor-pointer"
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.button>
  );
}
