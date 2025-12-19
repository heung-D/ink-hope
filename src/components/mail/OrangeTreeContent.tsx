import { motion } from "framer-motion";
import { TreeDeciduous, Leaf, Apple, Calendar, MessageSquare, TrendingUp, Clock, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import orangeSeed from "@/assets/emoticons/orange-seed.png";
import orangeSprout from "@/assets/emoticons/orange-sprout.png";
import orangeYoungTree from "@/assets/emoticons/orange-young-tree.png";
import orangeFullTree from "@/assets/emoticons/orange-full-tree.png";
import orangeRipe from "@/assets/emoticons/orange-ripe.png";

interface OrangeTreeContentProps {
  onClose: () => void;
}

// 성장 단계 정의
const growthStages = [
  { id: 1, name: "씨앗", minLetters: 0, icon: orangeSeed },
  { id: 2, name: "새싹", minLetters: 5, icon: orangeSprout },
  { id: 3, name: "어린나무", minLetters: 15, icon: orangeYoungTree },
  { id: 4, name: "나무", minLetters: 30, icon: orangeFullTree },
  { id: 5, name: "열매나무", minLetters: 50, icon: orangeRipe },
];

// 목업 데이터
const mockData = {
  totalLetters: 23,
  sentLetters: 12,
  receivedLetters: 11,
  currentGrowthLevel: 3,
  growthProgress: 53, // 현재 레벨에서의 진행률
  fruits: [
    { id: 1, type: "timeline", title: "출소 예정일", date: "2025-06-15", description: "D-178" },
    { id: 2, type: "lawyer", title: "변호사 상담", date: "2025-01-10", description: "항소심 관련 상담 예정" },
    { id: 3, type: "event", title: "가족 면회", date: "2025-01-05", description: "어머니, 아버지 면회" },
  ],
  recentActivity: [
    { id: 1, action: "편지 발송", target: "아버지에게", date: "2025-01-02" },
    { id: 2, action: "편지 수신", target: "어머니로부터", date: "2024-12-28" },
    { id: 3, action: "일정 등록", target: "변호사 상담", date: "2024-12-25" },
  ],
};

export function OrangeTreeContent({ onClose }: OrangeTreeContentProps) {
  const currentStage = growthStages[mockData.currentGrowthLevel - 1];
  const nextStage = growthStages[mockData.currentGrowthLevel];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-orange-50/50 to-amber-50/30">
      {/* Header */}
      <header className="h-14 border-b border-border/40 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <TreeDeciduous className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">오렌지나무</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          편지함으로 돌아가기
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* 나무 성장 현황 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-6">
                {/* 나무 이미지 */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
                    <motion.img 
                      src={currentStage.icon} 
                      alt={currentStage.name}
                      className="w-24 h-24 object-contain"
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                    Lv.{mockData.currentGrowthLevel}
                  </div>
                </div>

                {/* 성장 정보 */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xl font-bold text-foreground">{currentStage.name}</h2>
                    {nextStage && (
                      <span className="text-sm text-muted-foreground">
                        → {nextStage.name}까지 {nextStage.minLetters - mockData.totalLetters}통 남음
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    편지를 주고받을수록 나무가 성장해요!
                  </p>

                  {/* 진행률 바 */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">성장 진행률</span>
                      <span className="font-medium text-primary">{mockData.growthProgress}%</span>
                    </div>
                    <Progress value={mockData.growthProgress} className="h-3" />
                  </div>

                  {/* 성장 단계 표시 */}
                  <div className="flex items-center gap-2 mt-4">
                    {growthStages.map((stage, index) => (
                      <div key={stage.id} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index < mockData.currentGrowthLevel 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          <img src={stage.icon} alt={stage.name} className="w-5 h-5 object-contain" />
                        </div>
                        {index < growthStages.length - 1 && (
                          <div className={`w-6 h-0.5 ${
                            index < mockData.currentGrowthLevel - 1 ? "bg-primary" : "bg-muted"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 통계 카드 그리드 */}
          <div className="grid grid-cols-3 gap-4">
            {/* 잎사귀 - 편지 개수 */}
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
                  <p className="text-sm text-muted-foreground">잎사귀</p>
                  <p className="text-xs text-muted-foreground">총 편지 개수</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{mockData.totalLetters}<span className="text-lg text-muted-foreground ml-1">통</span></p>
              <div className="flex gap-4 mt-3 text-sm">
                <span className="text-muted-foreground">보낸 편지 <span className="text-foreground font-medium">{mockData.sentLetters}</span></span>
                <span className="text-muted-foreground">받은 편지 <span className="text-foreground font-medium">{mockData.receivedLetters}</span></span>
              </div>
            </motion.div>

            {/* 열매 - 일정/이벤트 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl border border-border/60 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Apple className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">열매</p>
                  <p className="text-xs text-muted-foreground">등록된 일정</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">{mockData.fruits.length}<span className="text-lg text-muted-foreground ml-1">개</span></p>
              <Button variant="ghost" size="sm" className="mt-2 text-primary hover:text-primary/80 -ml-2">
                <Plus className="w-4 h-4 mr-1" />
                일정 추가하기
              </Button>
            </motion.div>

            {/* 성장 트렌드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl border border-border/60 shadow-sm p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">성장 속도</p>
                  <p className="text-xs text-muted-foreground">이번 달</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-foreground">+5<span className="text-lg text-muted-foreground ml-1">통</span></p>
              <p className="text-sm text-green-600 mt-2">▲ 지난달 대비 25% 증가</p>
            </motion.div>
          </div>

          {/* 열매 (타임라인 일정) 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-orange-500" />
                <h3 className="font-semibold text-foreground">열매 (타임라인 일정)</h3>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                일정 추가
              </Button>
            </div>
            <div className="divide-y divide-border/40">
              {mockData.fruits.map((fruit, index) => (
                <motion.div
                  key={fruit.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 hover:bg-muted/30 transition-colors cursor-pointer flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    fruit.type === "timeline" ? "bg-purple-100" :
                    fruit.type === "lawyer" ? "bg-blue-100" : "bg-amber-100"
                  }`}>
                    {fruit.type === "timeline" ? <Clock className="w-5 h-5 text-purple-600" /> :
                     fruit.type === "lawyer" ? <MessageSquare className="w-5 h-5 text-blue-600" /> :
                     <Calendar className="w-5 h-5 text-amber-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{fruit.title}</p>
                    <p className="text-sm text-muted-foreground">{fruit.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{fruit.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {fruit.type === "timeline" ? "출소일정" : 
                       fruit.type === "lawyer" ? "변호사" : "면회"}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 최근 활동 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border/40">
              <h3 className="font-semibold text-foreground">최근 활동</h3>
            </div>
            <div className="divide-y divide-border/40">
              {mockData.recentActivity.map((activity, index) => (
                <div key={activity.id} className="p-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <span className="text-sm text-foreground">{activity.action}</span>
                    <span className="text-sm text-muted-foreground ml-1">{activity.target}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
