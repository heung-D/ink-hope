import { Mail, Send, FileText, Settings, ChevronDown, ChevronRight, Trash2, Plus, Folder, FolderOpen, Inbox, AlertCircle, TreeDeciduous, Clock, Image, CalendarDays, HelpCircle, MessageSquare, Gift, LogOut } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FamilyMember, FolderType } from "@/types/mail";
import { useAuth } from "@/hooks/useAuth";
import orangeCharacter from "@/assets/emoticons/orange-character.gif";

interface MobileSidebarProps {
  familyMembers: FamilyMember[];
  activeFolder: FolderType | null;
  onFolderChange: (folder: FolderType) => void;
  unreadCount: number;
  draftCount: number;
  archiveCount: number;
  trashCount: number;
  selectedMemberId: string | null;
  onSelectMember: (memberId: string | null) => void;
  onHandwrittenUpload?: () => void;
}

// 상단 폴더
const foldersTop = [
  { id: "inbox" as FolderType, label: "받은 편지함", icon: Mail },
  { id: "sent" as FolderType, label: "보낸 편지함", icon: Send },
  { id: "draft" as FolderType, label: "임시보관함", icon: FileText },
  { id: "gallery" as FolderType, label: "갤러리", icon: Image },
  { id: "schedule" as FolderType, label: "스케줄 관리", icon: CalendarDays },
];

// 하단 폴더
const foldersBottom = [
  { id: "spam" as FolderType, label: "스팸함", icon: AlertCircle },
  { id: "trash" as FolderType, label: "휴지통", icon: Trash2 },
  { id: "orangetree" as FolderType, label: "오렌지 나무", icon: TreeDeciduous },
  { id: "timecapsule" as FolderType, label: "타임캡슐", icon: Clock },
];

// 고객 지원 메뉴
const supportMenus = [
  { id: "faq" as FolderType, label: "자주 묻는 질문", icon: HelpCircle },
  { id: "feedback" as FolderType, label: "고객의 소리", icon: MessageSquare },
  { id: "rewards" as FolderType, label: "내가 받은 경품", icon: Gift },
];

export function MobileSidebar({
  familyMembers,
  activeFolder,
  onFolderChange,
  unreadCount,
  draftCount,
  archiveCount,
  trashCount,
  selectedMemberId,
  onSelectMember,
  onHandwrittenUpload,
}: MobileSidebarProps) {
  const [isTreeExpanded, setIsTreeExpanded] = useState(true);
  const [isFolderExpanded, setIsFolderExpanded] = useState(true);
  const { signOut } = useAuth();

  return (
    <div className="flex flex-col h-full bg-card overflow-hidden">
      {/* Profile Section */}
      <div className="px-4 py-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-0.5">
              <div className="w-full h-full rounded-full bg-orange-50 flex items-center justify-center overflow-hidden">
                <img src={orangeCharacter} alt="프로필" className="w-9 h-9 object-contain" />
              </div>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Bang Kyung Chang</p>
            <p className="text-xs text-muted-foreground truncate">webbreak@kakao...</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3">
          <button 
            onClick={() => onFolderChange("inbox")}
            className="flex-1 bg-muted/50 rounded-xl py-2.5 px-2 hover:bg-muted transition-colors text-center"
          >
            <Mail className="w-4 h-4 mx-auto mb-1 text-primary" />
            <p className="text-[10px] text-muted-foreground">새로운편지</p>
          </button>
          <button 
            onClick={onHandwrittenUpload}
            className="flex-1 bg-muted/50 rounded-xl py-2.5 px-2 hover:bg-muted transition-colors text-center"
          >
            <Plus className="w-4 h-4 mx-auto mb-1 text-primary" />
            <p className="text-[10px] text-muted-foreground">손편지 담기</p>
          </button>
        </div>
      </div>

      {/* Folders */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        {/* 전체 편지함 */}
        <div className="flex items-center justify-between px-2 py-2">
          <button
            onClick={() => setIsFolderExpanded(!isFolderExpanded)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isFolderExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
            <span className="text-sm font-medium">전체 편지함</span>
          </button>
        </div>
        
        {isFolderExpanded && (
          <ul className="space-y-1">
            {foldersTop.map((folder) => {
              const Icon = folder.icon;
              const isActive = activeFolder === folder.id;
              const count = folder.id === "inbox" ? unreadCount : folder.id === "draft" ? draftCount : 0;

              return (
                <li key={folder.id}>
                  <button
                    onClick={() => onFolderChange(folder.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted/60"
                    )}
                  >
                    <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-primary")} />
                    <span className="flex-1 text-left">{folder.label}</span>
                    {count > 0 && (
                      <span
                        className={cn(
                          "min-w-5 h-5 text-[10px] font-semibold rounded-full tabular-nums flex items-center justify-center",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* 내 편지함 */}
        <div className="flex items-center justify-between px-2 py-2 mt-2">
          <button
            onClick={() => setIsTreeExpanded(!isTreeExpanded)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isTreeExpanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
            <span className="text-sm font-medium">내 편지함</span>
          </button>
          <button
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {isTreeExpanded && (
          <ul className="space-y-1">
            {familyMembers.map((member) => {
              const isSelected = selectedMemberId === member.id;
              const mailCount = Math.floor(Math.random() * 10);
              return (
                <li key={member.id}>
                  <button 
                    onClick={() => onSelectMember(isSelected ? null : member.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-secondary"
                    )}
                  >
                    {isSelected ? (
                      <FolderOpen className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Folder className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm flex-1 text-left truncate">{member.name}</span>
                    <span className="text-xs text-muted-foreground">{mailCount}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Divider */}
        <div className="my-3 mx-2 border-t border-border/60" />

        {/* 하단 폴더들 */}
        <ul className="space-y-1">
          {foldersBottom.map((folder) => {
            const Icon = folder.icon;
            const isActive = activeFolder === folder.id;
            const count = folder.id === "trash" ? trashCount : 0;

            return (
              <li key={folder.id}>
                <button
                  onClick={() => onFolderChange(folder.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted/60"
                  )}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-primary")} />
                  <span className="flex-1 text-left">{folder.label}</span>
                  {count > 0 && (
                    <span
                      className={cn(
                        "min-w-5 h-5 text-[10px] font-semibold rounded-full tabular-nums flex items-center justify-center",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Divider */}
        <div className="my-3 mx-2 border-t border-border/60" />

        {/* 고객 지원 */}
        <ul className="space-y-1">
          {supportMenus.map((menu) => {
            const Icon = menu.icon;
            const isActive = activeFolder === menu.id;

            return (
              <li key={menu.id}>
                <button
                  onClick={() => onFolderChange(menu.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-muted/60"
                  )}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-primary")} />
                  <span className="flex-1 text-left">{menu.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-3 border-t border-border/40">
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
