import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, 
  Users, 
  Heart, 
  Gift, 
  ChevronRight,
  Sparkles,
  Calendar,
  Mail
} from "lucide-react";
import { motion } from "framer-motion";
import timeCapsuleGif from "@/assets/emoticons/time-capsule.gif";

export default function AboutTimeCapsule() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "여러 사람의 마음을 모아",
      description: "가족, 친구들이 함께 참여하여 한 사람에게 전할 메시지를 모을 수 있어요."
    },
    {
      icon: Calendar,
      title: "특별한 날에 전달",
      description: "생일, 출소일 등 의미있는 날짜에 맞춰 편지가 전달됩니다."
    },
    {
      icon: Heart,
      title: "깜짝 선물처럼",
      description: "받는 분은 타임캡슐이 열리는 날까지 내용을 알 수 없어요."
    },
    {
      icon: Sparkles,
      title: "소중한 추억으로",
      description: "모인 마음들이 하나의 특별한 선물이 되어 전해집니다."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "타임캡슐 만들기",
      description: "받는 분과 전달 날짜를 정해요"
    },
    {
      number: "2",
      title: "초대하기",
      description: "함께 할 가족, 친구를 초대해요"
    },
    {
      number: "3",
      title: "마음 담기",
      description: "각자 편지를 작성해 담아요"
    },
    {
      number: "4",
      title: "전달되는 날",
      description: "모인 편지가 한꺼번에 전달돼요"
    }
  ];

  return (
    <AppLayout>
      <Helmet>
        <title>타임캡슐이란? - Orange Mail</title>
        <meta
          name="description"
          content="여러 사람의 마음을 모아 특별한 날에 전하는 타임캡슐 서비스를 소개합니다."
        />
        <link rel="canonical" href={`${window.location.origin}/about/time-capsule`} />
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
                src={timeCapsuleGif} 
                alt="타임캡슐" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground">타임캡슐</h1>
            <p className="text-lg text-muted-foreground">
              여러 사람의 마음을 모아<br />
              특별한 날에 전하는 깜짝 선물
            </p>
          </motion.div>

          {/* What is Time Capsule */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">타임캡슐이 뭐예요?</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      타임캡슐은 수감 중인 가족에게 보내는 <strong>단체 편지</strong>예요. 
                      여러 가족과 친구들이 각자 편지를 작성하면, 지정한 날짜에 모든 편지가 
                      한꺼번에 전달됩니다. 생일이나 출소일 같은 특별한 날에 
                      깜짝 선물처럼 받아볼 수 있어요.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Features */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">이런 점이 특별해요</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-primary" />
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

          {/* How it works */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">이렇게 사용해요</h2>
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-border hidden sm:block" />
              
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 relative z-10">
                      {step.number}
                    </div>
                    <div className="pt-2">
                      <h3 className="font-medium text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Use Cases */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold text-foreground">이럴 때 사용하면 좋아요</h2>
            <div className="bg-muted/50 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">🎂 생일에 가족 모두의 축하 메시지를 모아 보내고 싶을 때</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">🏠 출소일에 환영 메시지와 응원을 전하고 싶을 때</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">📅 기념일에 특별한 깜짝 선물을 준비하고 싶을 때</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">💝 멀리 떨어진 가족들이 마음을 모아 전하고 싶을 때</span>
              </div>
            </div>
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
              className="flex-1"
              onClick={() => navigate("/time-capsule")}
            >
              타임캡슐 시작하기
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/")}
            >
              <Mail className="w-4 h-4 mr-2" />
              일반 편지 보내기
            </Button>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
