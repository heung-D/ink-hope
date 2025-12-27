import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TreeDeciduous, 
  Heart, 
  TrendingUp, 
  Calendar,
  ChevronRight,
  Sparkles,
  Mail,
  Bell
} from "lucide-react";
import { motion } from "framer-motion";

// 성장 단계 이미지들
import seedImg from "@/assets/emoticons/orange-seed-new.png";
import sproutImg from "@/assets/emoticons/orange-sprout-new.png";
import youngTreeImg from "@/assets/emoticons/orange-young-tree-new.png";
import fullTreeImg from "@/assets/emoticons/orange-full-tree-new.png";
import ripeImg from "@/assets/emoticons/orange-ripe-new.png";

export default function AboutOrangeTree() {
  const navigate = useNavigate();

  const stages = [
    { img: seedImg, name: "씨앗", letters: "0통" },
    { img: sproutImg, name: "새싹", letters: "5통" },
    { img: youngTreeImg, name: "어린나무", letters: "15통" },
    { img: fullTreeImg, name: "나무", letters: "30통" },
    { img: ripeImg, name: "열매나무", letters: "50통+" },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "편지로 자라는 나무",
      description: "편지를 주고받을수록 나무가 무럭무럭 자라요. 꾸준한 소통의 결과를 눈으로 확인할 수 있어요."
    },
    {
      icon: Calendar,
      title: "특별한 날 알림",
      description: "생일, 기념일 등 중요한 날짜를 등록하면 미리 알려드려요. 소중한 날을 놓치지 마세요."
    },
    {
      icon: Heart,
      title: "관계의 기록",
      description: "주고받은 편지 수와 활동 내역을 한눈에 볼 수 있어요. 우리의 소통 여정을 기록합니다."
    },
    {
      icon: Sparkles,
      title: "성취감과 동기부여",
      description: "나무가 자라는 것을 보며 꾸준히 연락하게 되는 동기가 생겨요."
    }
  ];

  return (
    <AppLayout>
      <Helmet>
        <title>오렌지 나무란? - Orange Mail</title>
        <meta
          name="description"
          content="편지를 주고받으며 함께 키우는 오렌지 나무 서비스를 소개합니다."
        />
        <link rel="canonical" href={`${window.location.origin}/about/orange-tree`} />
      </Helmet>

      <div className="h-full overflow-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-10">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="w-24 h-24 mx-auto">
              <img 
                src={fullTreeImg} 
                alt="오렌지 나무" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground">오렌지 나무</h1>
            <p className="text-lg text-muted-foreground">
              편지를 주고받으며 함께 키우는<br />
              우리만의 특별한 나무
            </p>
          </motion.div>

          {/* What is Orange Tree */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <TreeDeciduous className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">오렌지 나무가 뭐예요?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      오렌지 나무는 수감 중인 가족과의 <strong>소통을 시각화</strong>한 거예요. 
                      편지를 주고받을수록 작은 씨앗에서 시작해 열매가 주렁주렁 달린 나무로 자라요. 
                      함께 나무를 키우며 꾸준히 연락하는 즐거움을 느껴보세요.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Growth Stages */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">나무의 성장 단계</h2>
            <div className="bg-muted/30 rounded-xl p-6">
              <div className="flex items-end justify-between gap-2">
                {stages.map((stage, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <img 
                      src={stage.img} 
                      alt={stage.name} 
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{stage.name}</p>
                      <p className="text-xs text-muted-foreground">{stage.letters}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground text-center">
                  편지를 보내고 받을 때마다 나무가 조금씩 자라요 🌱
                </p>
              </div>
            </div>
          </motion.section>

          {/* Features */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">이런 기능이 있어요</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Special Days */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">특별한 날 관리</h2>
            <Card className="bg-card">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">중요한 날짜를 등록하세요</h3>
                    <p className="text-sm text-muted-foreground">생일, 기념일, 면회일 등을 등록하면 미리 알려드려요</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">🎂</span>
                    <span className="text-foreground">생일</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">💝</span>
                    <span className="text-foreground">결혼기념일</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">🏠</span>
                    <span className="text-foreground">출소예정일</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-lg">👨‍👩‍👧‍👦</span>
                    <span className="text-foreground">면회일</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <Button 
              size="lg" 
              className="flex-1 bg-orange-500 hover:bg-orange-600"
              onClick={() => navigate("/orange-tree")}
            >
              내 오렌지 나무 보기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/")}
            >
              <Mail className="w-4 h-4 mr-2" />
              편지 보내기
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
