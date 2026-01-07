import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, Settings, Copy, Check, Send, Heart,
  Coffee, ShoppingBag, Book, Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";

// 목업 데이터
const mockCapsuleData: Record<string, {
  id: number;
  title: string;
  recipient: string;
  recipientName: string;
  eventType: string;
  facility: string;
  targetDate: string;
  targetTime: string;
  daysLeft: number;
  noteCount: number;
  activities: Array<{
    id: number;
    type: "note" | "gift" | "milestone";
    message: string;
    sender?: string;
    relation?: string;
    timestamp: string;
    hasGift?: boolean;
  }>;
  participants: Array<{
    id: number;
    name: string;
    avatar: string;
    isHost: boolean;
  }>;
}> = {
  "1": {
    id: 1,
    title: "서은우 출소 축하",
    recipient: "서은우",
    recipientName: "서은우",
    eventType: "출소 축하",
    facility: "서울교도소",
    targetDate: "2026.2.12",
    targetTime: "10:00",
    daysLeft: 213,
    noteCount: 20,
    activities: [
      { id: 1, type: "milestone", message: "이번주 총 10개의 쪽지가 모였어요", timestamp: "2026.2.12 10:00" },
      { id: 2, type: "gift", message: "김홍오(엄마) 님께서 커피쿠폰 5장 선물 +", sender: "김홍오", relation: "엄마", timestamp: "2026.2.12 10:00", hasGift: true },
      { id: 3, type: "milestone", message: "이번주 총 20개의 쪽지가 모였어요!", timestamp: "2026.2.19 10:00" },
      { id: 4, type: "gift", message: "김한나(자녀) 님께서 커피쿠폰 5장 선물 +", sender: "김한나", relation: "자녀", timestamp: "2026.2.19 10:00", hasGift: true },
    ],
    participants: [
      { id: 1, name: "김홍오", avatar: "👩", isHost: true },
      { id: 2, name: "박지수", avatar: "👨", isHost: false },
      { id: 3, name: "김한나", avatar: "👧", isHost: false },
      { id: 4, name: "이준호", avatar: "👦", isHost: false },
      { id: 5, name: "정수민", avatar: "👩‍🦰", isHost: false },
      { id: 6, name: "최민지", avatar: "👱‍♀️", isHost: false },
      { id: 7, name: "윤서준", avatar: "🧑", isHost: false },
    ],
  },
  "2": {
    id: 2,
    title: "어머니 면회",
    recipient: "김영희",
    recipientName: "김영희",
    eventType: "면회 응원",
    facility: "청주여자교도소",
    targetDate: "2026.1.20",
    targetTime: "14:00",
    daysLeft: 32,
    noteCount: 8,
    activities: [
      { id: 1, type: "milestone", message: "이번주 총 5개의 쪽지가 모였어요", timestamp: "2026.1.15 10:00" },
      { id: 2, type: "note", message: "따뜻한 응원 메시지를 보냈어요", sender: "아들", relation: "자녀", timestamp: "2026.1.16 14:00" },
    ],
    participants: [
      { id: 1, name: "아버지", avatar: "👨", isHost: true },
      { id: 2, name: "큰딸", avatar: "👩", isHost: false },
      { id: 3, name: "막내", avatar: "🧑", isHost: false },
    ],
  },
  "3": {
    id: 3,
    title: "오빠 가석방 축하",
    recipient: "박민수",
    recipientName: "박민수",
    eventType: "가석방 축하",
    facility: "의정부교도소",
    targetDate: "2025.12.20",
    targetTime: "09:00",
    daysLeft: 0,
    noteCount: 15,
    activities: [
      { id: 1, type: "milestone", message: "타임캡슐이 성공적으로 전달되었어요! 🎉", timestamp: "2025.12.20 09:00" },
    ],
    participants: [
      { id: 1, name: "동생", avatar: "😊", isHost: true },
      { id: 2, name: "어머니", avatar: "👩", isHost: false },
      { id: 3, name: "아버지", avatar: "👨", isHost: false },
    ],
  },
};

