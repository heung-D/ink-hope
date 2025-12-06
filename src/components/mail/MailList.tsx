import { Search, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mail, FolderType } from "@/types/mail";

interface MailListProps {
  mails: Mail[];
  selectedMailId: string | null;
  onSelectMail: (mail: Mail) => void;
  activeFolder: FolderType;
}

const folderTitles: Record<FolderType, string> = {
  inbox: "받은편지함",
  sent: "보낸편지함",
  draft: "임시보관함",
};

export function MailList({
  mails,
  selectedMailId,
  onSelectMail,
  activeFolder,
}: MailListProps) {
  return (
    <div className="w-96 border-r border-border bg-card flex flex-col h-full">
      {/* Header */}
      <header className="h-16 border-b border-border/50 flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-foreground">
            {folderTitles[activeFolder]}
          </h1>
          <span className="text-sm text-muted-foreground">
            {mails.length}개의 편지
          </span>
        </div>
      </header>

      {/* Search */}
      <div className="px-4 py-3 border-b border-border/30">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="편지 검색..."
            className="w-full h-10 pl-10 pr-4 bg-secondary rounded-xl text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-ring focus:bg-card transition-all"
          />
        </div>
      </div>

      {/* Mail Items */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {mails.map((mail) => (
          <button
            key={mail.id}
            onClick={() => onSelectMail(mail)}
            className={cn(
              "w-full text-left px-5 py-4 border-b border-border/30 transition-all duration-150",
              selectedMailId === mail.id
                ? "bg-accent border-l-[3px] border-l-primary"
                : "hover:bg-secondary/50"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium flex-shrink-0 text-sm",
                  mail.sender.color
                )}
              >
                {mail.sender.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={cn(
                      "text-[15px]",
                      mail.isRead
                        ? "font-medium text-foreground/80"
                        : "font-semibold text-foreground"
                    )}
                  >
                    {mail.sender.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {mail.date}
                  </span>
                </div>
                <p
                  className={cn(
                    "text-sm mb-1 truncate",
                    mail.isRead
                      ? "text-muted-foreground"
                      : "text-foreground font-medium"
                  )}
                >
                  {mail.subject}
                </p>
                <p className="text-xs text-muted-foreground/80 truncate">
                  {mail.preview}
                </p>
              </div>
            </div>

            {/* Tags */}
            {(mail.isNew || mail.hasAttachments) && (
              <div className="mt-2.5 flex items-center gap-2">
                {mail.isNew && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-primary bg-accent px-2 py-0.5 rounded-full font-medium">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    신규
                  </span>
                )}
                {mail.hasAttachments && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Image className="w-3.5 h-3.5" />
                    사진 {mail.attachmentCount}장
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
