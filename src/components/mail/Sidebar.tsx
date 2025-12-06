import { Mail, Send, FileText, Settings, Plus, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FamilyMember, FolderType } from "@/types/mail";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  familyMembers: FamilyMember[];
  activeFolder: FolderType;
  onFolderChange: (folder: FolderType) => void;
  unreadCount: number;
  draftCount: number;
  onCompose: () => void;
}

const folders = [
  { id: "inbox" as FolderType, label: "받은편지함", icon: Mail },
  { id: "sent" as FolderType, label: "보낸편지함", icon: Send },
  { id: "draft" as FolderType, label: "임시보관함", icon: FileText },
];

export function Sidebar({
  familyMembers,
  activeFolder,
  onFolderChange,
  unreadCount,
  draftCount,
  onCompose,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-full">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <Mail className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight">
            Orange Mail
          </span>
        </div>
      </div>

      {/* Compose Button */}
      <div className="p-4">
        <Button
          onClick={onCompose}
          className="w-full h-12 rounded-xl text-[15px] font-semibold shadow-card hover:shadow-card-hover transition-all duration-200"
        >
          <PenLine className="w-4 h-4 mr-2" />
          편지 쓰기
        </Button>
      </div>

      {/* Folders */}
      <nav className="flex-1 px-3 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
          {folders.map((folder) => {
            const Icon = folder.icon;
            const isActive = activeFolder === folder.id;
            const count = folder.id === "inbox" ? unreadCount : folder.id === "draft" ? draftCount : 0;

            return (
              <li key={folder.id}>
                <button
                  onClick={() => onFolderChange(folder.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] transition-all duration-150",
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"
                  )}
                >
                  <Icon className="w-[18px] h-[18px]" />
                  <span>{folder.label}</span>
                  {count > 0 && (
                    <span
                      className={cn(
                        "ml-auto text-xs font-semibold px-2 py-0.5 rounded-full",
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
        <div className="my-4 border-t border-border" />

        {/* Family Members */}
        <div className="mb-2 px-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            내 가족
          </span>
          <button className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <ul className="space-y-0.5">
          {familyMembers.map((member) => (
            <li key={member.id}>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium",
                    member.color
                  )}
                >
                  {member.avatar}
                </div>
                <span className="text-sm flex-1 text-left">{member.name}</span>
                <span className="text-xs text-muted-foreground/60">
                  {member.relation}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm">
            B
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              Bang Kyung
            </p>
            <p className="text-xs text-muted-foreground truncate">
              webbreak@kakao...
            </p>
          </div>
          <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
