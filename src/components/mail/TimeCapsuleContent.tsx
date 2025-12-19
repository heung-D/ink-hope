import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Mail, Plus, ChevronRight, Heart, Calendar, Share2, Lock, Unlock, Sparkles, X, Check, Send, Copy, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import orangeCharacter from "@/assets/emoticons/orange-character.gif";
import orangeSeed from "@/assets/emoticons/orange-seed.png";
import orangeSprout from "@/assets/emoticons/orange-sprout.png";
import orangeYoungTree from "@/assets/emoticons/orange-young-tree.png";
import orangeFullTree from "@/assets/emoticons/orange-full-tree.png";
import orangeRipe from "@/assets/emoticons/orange-ripe.png";
import timeCapsuleGif from "@/assets/emoticons/time-capsule.gif";
import { toast } from "sonner";
interface TimeCapsuleContentProps {
  onClose: () => void;
}

// 목업 데이터: 타임캡슐 목록
const mockCapsules = [
  {
    id: 1,
    title: "아버지 출소 축하 편지 모음",
    recipient: "아버지 (홍길동)",
    recipientFacility: "서울구치소",
    targetDate: "2025-06-15",
    status: "collecting", // collecting, sealed, opened
    contributors: [
      { id: 1, name: "어머니", relation: "배우자", avatar: "👩", contributed: true, letterDate: "2025-01-02" },
      { id: 2, name: "나", relation: "자녀", avatar: "🧑", contributed: true, letterDate: "2025-01-05" },
      { id: 3, name: "여동생", relation: "자녀", avatar: "👧", contributed: false, letterDate: null },
      { id: 4, name: "할머니", relation: "부모", avatar: "👵", contributed: true, letterDate: "2024-12-28" },
      { id: 5, name: "삼촌", relation: "형제", avatar: "👨", contributed: false, letterDate: null },
    ],
    letterCount: 3,
    targetLetters: 5,
    daysLeft: 178,
    description: "아버지의 출소를 축하하며 가족 모두가 마음을 담아 편지를 모으고 있어요. 출소 당일 전달됩니다.",
  },
  {
    id: 2,
    title: "엄마 면회 때 전할 응원 메시지",
    recipient: "어머니 (김영희)",
    recipientFacility: "청주여자교도소",
    targetDate: "2025-01-20",
    status: "collecting",
    contributors: [
      { id: 1, name: "아버지", relation: "배우자", avatar: "👨", contributed: true, letterDate: "2025-01-10" },
      { id: 2, name: "큰딸", relation: "자녀", avatar: "👩", contributed: true, letterDate: "2025-01-12" },
      { id: 3, name: "작은딸", relation: "자녀", avatar: "👧", contributed: false, letterDate: null },
    ],
    letterCount: 2,
    targetLetters: 3,
    daysLeft: 32,
    description: "면회 때 전할 가족들의 응원 메시지를 모으고 있어요.",
  },
  {
    id: 3,
    title: "오빠 가석방 축하",
    recipient: "오빠 (박민수)",
    recipientFacility: "의정부교도소",
    targetDate: "2024-12-20",
    status: "opened",
    contributors: [
      { id: 1, name: "부모님", relation: "부모", avatar: "👨‍👩‍👧", contributed: true, letterDate: "2024-12-01" },
      { id: 2, name: "나", relation: "동생", avatar: "👧", contributed: true, letterDate: "2024-12-05" },
      { id: 3, name: "여자친구", relation: "연인", avatar: "💑", contributed: true, letterDate: "2024-12-10" },
    ],
    letterCount: 3,
    targetLetters: 3,
    daysLeft: 0,
    description: "오빠의 가석방을 축하하며 모은 편지들이에요. 사회에서 새 출발을 응원해요!",
  },
];

const capsuleTypes = [
  { id: "release", label: "출소 축하", icon: "🏠", description: "출소를 축하하는 편지 모음" },
  { id: "parole", label: "가석방 축하", icon: "⚖️", description: "가석방을 축하하는 편지 모음" },
  { id: "birthday", label: "생일 축하", icon: "🎂", description: "수감 중 생일을 축하하는 편지" },
  { id: "encouragement", label: "응원 메시지", icon: "💪", description: "힘내라는 응원의 메시지" },
  { id: "anniversary", label: "기념일", icon: "💝", description: "특별한 기념일을 위한 편지" },
];

