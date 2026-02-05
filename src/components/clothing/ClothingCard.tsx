import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ClothingItem } from '@/types';
import { useTryOnStore } from '@/stores/tryOnStore';
import { cn } from '@/lib/utils';

interface ClothingCardProps {
  item: ClothingItem;
}

export function ClothingCard({ item }: ClothingCardProps) {
  const { selectedClothing, selectClothing } = useTryOnStore();
  const isSelected = selectedClothing?.id === item.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => selectClothing(isSelected ? null : item)}
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200",
        "bg-card border-2 shadow-card hover:shadow-elevated",
        isSelected ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/30"
      )}
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={item.thumbnailUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="font-medium text-foreground text-sm truncate">{item.name}</h4>
        <div className="flex gap-1 mt-2">
          {item.style.slice(0, 2).map((style) => (
            <span
              key={style}
              className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
            >
              {style === 'casual' && '休闲'}
              {style === 'formal' && '正式'}
              {style === 'sporty' && '运动'}
              {style === 'trendy' && '潮流'}
              {style === 'classic' && '经典'}
            </span>
          ))}
        </div>
      </div>

      {/* Selected Indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
        >
          <Check className="w-4 h-4 text-primary-foreground" />
        </motion.div>
      )}
    </motion.div>
  );
}
