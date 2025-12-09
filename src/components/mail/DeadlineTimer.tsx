import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface DeadlineTimerProps {
  deadlineHour?: number; // 우체국 마감 시간 (기본값: 17시)
}

export function DeadlineTimer({ deadlineHour = 17 }: DeadlineTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const deadline = new Date();
      deadline.setHours(deadlineHour, 0, 0, 0);

      // 이미 마감 시간이 지났으면 다음 날로 설정
      if (now >= deadline) {
        setIsExpired(true);
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const diff = deadline.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setIsExpired(false);
      return { hours, minutes, seconds };
    };

    // 초기 계산
    setTimeLeft(calculateTimeLeft());

    // 1초마다 업데이트
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [deadlineHour]);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  if (isExpired) {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">오늘 마감이 종료되었습니다</span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
        <Clock className="w-5 h-5" />
        <span className="font-semibold">
          편지 마감 시간까지 : {timeLeft.hours}시 {formatNumber(timeLeft.minutes)}분 {formatNumber(timeLeft.seconds)}초
        </span>
      </div>
    </motion.div>
  );
}
