"use client";
import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 30,
  cols = 60,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const cellWidth = rect.width / cols;
      const cellHeight = rect.height / rows;
      
      const hoveredCol = Math.floor(x / cellWidth);
      const hoveredRow = Math.floor(y / cellHeight);

      // Stop tracking if the mouse is completely outside the bounds
      if (hoveredCol < 0 || hoveredCol >= cols || hoveredRow < 0 || hoveredRow >= rows) return;

      requestAnimationFrame(() => {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const distance = Math.sqrt(
              Math.pow(hoveredRow - row, 2) + Math.pow(hoveredCol - col, 2)
            );
            
            const maxDistance = 4; 
            const coreRadius = 1;   
            
            const index = row * cols + col;
            const cell = cellsRef.current[index];
            
            if (cell) {
              if (distance >= maxDistance) {
                cell.style.backgroundColor = "rgba(0, 0, 0, 1)";
              } else if (distance >= coreRadius) {
                const fade = (distance - coreRadius) / (maxDistance - coreRadius);
                cell.style.backgroundColor = `rgba(0, 0, 0, ${fade})`;
              } else {
                const glow = 1 - (distance / coreRadius);
                cell.style.backgroundColor = `rgba(0, 0, 0, ${glow * 0.15})`;
              }
            }
          }
        }
      });
    };

    const handleMouseLeave = () => {
      requestAnimationFrame(() => {
        cellsRef.current.forEach((cell) => {
          if (cell) {
            cell.style.transition = "background-color 0.5s ease";
            cell.style.backgroundColor = "rgba(0, 0, 0, 1)";
            setTimeout(() => {
              if (cell) cell.style.transition = "none";
            }, 500);
          }
        });
      });
    };

    // Attach listeners globally to the window
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handleMouseLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handleMouseLeave);
    };
  }, [rows, cols]);

  useEffect(() => {
    cellsRef.current = cellsRef.current.slice(0, rows * cols);
  }, [rows, cols]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 -z-10 w-full h-full overflow-hidden pointer-events-none", className)}
    >
      {/* RED & PINK BLEND */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-rose-600 via-red-600 to-orange-600 opacity-100" />

      <div 
        className="absolute inset-0 z-10 grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <div key={i} className="relative w-full h-full">
            <div
              ref={(el) => {
                cellsRef.current[i] = el;
              }}
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
            />
            {/* The border div that was here has been completely removed! */}
          </div>
        ))}
      </div>
    </div>
  );
};