export function TimeCapsuleContent({ onClose }: TimeCapsuleContentProps) {
  const [selectedCapsule, setSelectedCapsule] = useState<typeof mockCapsules[0] | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const collectingCapsules = mockCapsules.filter(c => c.status === "collecting");
  const completedCapsules = mockCapsules.filter(c => c.status === "sealed" || c.status === "opened");

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-purple-50/50 to-pink-50/30">
      {/* Header */}
      <header className="h-14 border-b border-border/40 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-purple-600" />
          <h1 className="text-lg font-semibold text-foreground">타임캡슐</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowCreateModal(true)} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="w-4 h-4 mr-1" />
            새 타임캡슐 만들기
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            편지함으로 돌아가기
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 안내 배너 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200/50"
          >
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center p-2 shrink-0">
                <img src={timeCapsuleGif} alt="타임캡슐" className="w-20 h-20 object-contain" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">타임캡슐이란?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  수감 중인 가족을 위해 여러 사람이 함께 편지를 모아 특별한 날에 전달하는 서비스예요.<br />
                  <strong>출소일, 가석방일, 생일, 기념일</strong> 등 특별한 순간에 모은 마음을 한꺼번에 전해보세요.
                </p>
                <div className="flex gap-2 mt-3">
                  {capsuleTypes.slice(0, 4).map((type) => (
                    <span key={type.id} className="bg-white/60 text-xs px-2 py-1 rounded-full">
                      {type.icon} {type.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 모집 중인 타임캡슐 */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                모집 중인 타임캡슐
              </h2>
              <span className="text-sm text-muted-foreground">{collectingCapsules.length}개</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collectingCapsules.map((capsule, index) => (
                <motion.div
                  key={capsule.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCapsule(capsule)}
                  className="bg-white rounded-2xl border border-border/60 shadow-sm p-5 cursor-pointer hover:shadow-md transition-all hover:border-purple-200"
                >
                  {/* 헤더 */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{capsule.title}</h3>
                        <p className="text-xs text-muted-foreground">To. {capsule.recipient}</p>
                        <p className="text-[10px] text-muted-foreground">{capsule.recipientFacility}</p>
                      </div>
                    </div>
                    <div className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      D-{capsule.daysLeft}
                    </div>
                  </div>

                  {/* 설명 */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{capsule.description}</p>

                  {/* 진행률 */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">편지 모음 현황</span>
                      <span className="font-medium text-foreground">{capsule.letterCount}/{capsule.targetLetters}통</span>
                    </div>
                    <Progress value={(capsule.letterCount / capsule.targetLetters) * 100} className="h-2" />
                  </div>

                  {/* 참여자 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div className="flex -space-x-2">
                        {capsule.contributors.slice(0, 4).map((contributor) => (
                          <div
                            key={contributor.id}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white ${
                              contributor.contributed ? "bg-green-100" : "bg-gray-100"
                            }`}
                            title={`${contributor.name} ${contributor.contributed ? "(참여완료)" : "(대기중)"}`}
                          >
                            {contributor.avatar}
                          </div>
                        ))}
                        {capsule.contributors.length > 4 && (
                          <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-white">
                            +{capsule.contributors.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700">
                      참여하기
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}

              {/* 새 타임캡슐 만들기 카드 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: collectingCapsules.length * 0.1 }}
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-dashed border-purple-200 p-5 cursor-pointer hover:border-purple-300 transition-all flex flex-col items-center justify-center min-h-[240px]"
              >
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6 text-purple-600" />
                </div>
                <p className="font-medium text-foreground mb-1">새 타임캡슐 만들기</p>
                <p className="text-sm text-muted-foreground text-center">
                  특별한 날을 위해<br />편지를 모아보세요
                </p>
              </motion.div>
            </div>
          </section>

          {/* 완료된 타임캡슐 */}
          {completedCapsules.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  전달 완료
                </h2>
                <span className="text-sm text-muted-foreground">{completedCapsules.length}개</span>
              </div>
              
              <div className="space-y-3">
                {completedCapsules.map((capsule, index) => (
                  <motion.div
                    key={capsule.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl border border-border/60 p-4 flex items-center gap-4 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                      {capsule.status === "opened" ? (
                        <Unlock className="w-5 h-5 text-pink-600" />
                      ) : (
                        <Lock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{capsule.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {capsule.targetDate} · {capsule.letterCount}통의 편지
                      </p>
                    </div>
                    <div className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      capsule.status === "opened" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {capsule.status === "opened" ? "열람완료" : "봉인중"}
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* 초대받은 타임캡슐 섹션 */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-500" />
                초대받은 타임캡슐
              </h2>
            </div>
            
            <div className="bg-white rounded-2xl border border-border/60 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-4">아직 초대받은 타임캡슐이 없어요</p>
              <div className="flex items-center justify-center gap-2">
                <Input 
                  placeholder="초대 코드 입력" 
                  className="max-w-[200px]"
                />
                <Button variant="outline">참여하기</Button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 새 타임캡슐 만들기 모달 */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreateModal(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-lg font-semibold mb-4">새 타임캡슐 만들기</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">타임캡슐 종류</label>
                  <div className="grid grid-cols-2 gap-2">
                    {capsuleTypes.map((type) => (
                      <button
                        key={type.id}
                        className="p-3 border border-border rounded-xl text-left hover:border-purple-300 hover:bg-purple-50 transition-all"
                      >
                        <span className="text-xl mr-2">{type.icon}</span>
                        <span className="text-sm font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">타임캡슐 이름</label>
                  <Input placeholder="예: 아버지 출소 축하 편지 모음" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">받는 사람 (수감자)</label>
                  <Input placeholder="예: 홍길동 (아버지)" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">수감 시설</label>
                  <Input placeholder="예: 서울구치소" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">전달 예정일</label>
                  <Input type="date" />
                  <p className="text-xs text-muted-foreground mt-1">출소일, 가석방일, 생일 등</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">목표 편지 수</label>
                  <Input type="number" placeholder="5" defaultValue={5} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">참여자 초대</label>
                  <p className="text-xs text-muted-foreground mb-2">편지를 함께 모을 가족/지인의 이메일 또는 전화번호</p>
                  <Input placeholder="예: mother@email.com, 010-1234-5678" />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  취소
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  타임캡슐 만들기
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 타임캡슐 상세 모달 */}
      <AnimatePresence>
        {selectedCapsule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCapsule(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
              {/* 수신자 정보 헤더 - 오렌지 그라데이션 */}
              <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 p-6 text-white relative">
                <button 
                  onClick={() => setSelectedCapsule(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {/* 오렌지 캐릭터 아바타 */}
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center p-2">
                      <img src={orangeCharacter} alt="오렌지 캐릭터" className="w-16 h-16 object-contain" />
                    </div>
                    <div>
                      <p className="text-orange-100 text-sm">수신자 정보</p>
                      <h2 className="text-2xl font-bold">{selectedCapsule.recipient.split(" (")[0]}</h2>
                      <p className="text-white/80 text-sm">{selectedCapsule.recipientFacility} · 2024-1234</p>
                    </div>
                  </div>
                  
                  {/* D-Day 카운터 */}
                  <div className="bg-white/20 rounded-xl px-4 py-3 text-center backdrop-blur-sm">
                    <p className="text-xs text-orange-100">출소까지</p>
                    <p className="text-3xl font-bold">D-{selectedCapsule.daysLeft}</p>
                    <p className="text-xs text-orange-100">{selectedCapsule.targetDate}</p>
                  </div>
                </div>
                
                {/* 하단 정보 */}
                <div className="flex gap-6 mt-4 text-sm">
                  <div>
                    <span className="text-orange-200">복역 기간</span>{" "}
                    <span className="font-semibold">280일</span>
                  </div>
                  <div>
                    <span className="text-orange-200">입소일</span>{" "}
                    <span className="font-semibold">2024-03-15</span>
                  </div>
                </div>
              </div>

              {/* 콘텐츠 영역 */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-orange-50/30 to-white">
                {/* 오렌지 나무 성장 카드 */}
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
                  <div className="flex gap-6">
                    {/* 현재 성장 단계 이미지 */}
                    <div className="relative shrink-0">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-b from-orange-50 to-amber-50 border border-orange-100 flex items-center justify-center p-3">
                        <img 
                          src={orangeYoungTree} 
                          alt="어린나무" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Lv.3
                      </div>
                    </div>
                    
                    {/* 성장 정보 */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-foreground">어린나무</h3>
                        <span className="text-muted-foreground">→</span>
                        <span className="text-sm text-muted-foreground">나무까지 7통 남음</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        편지를 주고받을수록 나무가 성장해요! 가족의 사랑으로 무럭무럭 자라나고 있어요.
                      </p>
                      
                      {/* 성장 진행률 */}
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">성장 진행률</span>
                          <span className="text-orange-600 font-semibold">53%</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                            style={{ width: '53%' }}
                          />
                        </div>
                      </div>
                      
                      {/* 성장 단계 시각화 */}
                      <div className="flex items-center gap-1">
                        {[
                          { img: orangeSeed, name: "씨앗", level: 1, completed: true },
                          { img: orangeSprout, name: "새싹", level: 2, completed: true },
                          { img: orangeYoungTree, name: "어린나무", level: 3, completed: true },
                          { img: orangeFullTree, name: "나무", level: 4, completed: false },
                          { img: orangeRipe, name: "열매", level: 5, completed: false },
                        ].map((stage, index, arr) => (
                          <div key={stage.level} className="flex items-center">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center p-1.5 border-2 transition-all ${
                                stage.completed 
                                  ? "border-orange-400 bg-orange-50" 
                                  : "border-gray-200 bg-gray-50 opacity-50"
                              }`}
                            >
                              <img src={stage.img} alt={stage.name} className="w-full h-full object-contain" />
                            </div>
                            {index < arr.length - 1 && (
                              <div className={`w-6 h-0.5 ${stage.completed ? "bg-orange-300" : "bg-gray-200"}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 참여자 현황 */}
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      참여자 현황 ({selectedCapsule.letterCount}/{selectedCapsule.targetLetters}명 참여)
                    </h3>
                    <Button variant="outline" size="sm" className="text-orange-600 border-orange-200 hover:bg-orange-50" onClick={() => {
                      navigator.clipboard.writeText("CAPSULE-" + selectedCapsule.id);
                      toast.success("초대 코드가 복사되었습니다!");
                    }}>
                      <Copy className="w-3 h-3 mr-1" />
                      초대 코드 복사
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCapsule.contributors.map((contributor) => (
                      <div 
                        key={contributor.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border ${
                          contributor.contributed 
                            ? "bg-green-50 border-green-200" 
                            : "bg-gray-50 border-gray-200"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                          contributor.contributed ? "bg-green-100" : "bg-gray-100"
                        }`}>
                          {contributor.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">{contributor.name}</p>
                          <p className="text-xs text-muted-foreground">{contributor.relation}</p>
                        </div>
                        {contributor.contributed ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">대기</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 내 편지 작성 영역 */}
                <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-5">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <PenLine className="w-4 h-4 text-orange-600" />
                    내 편지 작성하기
                  </h3>
                  <Textarea 
                    placeholder="마음을 담아 편지를 작성해주세요..."
                    className="min-h-[100px] resize-none border-orange-100 focus:border-orange-300"
                  />
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50">
                      임시저장
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                      <Send className="w-4 h-4 mr-1" />
                      편지 제출하기
                    </Button>
                  </div>
                </div>
              </div>

              {/* 푸터 */}
              <div className="border-t border-orange-100 p-4 bg-orange-50/50 flex justify-between items-center">
                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setSelectedCapsule(null)}>
                  닫기
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  <Share2 className="w-4 h-4 mr-1" />
                  가족에게 공유하기
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