// 캡슐 그래픽 컴포넌트 - 쪽지가 차오르는 애니메이션
function CapsuleGraphic({ 
  noteCount, 
  participants 
}: { 
  noteCount: number; 
  participants: Array<{ id: number; name: string; avatar: string; isHost: boolean }>;
}) {
  // 쪽지 수에 따라 구슬 개수 결정 (최대 12개)
  const marbleCount = Math.min(Math.ceil(noteCount / 2), 12);
  
  // 구슬 위치 (캡슐 안쪽)
  const marblePositions = [
    { x: 50, y: 75 },
    { x: 35, y: 70 },
    { x: 65, y: 70 },
    { x: 42, y: 60 },
    { x: 58, y: 60 },
    { x: 50, y: 55 },
    { x: 30, y: 55 },
    { x: 70, y: 55 },
    { x: 38, y: 45 },
    { x: 62, y: 45 },
    { x: 50, y: 40 },
    { x: 45, y: 35 },
  ];

  // 참여자 위치 (캡슐 주변)
  const participantPositions = [
    { x: 85, y: 25 },
    { x: 95, y: 45 },
    { x: 90, y: 70 },
    { x: 5, y: 50 },
    { x: 35, y: 90 },
    { x: 65, y: 90 },
    { x: 15, y: 30 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[280px] mx-auto">
      {/* 배경 원 */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-b from-primary/5 to-primary/15" />
      <div className="absolute inset-8 rounded-full bg-gradient-to-b from-primary/10 to-primary/20" />
      <div className="absolute inset-12 rounded-full bg-gradient-to-b from-primary/15 to-primary/25" />
      
      {/* SVG 캡슐과 구슬 */}
      <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
        {/* 캡슐 외곽선 */}
        <ellipse 
          cx="50" 
          cy="55" 
          rx="30" 
          ry="35" 
          fill="none" 
          stroke="hsl(var(--primary))" 
          strokeWidth="0.5" 
          strokeDasharray="2 2"
          opacity="0.3"
        />
        
        {/* 구슬들 */}
        {marblePositions.slice(0, marbleCount).map((pos, index) => (
          <motion.g
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            {/* 구슬 그림자 */}
            <ellipse
              cx={pos.x + 1}
              cy={pos.y + 1}
              rx="5"
              ry="4.5"
              fill="rgba(0,0,0,0.1)"
            />
            {/* 구슬 본체 */}
            <ellipse
              cx={pos.x}
              cy={pos.y}
              rx="5"
              ry="4.5"
              fill="hsl(var(--primary))"
              opacity={0.9 - index * 0.05}
            />
            {/* 구슬 하이라이트 */}
            <ellipse
              cx={pos.x - 1.5}
              cy={pos.y - 1.5}
              rx="2"
              ry="1.5"
              fill="white"
              opacity="0.4"
            />
          </motion.g>
        ))}
      </svg>

      {/* 참여자 아바타들 */}
      {participants.slice(0, 7).map((participant, index) => {
        const pos = participantPositions[index];
        if (!pos) return null;
        
        return (
          <motion.div
            key={participant.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="absolute"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center text-sm shadow-md">
                {participant.avatar}
              </div>
              {participant.isHost && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-primary text-primary-foreground text-[8px] rounded font-medium">
                  방장
                </span>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// 활동 메시지 컴포넌트
function ActivityMessage({ 
  activity, 
  isLast 
}: { 
  activity: {
    id: number;
    type: "note" | "gift" | "milestone";
    message: string;
    sender?: string;
    relation?: string;
    timestamp: string;
    hasGift?: boolean;
  };
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-1"
    >
      <div className={`
        px-4 py-3 rounded-2xl text-sm
        ${activity.type === "milestone" 
          ? "bg-muted text-foreground" 
          : "bg-muted text-foreground"
        }
      `}>
        {activity.message}
        {activity.hasGift && (
          <Heart className="inline-block w-4 h-4 ml-1 text-orange-400 fill-orange-400" />
        )}
      </div>
      {isLast && (
        <p className="text-xs text-muted-foreground text-right pr-2">
          {activity.timestamp}
        </p>
      )}
    </motion.div>
  );
}

// 선물 옵션 카드 컴포넌트
function GiftOptionCard({
  title,
  buttonText,
  description,
  bgColor,
  icon: Icon
}: {
  title: string;
  buttonText: string;
  description: string;
  bgColor: string;
  icon: React.ElementType;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-background rounded-2xl border border-border/60 p-4 shadow-sm"
    >
      <p className="text-primary font-semibold text-sm leading-snug mb-3 min-h-[40px]">
        {title}
      </p>
      <div className={`${bgColor} rounded-xl p-4 flex items-center justify-center mb-3`}>
        <Button variant="ghost" className="text-muted-foreground text-sm hover:bg-white/50">
          {buttonText}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function TimeCapsuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteText, setNoteText] = useState("");
  const [copied, setCopied] = useState(false);

  const capsule = mockCapsuleData[id || "1"];

  if (!capsule) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">타임캡슐을 찾을 수 없습니다</p>
          <Button onClick={() => navigate("/time-capsule")}>돌아가기</Button>
        </div>
      </div>
    );
  }

  const handleSendNote = () => {
    if (!noteText.trim()) {
      toast.error("쪽지 내용을 입력해주세요");
      return;
    }
    toast.success("쪽지가 발송되었어요!");
    setNoteText("");
  };

  const handleSendCapsule = () => {
    toast.success("타임캡슐이 발송되었어요!");
  };

  // 활동 그룹핑 (날짜별)
  const groupedActivities: { timestamp: string; items: typeof capsule.activities }[] = [];
  let currentGroup: typeof capsule.activities = [];
  let currentTimestamp = "";

  capsule.activities.forEach((activity, index) => {
    if (activity.timestamp !== currentTimestamp) {
      if (currentGroup.length > 0) {
        groupedActivities.push({ timestamp: currentTimestamp, items: [...currentGroup] });
      }
      currentTimestamp = activity.timestamp;
      currentGroup = [activity];
    } else {
      currentGroup.push(activity);
    }
    
    if (index === capsule.activities.length - 1) {
      groupedActivities.push({ timestamp: currentTimestamp, items: [...currentGroup] });
    }
  });

  return (
    <AppLayout>
      <Helmet>
        <title>{capsule.title} - Orange Mail</title>
      </Helmet>

      <div className="h-full overflow-auto bg-muted/30">
        {/* Header */}
        <header className="bg-background border-b border-border/60 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <button 
              onClick={() => navigate("/time-capsule")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* 수신자 정보 */}
            <div className="flex items-center gap-3">
              <span className="font-bold text-foreground">To. {capsule.recipientName}</span>
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {capsule.eventType}
              </span>
              <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                출소까지 D-{capsule.daysLeft}
              </span>
            </div>

            <div className="text-right text-xs text-muted-foreground">
              <span>출소일: {capsule.targetDate} {capsule.targetTime}</span>
              <span className="ml-2">장소: {capsule.facility}</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* 메인 캡슐 카드 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background rounded-3xl border border-border/60 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <h2 className="font-bold text-lg text-foreground mb-4">
                {capsule.targetDate} 전달되는 타임캡슐
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 왼쪽: 캡슐 그래픽 */}
                <div className="flex items-center justify-center">
                  <CapsuleGraphic 
                    noteCount={capsule.noteCount} 
                    participants={capsule.participants} 
                  />
                </div>

                {/* 오른쪽: 채팅 피드 */}
                <div className="space-y-4">
                  {/* 방장 아바타 */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                        {capsule.participants.find(p => p.isHost)?.avatar || "👤"}
                      </div>
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-primary text-primary-foreground text-[8px] rounded font-medium whitespace-nowrap">
                        방장
                      </span>
                    </div>
                  </div>

                  {/* 활동 피드 */}
                  <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                    {groupedActivities.map((group, groupIndex) => (
                      <div key={groupIndex} className="space-y-2">
                        {group.items.map((activity, index) => (
                          <ActivityMessage 
                            key={activity.id} 
                            activity={activity}
                            isLast={index === group.items.length - 1}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 타임캡슐 발송 버튼 */}
            <div className="px-6 pb-6">
              <Button 
                onClick={handleSendCapsule}
                className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl text-base"
              >
                타임캡슐 발송하기
              </Button>
            </div>
          </motion.section>

          {/* 쪽지 보내기 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-background rounded-3xl border border-border/60 shadow-sm p-6"
          >
            <h3 className="font-bold text-foreground mb-4">쪽지보내기</h3>
            <div className="flex items-center gap-3">
              <Input
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="한 문장으로도 충분해요."
                className="flex-1 h-12 rounded-xl border-border/60 bg-muted/30"
              />
              <Button 
                onClick={handleSendNote}
                className="h-12 px-6 bg-primary hover:bg-primary/90 rounded-xl font-medium"
              >
                쪽지 보내기
              </Button>
            </div>
          </motion.section>

          {/* 선물 옵션들 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <GiftOptionCard
              title="마음과 함께, 작은 선물을 더할 수 있어요"
              buttonText="스타벅스 쿠폰 전달하기"
              description="커피 한 잔을 선물처럼 쪽지와 함께 전할 수 있어요. 이 작은 선물은 출소 이후 새로운 일상을 시작하는 데 실질적인 도움이 됩니다."
              bgColor="bg-amber-50"
              icon={Coffee}
            />
            <GiftOptionCard
              title="출소일에 바로 입을 옷을 준비할 수 있어요"
              buttonText="출소룩 구매링크"
              description="출소 당일, 밖으로 나오는 순간을 위해 편안한 옷을 함께 준비할 수 있어요. 새로운 시작을 맞이하는 데 가장 먼저 필요한 준비입니다."
              bgColor="bg-amber-50"
              icon={ShoppingBag}
            />
            <GiftOptionCard
              title="새로운 일상을 시작하는 데 도움이 되는 책"
              buttonText="도서구매링크"
              description="출소 이후의 시간을 준비하며 차분히 마음을 정리할 수 있도록 책 한 권을 선물할 수 있어요."
              bgColor="bg-amber-50"
              icon={Book}
            />
          </motion.section>
        </main>
      </div>
    </AppLayout>
  );
}
