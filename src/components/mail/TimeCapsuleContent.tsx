import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Mail, Plus, ChevronRight, Heart, Calendar, Share2, Lock, Unlock, Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import orangeRipe from "@/assets/emoticons/orange-ripe.png";

interface TimeCapsuleContentProps {
  onClose: () => void;
}

// 목업 데이터: 타임캡슐 목록
const mockCapsules = [
  {
    id: 1,
    title: "아버지 출소 축하 편지 모음",
    recipient: "아버지",
    targetDate: "2025-06-15",
    status: "collecting", // collecting, sealed, opened
    contributors: [
      { id: 1, name: "어머니", avatar: "👩", contributed: true },
      { id: 2, name: "나", avatar: "🧑", contributed: true },
      { id: 3, name: "동생", avatar: "👧", contributed: false },
      { id: 4, name: "할머니", avatar: "👵", contributed: true },
    ],
    letterCount: 3,
    targetLetters: 5,
    daysLeft: 178,
    description: "아버지의 출소를 축하하며 가족 모두가 마음을 담아 편지를 모으고 있어요.",
  },
  {
    id: 2,
    title: "2025년 새해 다짐",
    recipient: "미래의 나에게",
    targetDate: "2026-01-01",
    status: "collecting",
    contributors: [
      { id: 1, name: "나", avatar: "🧑", contributed: true },
    ],
    letterCount: 1,
    targetLetters: 1,
    daysLeft: 378,
    description: "1년 후의 나에게 보내는 편지",
  },
  {
    id: 3,
    title: "어머니 생신 축하",
    recipient: "어머니",
    targetDate: "2024-12-25",
    status: "opened",
    contributors: [
      { id: 1, name: "아버지", avatar: "👨", contributed: true },
      { id: 2, name: "나", avatar: "🧑", contributed: true },
      { id: 3, name: "동생", avatar: "👧", contributed: true },
    ],
    letterCount: 3,
    targetLetters: 3,
    daysLeft: 0,
    description: "어머니 생신을 축하하며 모은 편지들",
  },
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
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">타임캡슐이란?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  여러 사람이 함께 편지를 모아 특별한 날에 한 사람에게 전달하는 서비스예요.<br />
                  출소일, 생일, 기념일 등 특별한 순간에 모은 마음을 한꺼번에 전해보세요.
                </p>
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
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                        <img src={orangeRipe} alt="" className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{capsule.title}</h3>
                        <p className="text-xs text-muted-foreground">To. {capsule.recipient}</p>
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

      {/* 새 타임캡슐 만들기 모달 (간단한 placeholder) */}
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
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4">새 타임캡슐 만들기</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">타임캡슐 이름</label>
                  <Input placeholder="예: 아버지 출소 축하 편지" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">받는 사람</label>
                  <Input placeholder="예: 아버지" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">전달 예정일</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">목표 편지 수</label>
                  <Input type="number" placeholder="5" defaultValue={5} />
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  취소
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  만들기
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
