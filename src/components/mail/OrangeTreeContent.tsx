import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TreeDeciduous, Leaf, Calendar, ChevronRight, Plus, 
  Home, Scale, Users, GraduationCap, Send, Mail, 
  Image, FileText, MailOpen, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddSpecialDayModal } from "./AddSpecialDayModal";
import { SpecialDayDetailModal } from "./SpecialDayDetailModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  orangeTrees, 
  specialDays, 
  recentActivities, 
  growthStages, 
  getGrowthStage, 
  getLettersToNextStage 
} from "@/data/mockData";
import type { OrangeTree, SpecialDay } from "@/types/mail";

interface OrangeTreeContentProps {
  onClose: () => void;
  onCompose?: () => void;
}

// 소중한 날들 타입 아이콘
const getSpecialDayIcon = (type: SpecialDay["type"]) => {
  switch (type) {
    case "release": return <Home className="w-5 h-5 text-orange-500" />;
    case "parole": return <Home className="w-5 h-5 text-orange-500" />;
    case "birthday": return <Calendar className="w-5 h-5 text-orange-500" />;
    case "anniversary": return <Calendar className="w-5 h-5 text-orange-500" />;
    case "visit": return <Users className="w-5 h-5 text-orange-500" />;
    case "trial": return <Scale className="w-5 h-5 text-orange-500" />;
    case "education": return <GraduationCap className="w-5 h-5 text-orange-500" />;
    default: return <Calendar className="w-5 h-5 text-orange-500" />;
  }
};

const getSpecialDayLabel = (type: SpecialDay["type"]) => {
  switch (type) {
    case "release": return "출소";
    case "parole": return "가석방";
    case "birthday": return "생일";
    case "anniversary": return "기념일";
    case "visit": return "면회";
    case "trial": return "재판";
    case "education": return "교육";
    default: return "기타";
  }
};

