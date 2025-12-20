import { Gift, Clock, Ticket, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface Prize {
  id: string;
  name: string;
  description: string;
  quantity: number;
  usedQuantity: number;
  expiryDate: string;
  type: "coupon" | "point" | "item";
  icon: string;
}

interface RewardsContentProps {
  onClose?: () => void;
}

// 목업 경품 데이터
const mockPrizes: Prize[] = [
  {
    id: "1",
    name: "우편특급 무료이용권",
    description: "편지 발송 시 우편특급 서비스를 무료로 이용할 수 있습니다.",
    quantity: 100,
    usedQuantity: 0,
    expiryDate: "2025-03-31",
    type: "coupon",
    icon: "🎫",
  },
];

export function RewardsContent({ onClose }: RewardsContentProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getDaysRemaining = (dateStr: string) => {
    const today = new Date();
    const expiry = new Date(dateStr);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-orange-50/50 to-amber-50/30 overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border/40 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Gift className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">내가 받은 경품</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          편지함으로 돌아가기
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* 이벤트 배너 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50/50 rounded-2xl p-5 mb-6 border border-orange-200/30"
        >
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-orange-500" />
            <Badge className="bg-orange-100 text-orange-600 text-xs border-0">이벤트 당첨</Badge>
          </div>
          <h2 className="text-lg font-bold text-foreground mb-1">
            축하합니다! 이벤트에 당첨되셨습니다
          </h2>
          <p className="text-sm text-muted-foreground">
            받은 경품을 확인하고, 유효기간 내에 사용해주세요.
          </p>
        </motion.div>

        {/* 경품 통계 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 border border-border/60 text-center">
            <p className="text-2xl font-bold text-primary">
              {mockPrizes.reduce((acc, p) => acc + p.quantity, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">총 경품 수</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/60 text-center">
            <p className="text-2xl font-bold text-green-500">
              {mockPrizes.reduce((acc, p) => acc + (p.quantity - p.usedQuantity), 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">사용 가능</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border/60 text-center">
            <p className="text-2xl font-bold text-muted-foreground">
              {mockPrizes.reduce((acc, p) => acc + p.usedQuantity, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">사용 완료</p>
          </div>
        </div>

        {/* 경품 목록 */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Ticket className="w-4 h-4 text-primary" />
            보유 경품 목록
          </h3>

          {mockPrizes.map((prize, index) => {
            const daysRemaining = getDaysRemaining(prize.expiryDate);
            const isExpiringSoon = daysRemaining <= 30;
            const remainingQuantity = prize.quantity - prize.usedQuantity;

            return (
              <motion.div
                key={prize.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border/60 overflow-hidden hover:border-primary/30 transition-colors"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-2xl flex-shrink-0">
                        {prize.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{prize.name}</h4>
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                            {remainingQuantity}개 보유
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {prize.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs">
                          <span className={`flex items-center gap-1 ${isExpiringSoon ? 'text-red-500' : 'text-muted-foreground'}`}>
                            <Clock className="w-3 h-3" />
                            유효기간: {formatDate(prize.expiryDate)}
                            {isExpiringSoon && ` (${daysRemaining}일 남음)`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0"
                      disabled={remainingQuantity === 0}
                    >
                      사용하기
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>

                {/* 사용 현황 바 */}
                <div className="px-4 pb-4">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all"
                      style={{ width: `${(remainingQuantity / prize.quantity) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                    <span>사용: {prize.usedQuantity}개</span>
                    <span>남은 수량: {remainingQuantity}개</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 안내 문구 */}
        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <h4 className="text-sm font-medium text-foreground mb-2">이용 안내</h4>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            <li>• 우편특급 무료이용권은 편지 발송 시 결제 단계에서 자동 적용됩니다.</li>
            <li>• 유효기간이 지난 경품은 사용이 불가합니다.</li>
            <li>• 경품은 양도 및 환불이 불가합니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
