import { 
  ChartNoAxesCombined, 
  CodeXml, 
  DraftingCompass, 
  Footprints, 
  Goal, 
  Lightbulb, 
  List, 
  Rocket 
} from "lucide-react";

export const CLASS_CATEGORY = [
  { id: 1, label: "전체", category: '', icon: <List className="w-5 h-5" /> },
  { id: 2, label: "인문학", category: 'humanity', icon: <Lightbulb className="w-5 h-5" /> },
  { id: 3, label: "스타트업", category: 'start-up', icon: <Rocket className="w-5 h-5" /> },
  { id: 4, label: "IT 프로그래밍", category: 'programming', icon: <CodeXml className="w-5 h-5" /> },
  { id: 5, label: "서비스 전략 기획", category: 'planning', icon: <Goal className="w-5 h-5" /> },
  { id: 6, label: "마케팅", category: 'marketing', icon: <ChartNoAxesCombined className="w-5 h-5" /> },
  { id: 7, label: "디자인 일러스트", category: 'design', icon: <DraftingCompass className="w-5 h-5" /> },
  { id: 8, label: "자기계발", category: 'self-development', icon: <Footprints className="w-5 h-5" /> },
];
