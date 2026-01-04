import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimeCapsuleContentProps {
  onClose: () => void;
}

// 온보딩 예시 카드 데이터
const onboardingExamples = [
  {
    id: 1,
    title: "기념일 선물 준비",
    tags: ["기념일", "To.사랑하는 사람"],
    participants: 3,
    gifts: 1,
    daysLeft: 7,
  },
  {
    id: 2,
    title: "아버지 출소기념 선물 준비하기",
    tags: ["출소 축하", "To.홍길동님을 위해"],
    participants: 5,
    gifts: 2,
    daysLeft: 3,
  },
  {
    id: 3,
    title: "생일 축하 타임캡슐",
    tags: ["생일 축하", "To.친구에게"],
    participants: 8,
    gifts: 3,
    daysLeft: 14,
  },
];

// 오렌지 구슬 컴포넌트
function OrangeMarble({ size = "large" }: { size?: "large" | "small" }) {
  const sizeClasses = size === "large" ? "w-32 h-32" : "w-20 h-20";
  
  return (
    <div className={`${sizeClasses} relative`}>
      {/* 글로우 효과 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300/40 to-orange-500/20 blur-xl scale-150" />
      {/* 메인 구슬 */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300 via-orange-400 to-orange-500 shadow-lg">
        {/* 하이라이트 */}
        <div className="absolute top-2 left-3 w-6 h-6 rounded-full bg-white/50 blur-sm" />
        <div className="absolute top-4 left-5 w-3 h-3 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

// 캐러셀 카드 컴포넌트
function CarouselCard({ 
  example, 
  isCenter 
}: { 
  example: typeof onboardingExamples[0]; 
  isCenter: boolean;
}) {
  return (
    <motion.div
      className={`relative bg-white rounded-2xl shadow-lg transition-all duration-300 ${
        isCenter 
          ? "w-72 h-96 z-20 opacity-100" 
          : "w-56 h-80 z-10 opacity-60 scale-90"
      }`}
      style={{
        boxShadow: isCenter 
          ? "0 20px 40px rgba(251, 146, 60, 0.15)" 
          : "0 10px 20px rgba(0, 0, 0, 0.08)"
      }}
    >
      <div className="p-6 h-full flex flex-col">
        {/* 상단 정보 */}
        <div className="text-xs text-muted-foreground space-y-1 mb-4">
          <p>참여자수 {example.participants}명</p>
          <p>함께선물 {example.gifts}개</p>
          <p>전달까지 D-{example.daysLeft}</p>
        </div>
        
        {/* 오렌지 구슬 */}
        <div className="flex-1 flex items-center justify-center">
          <OrangeMarble size={isCenter ? "large" : "small"} />
        </div>
        
        {/* 제목 */}
        <h3 className={`font-medium text-center mb-3 ${
          isCenter ? "text-base" : "text-sm"
        }`}>
          {example.title}
        </h3>
        
        {/* 태그들 */}
        <div className="flex flex-wrap gap-2 justify-center">
          {example.tags.map((tag, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 text-xs rounded-full bg-orange-50 text-orange-500 border border-orange-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TimeCapsuleContent({ onClose }: TimeCapsuleContentProps) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // 0.6초 후 버튼 활성화
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonEnabled(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? onboardingExamples.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === onboardingExamples.length - 1 ? 0 : prev + 1));
  };

  const getVisibleCards = () => {
    const prev = currentIndex === 0 ? onboardingExamples.length - 1 : currentIndex - 1;
    const next = currentIndex === onboardingExamples.length - 1 ? 0 : currentIndex + 1;
    return [
      { ...onboardingExamples[prev], position: "left" },
      { ...onboardingExamples[currentIndex], position: "center" },
      { ...onboardingExamples[next], position: "right" },
    ];
  };

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
        {[...Array(12)].map((_, i) => (
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
      <div className="relative z-10 flex-1 flex flex-col items-center px-4 py-8">
        {/* 드롭다운 (예시) */}
        <div className="mb-6">
          <div className="px-6 py-2 border border-border rounded-full bg-white text-sm flex items-center gap-2">
            이재원
            <ChevronRight className="w-4 h-4 rotate-90 text-muted-foreground" />
          </div>
        </div>

        {/* 타이틀 */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-primary font-medium tracking-[0.3em] text-sm mb-3">
            T i m e  C a p s u l e
          </p>
          <p className="text-muted-foreground mb-2">
            한 사람을 위해, 여러 사람들이 모여
          </p>
          <h1 className="text-xl font-bold text-foreground">
            특별한 날에 타임캡슐을 전달해요.
          </h1>
        </motion.div>

        {/* 캐러셀 */}
        <div className="relative flex items-center justify-center w-full max-w-3xl mb-8">
          {/* 이전 버튼 */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-30 w-12 h-12 rounded-full border border-border bg-white/80 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* 카드들 */}
          <div className="flex items-center justify-center gap-4">
            <AnimatePresence mode="popLayout">
              {getVisibleCards().map((card, idx) => (
                <motion.div
                  key={`${card.id}-${card.position}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <CarouselCard 
                    example={card} 
                    isCenter={card.position === "center"} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* 다음 버튼 */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-30 w-12 h-12 rounded-full border border-primary bg-white/80 backdrop-blur flex items-center justify-center hover:bg-orange-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </div>

        {/* 하단 CTA */}
        <motion.div 
          className="text-center mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-1">
            출소까지 얼마 안남았네요! 
            <span className="text-primary underline cursor-pointer ml-1">
              그때까지 깜짝 선물을 준비하기
            </span>
          </p>
          <p className="text-muted-foreground mb-6">
            딱 좋은 시기네요 :) 시작해볼까요?
          </p>

          {/* 다음 버튼 - 0.6초 후 활성화 */}
          <Button
            size="lg"
            disabled={!isButtonEnabled}
            className={`w-full max-w-md h-14 text-lg font-medium rounded-xl transition-all duration-300 ${
              isButtonEnabled 
                ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            쪽지 작성
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
