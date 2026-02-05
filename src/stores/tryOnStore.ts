import { create } from 'zustand';
import { ClothingItem, ClothingCategory, ClothingStyle, ProcessingState } from '@/types';

interface FilterState {
  styles: ClothingStyle[];
  colors: string[];
}

interface TryOnStore {
  // Upload state
  uploadedImage: File | null;
  uploadedImageUrl: string | null;

  // Clothing selection state
  selectedCategory: ClothingCategory;
  filters: FilterState;
  selectedClothing: ClothingItem | null;

  // Processing state
  processing: ProcessingState;

  // Result state
  resultImageUrl: string | null;

  // Actions
  setUploadedImage: (file: File) => void;
  clearUploadedImage: () => void;
  setCategory: (category: ClothingCategory) => void;
  toggleStyleFilter: (style: ClothingStyle) => void;
  toggleColorFilter: (color: string) => void;
  clearFilters: () => void;
  selectClothing: (clothing: ClothingItem | null) => void;
  setProcessingState: (state: Partial<ProcessingState>) => void;
  setResultImage: (url: string | null) => void;
  startTryOn: () => void;
  reset: () => void;
}

const initialProcessingState: ProcessingState = {
  status: 'idle',
  progress: 0,
  message: '',
};

export const useTryOnStore = create<TryOnStore>((set, get) => ({
  // Initial state
  uploadedImage: null,
  uploadedImageUrl: null,
  selectedCategory: 'tops',
  filters: {
    styles: [],
    colors: [],
  },
  selectedClothing: null,
  processing: initialProcessingState,
  resultImageUrl: null,

  // Actions
  setUploadedImage: (file: File) => {
    const url = URL.createObjectURL(file);
    // Revoke previous URL to prevent memory leaks
    const prevUrl = get().uploadedImageUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set({ uploadedImage: file, uploadedImageUrl: url });
  },

  clearUploadedImage: () => {
    const prevUrl = get().uploadedImageUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set({ uploadedImage: null, uploadedImageUrl: null });
  },

  setCategory: (category: ClothingCategory) => {
    set({ selectedCategory: category, selectedClothing: null });
  },

  toggleStyleFilter: (style: ClothingStyle) => {
    const currentStyles = get().filters.styles;
    const newStyles = currentStyles.includes(style)
      ? currentStyles.filter(s => s !== style)
      : [...currentStyles, style];
    set({ filters: { ...get().filters, styles: newStyles } });
  },

  toggleColorFilter: (color: string) => {
    const currentColors = get().filters.colors;
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    set({ filters: { ...get().filters, colors: newColors } });
  },

  clearFilters: () => {
    set({ filters: { styles: [], colors: [] } });
  },

  selectClothing: (clothing: ClothingItem | null) => {
    set({ selectedClothing: clothing });
  },

  setProcessingState: (state: Partial<ProcessingState>) => {
    set({ processing: { ...get().processing, ...state } });
  },

  setResultImage: (url: string | null) => {
    set({ resultImageUrl: url });
  },

  startTryOn: () => {
    set({
      processing: { status: 'uploading', progress: 0, message: '正在上传图片...' },
      resultImageUrl: null,
    });
  },

  reset: () => {
    const prevUrl = get().uploadedImageUrl;
    if (prevUrl) {
      URL.revokeObjectURL(prevUrl);
    }
    set({
      uploadedImage: null,
      uploadedImageUrl: null,
      selectedCategory: 'tops',
      filters: { styles: [], colors: [] },
      selectedClothing: null,
      processing: initialProcessingState,
      resultImageUrl: null,
    });
  },
}));
