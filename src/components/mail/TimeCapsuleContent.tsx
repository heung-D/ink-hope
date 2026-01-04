import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Gift, Users, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeCapsuleContentProps {
  onClose: () => void;
}

// 온보딩 스텝 데이터
const onboardingSteps = [
  {
    id: 1,
    title: "누구를 위한 타임캡슐인가요?",
    subtitle: "마음을 전할 대상을 선택해주세요",
    icon: Heart,
    options: [
      { id: "family", label: "가족", description: "부모님, 형제자매" },
      { id: "friend", label: "친구", description: "소중한 벗에게" },
      { id: "lover", label: "연인", description: "사랑하는 사람" },
      { id: "myself", label: "나 자신", description: "미래의 나에게" },
    ],
    defaultSelected: "family",
  },
  {
    id: 2,
    title: "어떤 특별한 날인가요?",
    subtitle: "타임캡슐을 전달할 기념일을 선택해주세요",
    icon: Calendar,
    options: [
      { id: "birthday", label: "생일", description: "태어난 날 축하" },
      { id: "anniversary", label: "기념일", description: "특별한 날" },
      { id: "release", label: "출소일", description: "새 시작을 축하" },
      { id: "graduation", label: "졸업/입학", description: "새로운 시작" },
    ],
    defaultSelected: "release",
  },
  {
    id: 3,
    title: "함께 참여할 사람들은?",
    subtitle: "타임캡슐에 함께할 인원을 선택해주세요",
    icon: Users,
    options: [
      { id: "solo", label: "나만", description: "혼자서 준비해요" },
      { id: "few", label: "2~5명", description: "소규모 모임" },
      { id: "many", label: "6~10명", description: "가족/친구 모임" },
      { id: "crowd", label: "10명 이상", description: "많은 사람들과" },
    ],
    defaultSelected: "few",
  },
  {
    id: 4,
    title: "함께 선물도 준비할까요?",
    subtitle: "타임캡슐과 함께 전달할 선물을 선택해주세요",
    icon: Gift,
    options: [
      { id: "none", label: "쪽지만", description: "마음만 전해요" },
      { id: "small", label: "소소한 선물", description: "작은 정성" },
      { id: "big", label: "특별한 선물", description: "큰 깜짝 선물" },
      { id: "money", label: "용돈 모으기", description: "함께 모아요" },
    ],
    defaultSelected: "small",
  },
];

// 오렌지 구슬 컴포넌트
function OrangeMarble({ size = "large" }: { size?: "large" | "small" }) {
  const sizeClasses = size === "large" ? "w-24 h-24" : "w-16 h-16";
  
  return (
    <div className={`${sizeClasses} relative`}>
      {/* 글로우 효과 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/40 to-orange-500/20 blur-xl scale-150" />
      {/* 메인 구슬 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-lg">
        {/* 하이라이트 */}
        <div className="absolute top-2 left-3 w-5 h-5 rounded-full bg-white/50 blur-sm" />
        <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

// 옵션 카드 컴포넌트
function OptionCard({ 
  option, 
  isSelected,
  onSelect 
}: { 
  option: { id: string; label: string; description: string };
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
        isSelected 
          ? "border-primary bg-orange-50 shadow-md shadow-primary/10" 
          : "border-border bg-white hover:border-primary/50 hover:bg-orange-50/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? "border-primary bg-primary" : "border-muted-foreground/30"
        }`}>
          {isSelected && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-white"
            />
          )}
        </div>
        <div>
          <p className={`font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
            {option.label}
          </p>
          <p className="text-xs text-muted-foreground">{option.description}</p>
        </div>
      </div>
    </motion.button>
  );
}

// 진행률 인디케이터
function ProgressIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: totalSteps }).map((_, idx) => (
        <div
          key={idx}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            idx < currentStep 
              ? "w-8 bg-primary" 
              : idx === currentStep 
                ? "w-8 bg-primary/50" 
                : "w-3 bg-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function TimeCapsuleContent({ onClose }: TimeCapsuleContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selections, setSelections] = useState<Record<number, string>>(() => {
    // 각 스텝의 기본 선택값 설정
    const initial: Record<number, string> = {};
    onboardingSteps.forEach((step, idx) => {
      initial[idx] = step.defaultSelected;
    });
    return initial;
  });

  const currentStepData = onboardingSteps[currentStep];
  const isLastStep = currentStep === onboardingSteps.length - 1;

  // 스텝 변경 시마다 0.6초 후 버튼 활성화
  useEffect(() => {
    setIsButtonEnabled(false);
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleOptionSelect = (optionId: string) => {
    setSelections(prev => ({ ...prev, [currentStep]: optionId }));
  };

  const handleNext = () => {
    if (isLastStep) {
      // 온보딩 완료 - 타임캡슐 생성 페이지로 이동하거나 다음 단계 처리
      console.log("Onboarding complete:", selections);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const StepIcon = currentStepData.icon;

  return (
    <div className="flex-1 flex flex-col h-full overflow-auto bg-gradient-to-b from-orange-50/30 to-white">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 곡선 라인 */}
        <svg className="absolute bottom-20 left-0 right-0 w-full h-64 opacity-20">
          <ellipse 
            cx="50%" 
            cy="80%" 
            rx="60%" 
            ry="40%" 
            fill="none" 
            stroke="hsl(var(--primary))" 
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
        
        {/* 흩어진 오렌지 도트들 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-orange-300 to-orange-400"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 py-6">
        {/* 진행률 표시 */}
        <div className="w-full max-w-md mb-6">
          <ProgressIndicator currentStep={currentStep} totalSteps={onboardingSteps.length} />
        </div>

        {/* 스텝 번호 */}
        <motion.div 
          key={`step-${currentStep}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-muted-foreground mb-4"
        >
          Step {currentStep + 1} / {onboardingSteps.length}
        </motion.div>

        {/* 오렌지 구슬과 아이콘 */}
        <motion.div
          key={`marble-${currentStep}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative mb-6"
        >
          <OrangeMarble size="large" />
          <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
            <StepIcon className="w-5 h-5 text-primary" />
          </div>
        </motion.div>

        {/* 타이틀 */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`title-${currentStep}`}
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-xl font-bold text-foreground mb-2">
              {currentStepData.title}
            </h1>
            <p className="text-muted-foreground text-sm">
              {currentStepData.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 옵션들 */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`options-${currentStep}`}
            className="w-full max-w-md space-y-3 mb-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStepData.options.map((option, idx) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <OptionCard
                  option={option}
                  isSelected={selections[currentStep] === option.id}
                  onSelect={() => handleOptionSelect(option.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* 네비게이션 버튼 */}
        <div className="w-full max-w-md mt-auto flex gap-3">
          {/* 이전 버튼 */}
          {currentStep > 0 && (
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrev}
              className="flex-1 h-14 rounded-xl border-border"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              이전
            </Button>
          )}

          {/* 다음/완료 버튼 */}
          <Button
            size="lg"
            disabled={!isButtonEnabled || !selections[currentStep]}
            onClick={handleNext}
            className={`flex-1 h-14 text-lg font-medium rounded-xl transition-all duration-300 ${
              currentStep === 0 ? "w-full" : ""
            } ${
              isButtonEnabled && selections[currentStep]
                ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isLastStep ? "시작하기" : "다음"}
            {!isLastStep && <ChevronRight className="w-5 h-5 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
