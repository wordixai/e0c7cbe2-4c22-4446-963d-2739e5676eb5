import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ImagePlus, X, Camera } from 'lucide-react';
import { useTryOnStore } from '@/stores/tryOnStore';
import { Button } from '@/components/ui/button';

export function UploadZone() {
  const { uploadedImageUrl, setUploadedImage, clearUploadedImage } = useTryOnStore();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        setUploadedImage(file);
      }
    },
    [setUploadedImage]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  return (
    <div className="w-full h-full">
      <AnimatePresence mode="wait">
        {uploadedImageUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-card border border-border shadow-card"
          >
            <img
              src={uploadedImageUrl}
              alt="上传的照片"
              className="w-full h-full object-cover"
            />

            {/* Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    variant="secondary"
                    className="w-full cursor-pointer"
                    asChild
                  >
                    <span>
                      <Camera className="w-4 h-4 mr-2" />
                      更换照片
                    </span>
                  </Button>
                </label>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={clearUploadedImage}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="relative w-full h-full min-h-[400px] rounded-2xl border-2 border-dashed border-border bg-card/50 hover:border-primary/50 hover:bg-card transition-all cursor-pointer group"
          >
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-colorful mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-primary-foreground" />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  上传你的照片
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-xs">
                  拖拽图片到这里，或点击选择文件
                </p>

                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ImagePlus className="w-4 h-4" />
                    <span>支持 JPG, PNG</span>
                  </div>
                </div>

                <div className="mt-6 px-4 py-2 rounded-lg bg-muted/50 text-xs text-muted-foreground">
                  建议：全身照 / 光线充足 / 背景简洁
                </div>
              </motion.div>
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
