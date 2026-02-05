import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, ArrowRight, ImageIcon } from 'lucide-react';
import { Toaster, toast } from 'sonner';

import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/hero/HeroSection';
import { UploadZone } from '@/components/upload/UploadZone';
import { ClothingSection } from '@/components/clothing/ClothingSection';
import { ProcessingOverlay } from '@/components/processing/ProcessingOverlay';
import { ResultDisplay } from '@/components/result/ResultDisplay';
import { Button } from '@/components/ui/button';
import { useTryOnStore } from '@/stores/tryOnStore';

export default function Index() {
  const {
    uploadedImageUrl,
    selectedClothing,
    processing,
    resultImageUrl,
    setProcessingState,
    setResultImage,
  } = useTryOnStore();

  const [showResult, setShowResult] = useState(false);

  const canTryOn = uploadedImageUrl && selectedClothing;

  // 模拟AI换装处理
  const handleTryOn = useCallback(async () => {
    if (!canTryOn) {
      toast.error('请先上传照片并选择服装');
      return;
    }

    // Start processing
    setProcessingState({ status: 'uploading', progress: 10, message: '正在上传图片...' });

    // Simulate processing stages
    await new Promise((r) => setTimeout(r, 1000));
    setProcessingState({ status: 'analyzing', progress: 40, message: '正在分析服装...' });

    await new Promise((r) => setTimeout(r, 1500));
    setProcessingState({ status: 'generating', progress: 70, message: 'AI 正在生成换装效果...' });

    await new Promise((r) => setTimeout(r, 2000));
    setProcessingState({ status: 'complete', progress: 100, message: '完成！' });

    // 模拟结果 - 使用选中服装的图片作为演示
    // 实际应用中，这里会调用AI API获取真实的换装结果
    setResultImage(selectedClothing.imageUrl);

    await new Promise((r) => setTimeout(r, 500));
    setProcessingState({ status: 'idle', progress: 0, message: '' });
    setShowResult(true);
    toast.success('换装成功！');
  }, [canTryOn, selectedClothing, setProcessingState, setResultImage]);

  const isProcessing = processing.status !== 'idle' && processing.status !== 'complete';

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Main Workspace */}
      <section id="workspace" className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-primary-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">上传照片</h2>
            </div>
            <UploadZone />
          </motion.div>

          {/* Right Column - Clothing Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border p-4 shadow-card"
          >
            <ClothingSection />
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-card border border-border shadow-card"
        >
          <div className="flex items-center gap-4">
            {/* Selection Summary */}
            <div className="flex items-center gap-3">
              {uploadedImageUrl ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-primary/30">
                  <img
                    src={uploadedImageUrl}
                    alt="已上传"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                </div>
              )}

              <ArrowRight className="w-4 h-4 text-muted-foreground" />

              {selectedClothing ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-secondary/30">
                  <img
                    src={selectedClothing.thumbnailUrl}
                    alt={selectedClothing.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-xl">👕</span>
                </div>
              )}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm text-foreground font-medium">
                {!uploadedImageUrl && !selectedClothing && '请上传照片并选择服装'}
                {uploadedImageUrl && !selectedClothing && '已上传照片，请选择服装'}
                {!uploadedImageUrl && selectedClothing && '已选择服装，请上传照片'}
                {canTryOn && `准备就绪：${selectedClothing?.name}`}
              </p>
              <p className="text-xs text-muted-foreground">
                {canTryOn ? '点击按钮开始 AI 换装' : '完成上述步骤后即可换装'}
              </p>
            </div>
          </div>

          <Button
            variant="gradient"
            size="xl"
            disabled={!canTryOn || isProcessing}
            onClick={handleTryOn}
            className="w-full sm:w-auto"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            立即换装
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>AI 换衣间 - 智能虚拟试衣体验</p>
          <p>Powered by AI Technology</p>
        </div>
      </footer>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && <ProcessingOverlay state={processing} />}
      </AnimatePresence>

      {/* Result Display */}
      <AnimatePresence>
        {showResult && resultImageUrl && (
          <ResultDisplay onClose={() => setShowResult(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
