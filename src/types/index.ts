export interface LegalCase {
  id: string;
  title: string;
  year: number | string;
  court: string;
  similarity?: number;
  keyFactors: string[];
  outcome: string;
  relevance: number;
  summary: string;
  jurisdiction?: string;
  caseType: string;
  source: string;
  url?: string;
}

export interface AudioScript {
  id: string;
  title: string;
  voiceType: 'judge' | 'prosecutor' | 'defense' | 'witness' | 'default' | 'Turkish_Trustworthyman' | 'Turkish_CalmWoman';
  text: string;
  category: string;
}

export interface AudioSettings {
  useApiAudio: boolean;
  fallbackToTts: boolean;
  voiceSpeed: number;
  voicePitch: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  audioAvailable?: boolean;
}

export interface AnalysisResult {
  precedents: LegalCase[];
  witnessAnalysis: WitnessAnalysis[];
  timeline: TimelineEvent[];
  scenarios: ScenarioAnalysis[];
}

export interface WitnessAnalysis {
  id: string;
  name: string;
  credibilityScore: number;
  inconsistencies: string[];
  keyPoints: string[];
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  event: string;
  source: string;
  significance: 'yüksek' | 'orta' | 'düşük' | 'high' | 'medium' | 'low';
}

export interface ScenarioAnalysis {
  id: string;
  scenario: string;
  probability: number;
  factors: string[];
  outcome: string;
}

export interface LegalSource {
  id: string;
  name: string;
  url: string;
  description: string;
  accessType: 'free' | 'subscription' | 'government' | 'professional';
  coverage: string[];
  status: 'verified' | 'pending' | 'restricted';
}
