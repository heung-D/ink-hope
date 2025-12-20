import { useState } from "react";
import { motion } from "framer-motion";
import { X, Send, User, PenLine, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface SpecialDayWriteLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialDay?: {
    title: string;
    date: string;
    type: string;
  };
}

export function SpecialDayWriteLetterModal({ isOpen, onClose, specialDay }: SpecialDayWriteLetterModalProps) {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSend = () => {
    if (!recipient.trim()) {
      toast.error("받는 사람을 입력해주세요.");
      return;
    }
    if (!message.trim()) {
      toast.error("편지 내용을 입력해주세요.");
      return;
    }
    toast.success("편지가 발송되었습니다!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-amber-400 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <PenLine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">편지 쓰기</h2>
                {specialDay && (
                  <p className="text-sm text-white/80">{specialDay.title}을 앞두고 마음을 전해요</p>
                )}
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* 받는 사람 */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <User className="w-4 h-4 text-orange-500" />
              받는 사람
            </label>
            <Input
              placeholder="받는 사람 이름을 입력하세요"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="h-12 text-base border-orange-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>

          {/* 편지 내용 */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-foreground">
              <PenLine className="w-4 h-4 text-orange-500" />
              편지 내용
            </label>
            <Textarea
              placeholder="마음을 담아 편지를 써주세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[180px] text-base border-orange-200 focus:border-orange-400 focus:ring-orange-400 resize-none"
            />
          </div>

          {/* AI 도움 안내 */}
          <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">AI가 편지 작성을 도와드려요</p>
                <p className="text-xs text-muted-foreground mt-1">
                  편지쓰기 화면에서 AI 도움받기 버튼을 눌러보세요!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-border/40 flex items-center justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button 
            onClick={handleSend}
            className="bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-500 hover:to-amber-500 text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            편지 보내기
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