// D-Day 계산
const getDaysRemaining = (dateStr: string): number => {
  const targetDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  return Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

// 활동 타입별 아이콘
const getActivityIcon = (type: "sent" | "received") => {
  if (type === "sent") {
    return { icon: <Send className="w-4 h-4 text-orange-500" />, bg: "bg-gray-100" };
  }
  return { icon: <MailOpen className="w-4 h-4 text-orange-500" />, bg: "bg-gray-100" };
};

// 우편 종류 아이콘
const mailTypeIcons: Record<string, { icon: React.ReactNode; label: string }> = {
  "편지": { icon: <Mail className="w-3.5 h-3.5" />, label: "편지" },
  "사진": { icon: <Image className="w-3.5 h-3.5" />, label: "사진" },
  "파일": { icon: <FileText className="w-3.5 h-3.5" />, label: "파일" },
};

export function OrangeTreeContent({ onClose, onCompose }: OrangeTreeContentProps) {
  const [selectedTreeId, setSelectedTreeId] = useState(orangeTrees[0]?.id || "");
  const [showAddDayModal, setShowAddDayModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<SpecialDay | null>(null);

  // 선택된 나무
  const selectedTree = useMemo(() => 
    orangeTrees.find(t => t.id === selectedTreeId) || orangeTrees[0],
    [selectedTreeId]
  );

  // 현재 성장 단계
  const currentStage = useMemo(() => 
    getGrowthStage(selectedTree?.totalLetters || 0),
    [selectedTree?.totalLetters]
  );

  // 다음 단계 정보
  const nextStageInfo = useMemo(() => 
    getLettersToNextStage(selectedTree?.totalLetters || 0),
    [selectedTree?.totalLetters]
  );

  // 선택된 나무의 소중한 날들 (가까운 순 3개)
  const treeSpecialDays = useMemo(() => {
    const days = specialDays
      .filter(d => d.treeId === selectedTreeId)
      .sort((a, b) => getDaysRemaining(a.date) - getDaysRemaining(b.date))
      .slice(0, 3);
    return days;
  }, [selectedTreeId]);

  // 모든 소중한 날들 (더보기용)
  const allTreeSpecialDays = useMemo(() => 
    specialDays.filter(d => d.treeId === selectedTreeId),
    [selectedTreeId]
  );

  const handleDayClick = (day: SpecialDay) => {
    setSelectedDay(day);
    setShowDetailModal(true);
  };

  const handleWriteLetterFromDetail = () => {
    setShowDetailModal(false);
    onCompose?.();
  };

  if (!selectedTree) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-orange-50/50 to-amber-50/30">
        <p className="text-muted-foreground">나무를 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-orange-50/50 to-amber-50/30">
      {/* Header with Tree Selector */}
      <header className="h-14 border-b border-border/40 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <TreeDeciduous className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">오렌지나무</h1>
          
          {/* 나무 선택 드롭다운 */}
          <Select value={selectedTreeId} onValueChange={setSelectedTreeId}>
            <SelectTrigger className="w-auto h-8 gap-1 border-none bg-orange-100 text-primary font-medium px-3 rounded-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {orangeTrees.map((tree) => {
                const stage = getGrowthStage(tree.totalLetters);
                return (
                  <SelectItem key={tree.id} value={tree.id}>
                    {tree.relation}와의 나무 (Lv.{stage.level})
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          편지함으로 돌아가기
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* 히어로 영역 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-3xl p-8 text-white shadow-xl"
          >
            {/* 배경 장식 */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex items-center gap-8">
              {/* 나무 일러스트 */}
              <div className="flex-shrink-0">
                <motion.img 
                  src={currentStage.icon} 
                  alt={currentStage.name}
                  className="w-32 h-32 object-contain drop-shadow-lg"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </div>
              
              {/* 나무 정보 */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm text-xs px-2 py-1 rounded-full font-medium">
                    Lv.{currentStage.level}
                  </span>
                  <h2 className="text-2xl font-bold">{currentStage.name}</h2>
                </div>
                
                <p className="text-white/90 text-sm mb-3">
                  {currentStage.message}
                </p>
                
                {/* 진행 상태 */}
                {nextStageInfo.nextStage ? (
                  <p className="text-white/80 text-sm mb-4">
                    <span className="font-semibold text-white">{nextStageInfo.nextStage.name}</span>까지 
                    <span className="font-bold text-yellow-200 mx-1">{nextStageInfo.lettersRemaining}통</span> 남음
                  </p>
                ) : (
                  <p className="text-white/80 text-sm mb-4">최고 레벨 달성! 🎉</p>
                )}
                
                {/* D-Day */}
                {selectedTree.daysRemaining && (
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-white/20 backdrop-blur-sm text-sm px-3 py-1.5 rounded-full font-medium">
                      D-{selectedTree.daysRemaining}
                    </span>
                    <span className="text-white/80 text-sm">
                      {selectedTree.expectedReleaseDate} 출소 예정
                    </span>
                  </div>
                )}
                
                {/* CTA 버튼 */}
                <Button 
                  onClick={onCompose}
                  className="bg-white text-orange-600 hover:bg-white/90 font-semibold shadow-lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  편지 쓰기
                </Button>
              </div>
            </div>
          </motion.div>

          {/* 나무 현황 요약 (잎사귀 + 열매) */}
          <div className="grid grid-cols-2 gap-4">
            {/* 잎사귀 - 편지 수 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-border/60 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">잎사귀</p>
                  <p className="text-xs text-muted-foreground">편지</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {selectedTree.totalLetters}
                <span className="text-lg text-muted-foreground ml-1">장</span>
              </p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-muted-foreground">
                  보낸 <span className="text-foreground font-medium">{selectedTree.sentLetters}</span>
                </span>
                <span className="text-muted-foreground">
                  받은 <span className="text-foreground font-medium">{selectedTree.receivedLetters}</span>
                </span>
              </div>
            </motion.div>

            {/* 열매 - 소중한 날들 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border/60 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange-500">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 5V3" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M10 5c-1.5 0-3-1-3.5-2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">열매</p>
                  <p className="text-xs text-muted-foreground">소중한 날들</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {allTreeSpecialDays.length}
                <span className="text-lg text-muted-foreground ml-1">개</span>
              </p>
              <p className="text-sm text-muted-foreground mt-3">등록된 날짜</p>
            </motion.div>
          </div>

          {/* 소중한 날들 (열매 목록) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-orange-500">
                      <circle cx="12" cy="13" r="8" />
                      <path d="M12 5V3" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M10 5c-1.5 0-3-1-3.5-2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">소중한 날들</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      중요한 날짜를 등록하면 <strong className="text-orange-600">미리 알림</strong>을 받을 수 있어요
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => setShowAddDayModal(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  새 날짜 추가
                </Button>
              </div>
            </div>
            
            {/* 가까운 순 3개만 표시 */}
            <div className="divide-y divide-border/40">
              {treeSpecialDays.length > 0 ? (
                treeSpecialDays.map((day, index) => {
                  const daysRemaining = getDaysRemaining(day.date);
                  const isUrgent = daysRemaining <= 7 && daysRemaining > 0;
                  const isPast = daysRemaining < 0;
                  
                  return (
                    <motion.div
                      key={day.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 hover:bg-muted/30 transition-colors cursor-pointer flex items-center gap-4"
                      onClick={() => handleDayClick(day)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                        {getSpecialDayIcon(day.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{day.title}</p>
                          {day.type === "release" && (
                            <span className="bg-orange-100 text-orange-600 text-[10px] font-medium px-1.5 py-0.5 rounded">중요</span>
                          )}
                          {day.isGolden && (
                            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-medium px-1.5 py-0.5 rounded">🍊 골든</span>
                          )}
                        </div>
                        {day.description && (
                          <p className="text-sm text-muted-foreground">{day.description}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${isUrgent ? 'text-red-500' : isPast ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {isPast ? `D+${Math.abs(daysRemaining)}` : daysRemaining === 0 ? 'D-Day' : `D-${daysRemaining}`}
                        </p>
                        <p className="text-xs text-muted-foreground">{getSpecialDayLabel(day.type)}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                  );
                })
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground text-sm">등록된 소중한 날이 없어요</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => setShowAddDayModal(true)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    첫 번째 날짜 추가하기
                  </Button>
                </div>
              )}
            </div>
            
            {/* 더보기 링크 */}
            {allTreeSpecialDays.length > 3 && (
              <div className="px-6 py-3 border-t border-border/40 text-center">
                <button className="text-sm text-primary hover:underline">
                  더보기 ({allTreeSpecialDays.length - 3}개 더)
                </button>
              </div>
            )}
          </motion.div>

          {/* 최근 활동 - 2개만 미리보기 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">최근 활동</h3>
              <button className="text-sm text-primary hover:underline">모두 보기</button>
            </div>
            <div className="divide-y divide-border/40">
              {recentActivities.slice(0, 2).map((activity) => {
                const activityIcon = getActivityIcon(activity.type);
                
                return (
                  <div key={activity.id} className="p-4 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center ${activityIcon.bg}`}>
                      {activityIcon.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {activity.type === "sent" ? "편지 발송" : "편지 수신"}
                        </span>
                        <span className="text-sm text-muted-foreground">{activity.personName}에게</span>
                        
                        {/* 우편 종류 아이콘들 */}
                        <div className="flex items-center gap-1 ml-2">
                          {activity.mailTypes?.map((type, idx) => {
                            const typeInfo = mailTypeIcons[type];
                            if (!typeInfo) return null;
                            return (
                              <div 
                                key={idx} 
                                className="w-5 h-5 rounded bg-muted flex items-center justify-center text-muted-foreground"
                                title={typeInfo.label}
                              >
                                {typeInfo.icon}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-foreground">{activity.date}</p>
                      <p className="text-xs text-green-600">{activity.status}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>

      {/* 모달들 */}
      <AddSpecialDayModal
        isOpen={showAddDayModal}
        onClose={() => setShowAddDayModal(false)}
        onAdd={(newDay) => {
          console.log("New special day added:", newDay);
          setShowAddDayModal(false);
        }}
      />

      {selectedDay && (
        <SpecialDayDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          specialDay={{
            id: parseInt(selectedDay.id.replace(/\D/g, '') || '0'),
            type: selectedDay.type,
            title: selectedDay.title,
            date: selectedDay.date,
            description: selectedDay.description || ""
          }}
          onWriteLetter={handleWriteLetterFromDetail}
        />
      )}
    </div>
  );
}