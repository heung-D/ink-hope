import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  FileText, 
  Edit3, 
  Eye, 
  Image, 
  Settings, 
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecipientInfoStep } from "./RecipientInfoStep";
import { SenderInfoStep } from "./SenderInfoStep";
import type { FamilyMember } from "@/types/mail";
import { type FacilityType, type Region, type RelationType } from "@/data/facilities";

type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Step {
  id: StepId;
  label: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  { id: 1, label: "받는 사람", icon: <Mail className="w-4 h-4" /> },
  { id: 2, label: "편지지", icon: <FileText className="w-4 h-4" /> },
  { id: 3, label: "편지 작성", icon: <Edit3 className="w-4 h-4" /> },
  { id: 4, label: "미리보기", icon: <Eye className="w-4 h-4" /> },
  { id: 5, label: "사진 추가", icon: <Image className="w-4 h-4" /> },
  { id: 6, label: "추가 옵션", icon: <Settings className="w-4 h-4" /> },
  { id: 7, label: "결제", icon: <CreditCard className="w-4 h-4" /> },
];

interface ComposeContentProps {
  familyMembers: FamilyMember[];
  onClose: () => void;
}

export function ComposeContent({ familyMembers, onClose }: ComposeContentProps) {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  
  // 받는 사람 정보 상태
  const [selectedFacilityType, setSelectedFacilityType] = useState<FacilityType | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
  const [recipientName, setRecipientName] = useState("");
  const [prisonerNumber, setPrisonerNumber] = useState("");
  const [selectedRelation, setSelectedRelation] = useState<RelationType | null>(null);
  const [customAddress, setCustomAddress] = useState("");
  
  // 보내는 분 정보 상태
  const [senderInfo, setSenderInfo] = useState({
    name: "김민수",
    phone: "010-1234-5678",
    address: "서울시 강남구 테헤란로 123",
  });

  // 주소록에서 선택
  const handleSelectFromAddressBook = (member: FamilyMember) => {
    setRecipientName(member.name);
    setPrisonerNumber(member.prisonerNumber || "");
    setSelectedRelation(member.relation as RelationType);
    // 시설 정보는 별도로 입력 필요
  };

  // 단계 완료 여부 확인
  const isStep1Complete = () => {
    if (selectedFacilityType === "일반 주소") {
      return customAddress.trim() !== "" && recipientName.trim() !== "" && selectedRelation !== null;
    }
    return selectedFacilityId !== null && recipientName.trim() !== "" && selectedRelation !== null;
  };

  const isStep2Complete = () => {
    return senderInfo.name.trim() !== "" && senderInfo.phone.trim() !== "" && senderInfo.address.trim() !== "";
  };

  const canProceed = () => {
    if (currentStep === 1) return isStep1Complete() && isStep2Complete();
    return true;
  };

  const handleNext = () => {
    if (currentStep < 7 && canProceed()) {
      setCurrentStep((prev) => (prev + 1) as StepId);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as StepId);
    } else {
      onClose();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-muted/30">
      {/* Header */}
      <header className="h-auto border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-xl font-semibold text-foreground">편지 쓰기</h1>
            <p className="text-sm text-muted-foreground">소중한 마음을 담아 편지를 써보세요</p>
          </div>
        </div>

        {/* Step Progress - Chips */}
        <div className="flex items-center gap-2 flex-wrap">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => currentStep > step.id && setCurrentStep(step.id)}
              disabled={currentStep < step.id}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                transition-all duration-200 whitespace-nowrap
                ${currentStep === step.id 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : currentStep > step.id 
                    ? "bg-primary/15 text-primary hover:bg-primary/25 cursor-pointer" 
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }
              `}
            >
              {currentStep > step.id ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                  {step.id}
                </span>
              )}
              {step.label}
            </button>
          ))}
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            {currentStep === 1 && (
              <div className="space-y-4">
                {/* 받는 사람 정보 */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">1. 받는 사람 정보</h2>
                  </div>
                  <div className="p-4">
                    <RecipientInfoStep
                      selectedFacilityType={selectedFacilityType}
                      setSelectedFacilityType={setSelectedFacilityType}
                      selectedRegion={selectedRegion}
                      setSelectedRegion={setSelectedRegion}
                      selectedFacilityId={selectedFacilityId}
                      setSelectedFacilityId={setSelectedFacilityId}
                      recipientName={recipientName}
                      setRecipientName={setRecipientName}
                      prisonerNumber={prisonerNumber}
                      setPrisonerNumber={setPrisonerNumber}
                      selectedRelation={selectedRelation}
                      setSelectedRelation={setSelectedRelation}
                      customAddress={customAddress}
                      setCustomAddress={setCustomAddress}
                      familyMembers={familyMembers}
                      onSelectFromAddressBook={handleSelectFromAddressBook}
                    />
                  </div>
                </div>

                {/* 보내는 분 정보 */}
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="p-4 border-b border-border flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">2. 보내는 분 정보</h2>
                  </div>
                  <div className="p-4">
                    <SenderInfoStep
                      senderInfo={senderInfo}
                      setSenderInfo={setSenderInfo}
                      isRecipientComplete={isStep1Complete()}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">편지지 선택</h2>
                <p className="text-muted-foreground">편지지 선택 기능이 곧 추가됩니다</p>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <Edit3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">편지 작성</h2>
                <p className="text-muted-foreground">편지 작성 기능이 곧 추가됩니다</p>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">미리보기</h2>
                <p className="text-muted-foreground">미리보기 기능이 곧 추가됩니다</p>
              </div>
            )}

            {currentStep === 5 && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">사진 추가</h2>
                <p className="text-muted-foreground">사진 추가 기능이 곧 추가됩니다</p>
              </div>
            )}

            {currentStep === 6 && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">추가 옵션</h2>
                <p className="text-muted-foreground">추가 옵션 기능이 곧 추가됩니다</p>
              </div>
            )}

            {currentStep === 7 && (
              <div className="bg-card rounded-xl border border-border p-8 text-center">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-foreground mb-2">결제</h2>
                <p className="text-muted-foreground">결제 기능이 곧 추가됩니다</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-border bg-card px-6 py-4 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          className="h-10 px-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          이전
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="h-10 px-6 bg-primary hover:bg-primary/90"
        >
          다음
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
