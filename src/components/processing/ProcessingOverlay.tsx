import { motion } from 'framer-motion';
import { Loader2, Upload, Sparkles, CheckCircle2 } from 'lucide-react';
import { ProcessingState } from '@/types';

interface ProcessingOverlayProps {
  state: ProcessingState;
}

const stages = [
  { status: 'uploading', label: '上传图片', icon: Upload },
  { status: 'analyzing', label: '分析服装', icon: Sparkles },
  { status: 'generating', label: '生成效果', icon: Loader2 },
  { status: 'complete', label: '完成', icon: CheckCircle2 },
];

export function ProcessingOverlay({ state }: ProcessingOverlayProps) {
  const currentIndex = stages.findIndex((s) => s.status === state.status);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card rounded-2xl p-8 shadow-elevated border border-border max-w-md w-full mx-4"
      >
        {/* Animated Loader */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full bg-gradient-hero p-1"
          >
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
          </motion.div>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4 mb-6">
          {stages.slice(0, -1).map((stage, index) => {
            const Icon = stage.icon;
            const isActive = index === currentIndex;
            const isComplete = index < currentIndex;

            return (
              <motion.div
                key={stage.status}
                initial={false}
                animate={{
                  opacity: isActive || isComplete ? 1 : 0.4,
                }}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isComplete
                      ? 'bg-secondary text-secondary-foreground'
                      : isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                  ) : isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {stage.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${state.progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-primary rounded-full"
          />
        </div>

        {/* Message */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          {state.message || 'AI 正在为你换装...'}
        </p>
      </motion.div>
    </motion.div>
  );
}
