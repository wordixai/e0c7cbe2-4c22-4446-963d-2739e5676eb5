import { motion } from 'framer-motion';
import { Download, RotateCcw, Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ComparisonSlider } from './ComparisonSlider';
import { useTryOnStore } from '@/stores/tryOnStore';
import { toast } from 'sonner';

interface ResultDisplayProps {
  onClose: () => void;
}

export function ResultDisplay({ onClose }: ResultDisplayProps) {
  const { uploadedImageUrl, resultImageUrl, selectedClothing, reset } = useTryOnStore();

  const handleDownload = async () => {
    if (!resultImageUrl) return;

    try {
      const response = await fetch(resultImageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-tryon-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('图片已保存');
    } catch {
      toast.error('下载失败，请重试');
    }
  };

  const handleShare = async () => {
    if (!resultImageUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI 换衣效果',
          text: '看看我的 AI 换装效果！',
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制');
    }
  };

  const handleTryAnother = () => {
    reset();
    onClose();
  };

  if (!uploadedImageUrl || !resultImageUrl) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl shadow-elevated border border-border max-w-lg w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h3 className="font-semibold text-foreground">换装完成</h3>
            {selectedClothing && (
              <p className="text-sm text-muted-foreground">{selectedClothing.name}</p>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Comparison Slider */}
        <div className="p-4">
          <ComparisonSlider beforeImage={uploadedImageUrl} afterImage={resultImageUrl} />
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-border flex gap-2">
          <Button
            variant="gradient"
            className="flex-1"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            下载图片
          </Button>
          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleTryAnother}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
