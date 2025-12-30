import { AudioScript } from '../types';

export const mockCourtAudioScripts: AudioScript[] = [
  {
    id: '1',
    title: 'Judge Opening Statement',
    voiceType: 'judge',
    text: 'All rise. This court is now in session. The Honorable Judge presiding. In the matter of negligence claims involving trail safety protocols, we will now hear opening statements from both counsel.',
    category: 'opening'
  },
  {
    id: '2',
    title: 'Prosecutor Opening',
    voiceType: 'prosecutor',
    text: 'Your Honor, the prosecution will demonstrate that the defendant\'s failure to maintain adequate safety measures directly caused preventable harm. Evidence shows a clear pattern of negligent behavior.',
    category: 'opening'
  },
  {
    id: '3',
    title: 'Defense Opening',
    voiceType: 'defense',
    text: 'Your Honor, the defense respectfully submits that our client acted with reasonable care under the circumstances. This was an unfortunate accident, not negligence.',
    category: 'opening'
  },
  {
    id: '4',
    title: 'Witness Testimony - Safety Expert',
    voiceType: 'witness',
    text: 'I inspected the trail conditions on the morning in question. The safety barriers were positioned according to standard protocols. Weather conditions were within acceptable parameters for public access.',
    category: 'testimony'
  },
  {
    id: '5',
    title: 'Cross-Examination Exchange',
    voiceType: 'prosecutor',
    text: 'Witness, you stated the barriers were adequate - but isn\'t it true you also noted concerns about visibility in your initial report? Please explain this apparent contradiction.',
    category: 'cross-examination'
  },
  {
    id: '6',
    title: 'Witness Contradiction Analysis',
    voiceType: 'default',
    text: 'Analysis reveals inconsistency in witness testimony. First stating all safety measures were proper, then acknowledging visibility concerns. This timeline discrepancy affects credibility assessment.',
    category: 'analysis'
  },
  {
    id: '7',
    title: 'Expert Analysis - Timeline Review',
    voiceType: 'default',
    text: 'Timeline reconstruction shows three critical moments: 9:15 AM safety check completion, 11:30 AM incident occurrence, and 2:45 PM emergency response. Each timestamp raises questions about response protocols.',
    category: 'analysis'
  },
  {
    id: '8',
    title: 'Jury Instruction',
    voiceType: 'judge',
    text: 'Members of the jury, you must determine if the prosecution proved negligence beyond reasonable doubt. Consider all evidence presented, witness credibility, and timeline consistency in your deliberations.',
    category: 'instruction'
  },
  {
    id: '9',
    title: 'Final Verdict',
    voiceType: 'judge',
    text: 'Having considered all evidence and testimony presented, this court finds that reasonable doubt exists regarding the defendant\'s alleged negligence. The case is dismissed with prejudice.',
    category: 'verdict'
  },
  {
    id: '10',
    title: 'Case Summary for AI Analysis',
    voiceType: 'default',
    text: 'This case demonstrates key principles of negligence law: duty of care, breach of standard, causation, and damages. The outcome hinged on witness credibility and timeline analysis.',
    category: 'summary'
  }
];
