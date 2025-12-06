import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Image, Save, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { FamilyMember, MailOption } from "@/types/mail";
import { toast } from "sonner";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  mailOptions: MailOption[];
}

type Step = 1 | 2 | 3;

const paperOptions = [
  { id: "basic", label: "기본", style: "bg-gradient-to-b from-white to-gray-50" },
  {
    id: "lined",
    label: "줄노트",
    style: "bg-[repeating-linear-gradient(white,white_11px,#e5e5e5_11px,#e5e5e5_12px)]",
  },
  {
    id: "warm",
    label: "따뜻한",
    style: "bg-gradient-to-br from-orange-50 to-rose-50",
  },
];

export function ComposeModal({
  isOpen,
  onClose,
  familyMembers,
  mailOptions,
}: ComposeModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedRecipient, setSelectedRecipient] = useState(familyMembers[0]?.id || "");
  const [selectedPaper, setSelectedPaper] = useState("basic");
  const [selectedMailOption, setSelectedMailOption] = useState("regular");
  const [letterContent, setLetterContent] = useState("");

  const handleClose = () => {
    setStep(1);
    setLetterContent("");
    onClose();
  };

  const handleSend = () => {
    toast.success("편지가 성공적으로 발송되었습니다! 💌");
    handleClose();
  };

  const selectedRecipientData = familyMembers.find((m) => m.id === selectedRecipient);
  const selectedMailOptionData = mailOptions.find((m) => m.id === selectedMailOption);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-4 md:inset-8 lg:inset-12 bg-card rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="h-16 border-b border-border flex items-center justify-between px-6">
              <h2 className="text-lg font-semibold text-foreground">
                새 편지 쓰기
              </h2>
              <div className="flex items-center gap-4">
                {/* Step Indicator */}
                <div className="hidden md:flex items-center gap-2">
                  {[1, 2, 3].map((s, i) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-colors duration-200",
                          s <= step ? "bg-primary" : "bg-border"
                        )}
                      />
                      {i < 2 && (
                        <div
                          className={cn(
                            "w-8 h-0.5 transition-colors duration-200",
                            s < step ? "bg-primary" : "bg-border"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex overflow-hidden">
              {/* Step 1: Recipient & Paper */}
              {step === 1 && (
                <div className="flex-1 flex">
                  {/* Left: Recipients */}
                  <div className="w-80 border-r border-border p-6 overflow-y-auto scrollbar-thin">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                      받는 사람
                    </h3>
                    <div className="space-y-3">
                      {familyMembers.map((member) => (
                        <label
                          key={member.id}
                          className={cn(
                            "block p-4 border-2 rounded-xl cursor-pointer transition-all duration-150",
                            selectedRecipient === member.id
                              ? "border-primary bg-accent"
                              : "border-border hover:border-primary/50 hover:bg-secondary/50"
                          )}
                        >
                          <input
                            type="radio"
                            name="recipient"
                            value={member.id}
                            checked={selectedRecipient === member.id}
                            onChange={(e) => setSelectedRecipient(e.target.value)}
                            className="hidden"
                          />
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center font-medium",
                                member.color
                              )}
                            >
                              {member.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-foreground">
                                {member.name}
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                  {member.relation}
                                </span>
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.facility}
                              </p>
                            </div>
                            {selectedRecipient === member.id && (
                              <Check className="w-5 h-5 text-primary" />
                            )}
                          </div>
                        </label>
                      ))}

                      {/* Add new recipient */}
                      <button className="w-full p-4 border-2 border-dashed border-border hover:border-primary/50 hover:bg-accent rounded-xl text-muted-foreground hover:text-accent-foreground transition-all flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        새 수신자 추가
                      </button>
                    </div>
                  </div>

                  {/* Right: Paper Selection */}
                  <div className="flex-1 p-6 bg-secondary/30 overflow-y-auto scrollbar-thin">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                      편지지 선택
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {paperOptions.map((paper) => (
                        <label key={paper.id} className="cursor-pointer">
                          <input
                            type="radio"
                            name="paper"
                            value={paper.id}
                            checked={selectedPaper === paper.id}
                            onChange={(e) => setSelectedPaper(e.target.value)}
                            className="hidden"
                          />
                          <div
                            className={cn(
                              "aspect-[3/4] border-2 rounded-xl shadow-sm p-2 transition-all duration-150",
                              selectedPaper === paper.id
                                ? "border-primary shadow-card-hover"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <div
                              className={cn(
                                "w-full h-full rounded-lg flex items-center justify-center text-xs text-muted-foreground",
                                paper.style
                              )}
                            >
                              {paper.label}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <Button
                      onClick={() => setStep(2)}
                      className="w-full h-12 rounded-xl text-[15px] font-semibold"
                    >
                      편지 작성하기 →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Write Letter */}
              {step === 2 && (
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 p-6 bg-secondary/30 overflow-y-auto scrollbar-thin">
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                        {/* Recipient Info */}
                        <div className="px-6 py-4 border-b border-border bg-secondary/50">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">받는 사람:</span>
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                                  selectedRecipientData?.color
                                )}
                              >
                                {selectedRecipientData?.avatar}
                              </div>
                              <span className="font-medium text-foreground">
                                {selectedRecipientData?.name}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                · {selectedRecipientData?.facility}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Letter Content */}
                        <div className="p-6">
                          <textarea
                            value={letterContent}
                            onChange={(e) => setLetterContent(e.target.value)}
                            className="w-full min-h-[400px] resize-none border-0 focus:outline-none focus:ring-0 text-foreground leading-relaxed letter-paper text-base bg-transparent"
                            placeholder="마음을 담아 편지를 써보세요..."
                          />
                        </div>
                      </div>

                      {/* Tools */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors">
                            <Image className="w-5 h-5" />
                          </button>
                          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-card rounded-lg transition-colors">
                            <Save className="w-5 h-5" />
                          </button>
                        </div>
                        <span className="text-sm text-muted-foreground">자동 저장됨</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="h-20 border-t border-border bg-card flex items-center justify-between px-6">
                    <Button variant="ghost" onClick={() => setStep(1)}>
                      ← 이전
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="h-11 px-8 rounded-xl text-[15px] font-semibold"
                    >
                      미리보기 및 발송 →
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Preview & Send */}
              {step === 3 && (
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 flex overflow-hidden">
                    {/* Left: Preview */}
                    <div className="flex-1 p-6 bg-secondary/30 overflow-y-auto scrollbar-thin">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                        편지 미리보기
                      </h3>
                      <div className="max-w-lg mx-auto">
                        <div className="bg-card rounded-2xl shadow-lg p-8">
                          <div className="text-center mb-6">
                            <p className="text-sm text-muted-foreground">
                              To. {selectedRecipientData?.name}
                            </p>
                            <p className="text-xs text-muted-foreground/60">
                              {selectedRecipientData?.facility}
                            </p>
                          </div>
                          <div className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                            {letterContent || (
                              <p className="text-muted-foreground italic">
                                편지 내용이 여기에 표시됩니다...
                              </p>
                            )}
                          </div>
                          <div className="mt-8 text-right">
                            <p className="text-sm text-muted-foreground">From. 엄마</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Mail Options */}
                    <div className="w-80 border-l border-border bg-card p-6 overflow-y-auto scrollbar-thin">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                        발송 옵션
                      </h3>

                      <div className="space-y-3 mb-6">
                        {mailOptions.map((option) => (
                          <label
                            key={option.id}
                            className={cn(
                              "block p-4 border-2 rounded-xl cursor-pointer transition-all duration-150",
                              selectedMailOption === option.id
                                ? "border-primary bg-accent"
                                : "border-border hover:border-primary/50"
                            )}
                          >
                            <input
                              type="radio"
                              name="mailOption"
                              value={option.id}
                              checked={selectedMailOption === option.id}
                              onChange={(e) => setSelectedMailOption(e.target.value)}
                              className="hidden"
                            />
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-foreground">
                                  {option.name}
                                  {option.badge && (
                                    <span className="ml-2 text-xs text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                      {option.badge}
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {option.description}
                                </p>
                              </div>
                              <span className="font-bold text-primary">
                                {option.price.toLocaleString()}원
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>

                      {/* Additional Options */}
                      <div className="border-t border-border pt-4 mb-6">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                          추가 옵션
                        </h4>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                          />
                          <span className="text-sm text-foreground">
                            사진 인화 추가 (+500원/장)
                          </span>
                        </label>
                      </div>

                      {/* Price Summary */}
                      <div className="bg-secondary rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">우편 요금</span>
                          <span className="text-sm text-foreground">
                            {selectedMailOptionData?.price.toLocaleString()}원
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">인쇄비</span>
                          <span className="text-sm text-foreground">0원</span>
                        </div>
                        <div className="border-t border-border my-2" />
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">총 결제금액</span>
                          <span className="font-bold text-lg text-primary">
                            {selectedMailOptionData?.price.toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="h-20 border-t border-border bg-card flex items-center justify-between px-6">
                    <Button variant="ghost" onClick={() => setStep(2)}>
                      ← 이전
                    </Button>
                    <Button
                      onClick={handleSend}
                      className="h-11 px-8 rounded-xl text-[15px] font-semibold shadow-card hover:shadow-card-hover transition-all duration-200"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      편지 발송하기
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
