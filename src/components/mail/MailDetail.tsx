import { Reply, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Mail } from "@/types/mail";

interface MailDetailProps {
  mail: Mail | null;
  onReply: () => void;
}

export function MailDetail({ mail, onReply }: MailDetailProps) {
  if (!mail) {
    return (
      <div className="flex-1 bg-secondary/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-muted-foreground text-sm">
            읽을 편지를 선택해주세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-secondary/30 overflow-y-auto scrollbar-thin">
      <div className="max-w-2xl mx-auto p-8">
        {/* Mail Header */}
        <div className="bg-card rounded-2xl shadow-card p-6 mb-4 animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-lg ${mail.sender.color}`}
              >
                {mail.sender.avatar}
              </div>
              <div>
                <h2 className="font-semibold text-foreground text-lg">
                  {mail.sender.name}
                  <span className="text-sm font-normal text-muted-foreground ml-2">
                    {mail.sender.relation}
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mail.sender.facility} · 2024년 12월 4일 도착
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                <Reply className="w-5 h-5" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
          <h3 className="text-xl font-medium text-foreground">{mail.subject}</h3>
        </div>

        {/* Mail Content */}
        <div className="bg-card rounded-2xl shadow-card p-8 animate-fade-in animation-delay-100">
          <div className="prose prose-gray max-w-none">
            {mail.content.split("\n\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-foreground/90 leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Reply Button */}
        <div className="mt-8 flex justify-center animate-fade-in animation-delay-200">
          <Button
            onClick={onReply}
            size="lg"
            className="h-12 px-8 rounded-xl text-[15px] font-semibold shadow-card hover:shadow-card-hover transition-all duration-200"
          >
            <Reply className="w-5 h-5 mr-2" />
            답장하기
          </Button>
        </div>
      </div>
    </div>
  );
}
