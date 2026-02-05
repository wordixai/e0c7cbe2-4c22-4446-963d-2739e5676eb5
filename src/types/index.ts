export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  style: ClothingStyle[];
  color: string[];
  imageUrl: string;
  thumbnailUrl: string;
}

export type ClothingCategory = 'tops' | 'dresses' | 'pants' | 'skirts' | 'outerwear';
export type ClothingStyle = 'casual' | 'formal' | 'sporty' | 'trendy' | 'classic';

export interface CategoryInfo {
  id: ClothingCategory;
  name: string;
  nameEn: string;
  icon: string;
}

export interface TryOnRequest {
  userImage: File;
  clothingId: string;
}

export interface TryOnResponse {
  resultImageUrl: string;
  processingTime: number;
}

export interface ProcessingState {
  status: 'idle' | 'uploading' | 'analyzing' | 'generating' | 'complete' | 'error';
  progress: number;
  message: string;
}
