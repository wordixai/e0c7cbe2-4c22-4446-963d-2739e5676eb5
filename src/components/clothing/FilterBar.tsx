import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { useTryOnStore } from '@/stores/tryOnStore';
import { styleFilters, colorFilters } from '@/data/clothingData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FilterBar() {
  const { filters, toggleStyleFilter, toggleColorFilter, clearFilters } = useTryOnStore();
  const hasFilters = filters.styles.length > 0 || filters.colors.length > 0;

  return (
    <div className="space-y-3">
      {/* Style Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mr-2">
          <Filter className="w-4 h-4" />
          <span>风格</span>
        </div>
        {styleFilters.map((style) => {
          const isSelected = filters.styles.includes(style.id);
          return (
            <motion.button
              key={style.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleStyleFilter(style.id)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                isSelected
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {style.name}
            </motion.button>
          );
        })}
      </div>

      {/* Color Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-muted-foreground mr-2">颜色</span>
        {colorFilters.map((color) => {
          const isSelected = filters.colors.includes(color.id);
          return (
            <motion.button
              key={color.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleColorFilter(color.id)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all",
                isSelected ? "border-primary ring-2 ring-primary/30" : "border-border"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          );
        })}
      </div>

      {/* Clear Filters */}
      {hasFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-muted-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            清除筛选
          </Button>
        </motion.div>
      )}
    </div>
  );
}
