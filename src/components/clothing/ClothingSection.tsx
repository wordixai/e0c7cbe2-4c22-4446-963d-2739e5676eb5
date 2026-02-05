import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shirt } from 'lucide-react';
import { useTryOnStore } from '@/stores/tryOnStore';
import { clothingLibrary } from '@/data/clothingData';
import { CategoryTabs } from './CategoryTabs';
import { FilterBar } from './FilterBar';
import { ClothingCard } from './ClothingCard';

export function ClothingSection() {
  const { selectedCategory, filters } = useTryOnStore();

  const filteredClothing = useMemo(() => {
    return clothingLibrary.filter((item) => {
      // Category filter
      if (item.category !== selectedCategory) return false;

      // Style filter
      if (filters.styles.length > 0) {
        const hasMatchingStyle = item.style.some((s) => filters.styles.includes(s));
        if (!hasMatchingStyle) return false;
      }

      // Color filter
      if (filters.colors.length > 0) {
        const hasMatchingColor = item.color.some((c) => filters.colors.includes(c));
        if (!hasMatchingColor) return false;
      }

      return true;
    });
  }, [selectedCategory, filters]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-secondary flex items-center justify-center">
          <Shirt className="w-4 h-4 text-secondary-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">选择服装</h2>
      </div>

      {/* Category Tabs */}
      <div className="mb-4">
        <CategoryTabs />
      </div>

      {/* Filters */}
      <div className="mb-4">
        <FilterBar />
      </div>

      {/* Clothing Grid */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredClothing.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {filteredClothing.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ClothingCard item={item} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Shirt className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">没有找到符合条件的服装</p>
              <p className="text-sm text-muted-foreground/70">试试调整筛选条件</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
