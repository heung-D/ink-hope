import { useState } from "react";
import { X, Plus, Pencil, Trash2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { FamilyMember } from "@/types/mail";

interface AddressBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  familyMembers: FamilyMember[];
  onUpdateMembers: (members: FamilyMember[]) => void;
}

const colorOptions = [
  "bg-purple-100 text-purple-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-red-100 text-red-700",
  "bg-yellow-100 text-yellow-700",
  "bg-indigo-100 text-indigo-700",
];

export function AddressBookModal({
  isOpen,
  onClose,
  familyMembers,
  onUpdateMembers,
}: AddressBookModalProps) {
  const [members, setMembers] = useState<FamilyMember[]>(familyMembers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<FamilyMember>>({});

  const handleEdit = (member: FamilyMember) => {
    setEditingId(member.id);
    setEditForm(member);
  };

  const handleSaveEdit = () => {
    if (editingId && editForm.name && editForm.relation && editForm.facility) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === editingId
            ? {
                ...m,
                name: editForm.name!,
                relation: editForm.relation!,
                facility: editForm.facility!,
                avatar: editForm.name!.charAt(0),
                color: editForm.color || m.color,
              }
            : m
        )
      );
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleDelete = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddNew = () => {
    const newMember: FamilyMember = {
      id: `member-${Date.now()}`,
      name: "",
      relation: "",
      facility: "",
      avatar: "?",
      color: colorOptions[members.length % colorOptions.length],
    };
    setMembers((prev) => [...prev, newMember]);
    setEditingId(newMember.id);
    setEditForm(newMember);
  };

  const handleSaveAll = () => {
    const validMembers = members.filter(
      (m) => m.name && m.relation && m.facility
    );
    onUpdateMembers(validMembers);
    onClose();
  };

  const handleCancel = () => {
    setMembers(familyMembers);
    setEditingId(null);
    setEditForm({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={handleCancel}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-card rounded-2xl shadow-xl w-full max-w-lg max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">주소록 관리</h2>
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[50vh] space-y-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="p-4 bg-secondary/50 rounded-xl border border-border/50"
              >
                {editingId === member.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0",
                          editForm.color || member.color
                        )}
                      >
                        {editForm.name?.charAt(0) || "?"}
                      </div>
                      <Input
                        value={editForm.name || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        placeholder="이름"
                        className="flex-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={editForm.relation || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, relation: e.target.value })
                        }
                        placeholder="관계 (예: 남편, 아들)"
                      />
                      <Input
                        value={editForm.facility || ""}
                        onChange={(e) =>
                          setEditForm({ ...editForm, facility: e.target.value })
                        }
                        placeholder="시설명"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">색상:</span>
                      <div className="flex gap-1 flex-wrap">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            onClick={() => setEditForm({ ...editForm, color })}
                            className={cn(
                              "w-6 h-6 rounded-full transition-all",
                              color.split(" ")[0],
                              editForm.color === color
                                ? "ring-2 ring-primary ring-offset-2"
                                : "hover:scale-110"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingId(null);
                          setEditForm({});
                        }}
                      >
                        취소
                      </Button>
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Check className="w-4 h-4 mr-1" />
                        확인
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0",
                        member.color
                      )}
                    >
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {member.name}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">
                        {member.relation} · {member.facility}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(member)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border flex items-center justify-between">
            <Button variant="outline" onClick={handleAddNew}>
              <Plus className="w-4 h-4 mr-2" />
              새 연락처 추가
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={handleCancel}>
                취소
              </Button>
              <Button onClick={handleSaveAll}>저장</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
