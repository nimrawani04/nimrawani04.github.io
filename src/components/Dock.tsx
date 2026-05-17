import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface DockItemData {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

interface DockProps {
  items: DockItemData[];
  className?: string;
  distance?: number;
  magnification?: number;
  baseItemSize?: number;
}

const DockItem = ({
  item,
  mouseX,
  distance = 200,
  magnification = 70,
  baseItemSize = 50,
}: {
  item: DockItemData;
  mouseX: any;
  distance?: number;
  magnification?: number;
  baseItemSize?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distanceCalc, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const handleClick = () => {
    if (item.href) {
      const element = document.querySelector(item.href);
      element?.scrollIntoView({ behavior: "smooth" });
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square items-center justify-center rounded-full bg-card backdrop-blur-md border border-border/50 cursor-pointer hover:bg-card/80 transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center text-primary">
        {item.icon}
      </div>
    </motion.div>
  );
};

export const Dock = ({ 
  items, 
  className = "",
  distance = 200,
  magnification = 70,
  baseItemSize = 50,
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className={cn("fixed bottom-8 left-1/2 -translate-x-1/2 z-50", className)}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-4 rounded-2xl bg-card/30 backdrop-blur-xl px-4 py-3 border border-border/50"
      >
        {items.map((item, i) => (
          <DockItem 
            key={i} 
            item={item} 
            mouseX={mouseX}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </motion.div>
    </div>
  );
};
