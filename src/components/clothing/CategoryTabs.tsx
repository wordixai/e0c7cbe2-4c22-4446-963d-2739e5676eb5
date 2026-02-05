import { motion } from 'framer-motion';
import { useTryOnStore } from '@/stores/tryOnStore';
import { categories } from '@/data/clothingData';
import { cn } from '@/lib/utils';

export function CategoryTabs() {
  const { selectedCategory, setCategory } = useTryOnStore();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const isSelected = selectedCategory === category.id;

        return (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCategory(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all",
              isSelected
                ? "bg-gradient-primary text-primary-foreground shadow-colorful"
                : "bg-card border border-border text-foreground hover:border-primary/30 hover:bg-muted"
            )}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
