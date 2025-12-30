# Mock Court Audio Scripts for Truth Re:Build AI

## Court Session Audio Scripts
*These scripts can be used with browser text-to-speech or pre-recorded for demonstration purposes*

### 1. Judge Opening Statement
**Voice**: Authoritative, slow pace  
**Text**: "All rise. This court is now in session. The Honorable Judge presiding. In the matter of negligence claims involving trail safety protocols, we will now hear opening statements from both counsel."

### 2. Prosecutor Opening
**Voice**: Professional, confident  
**Text**: "Your Honor, the prosecution will demonstrate that the defendant's failure to maintain adequate safety measures directly caused preventable harm. Evidence shows a clear pattern of negligent behavior."

### 3. Defense Opening  
**Voice**: Calm, persuasive  
**Text**: "Your Honor, the defense respectfully submits that our client acted with reasonable care under the circumstances. This was an unfortunate accident, not negligence."

### 4. Witness Testimony - Safety Expert
**Voice**: Professional, clear  
**Text**: "I inspected the trail conditions on the morning in question. The safety barriers were positioned according to standard protocols. Weather conditions were within acceptable parameters for public access."

### 5. Cross-Examination Exchange
**Voice**: Questioning, firm  
**Text**: "Witness, you stated the barriers were 'adequate' - but isn't it true you also noted concerns about visibility in your initial report? Please explain this apparent contradiction."

### 6. Witness Contradiction Analysis
**Voice**: Analytical, educational  
**Text**: "Analysis reveals inconsistency in witness testimony. First stating all safety measures were proper, then acknowledging visibility concerns. This timeline discrepancy affects credibility assessment."

### 7. Expert Analysis - Timeline Review
**Voice**: Technical, informative  
**Text**: "Timeline reconstruction shows three critical moments: 9:15 AM safety check completion, 11:30 AM incident occurrence, and 2:45 PM emergency response. Each timestamp raises questions about response protocols."

### 8. Jury Instruction
**Voice**: Authoritative, careful  
**Text**: "Members of the jury, you must determine if the prosecution proved negligence beyond reasonable doubt. Consider all evidence presented, witness credibility, and timeline consistency in your deliberations."

### 9. Final Verdict
**Voice**: Formal, decisive  
**Text**: "Having considered all evidence and testimony presented, this court finds that reasonable doubt exists regarding the defendant's alleged negligence. The case is dismissed with prejudice."

### 10. Case Summary for AI Analysis
**Voice**: Educational, explanatory  
**Text**: "This case demonstrates key principles of negligence law: duty of care, breach of standard, causation, and damages. The outcome hinged on witness credibility and timeline analysis."

## Usage Instructions

### For Browser Text-to-Speech Implementation:
```javascript
function playCourtAudio(scriptText, voiceType = 'default') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(scriptText);
        
        // Voice customization based on role
        switch(voiceType) {
            case 'judge':
                utterance.pitch = 0.8;
                utterance.rate = 0.7;
                break;
            case 'prosecutor':
                utterance.pitch = 1.0;
                utterance.rate = 0.9;
                break;
            case 'defense':
                utterance.pitch = 0.9;
                utterance.rate = 0.8;
                break;
            case 'witness':
                utterance.pitch = 1.1;
                utterance.rate = 1.0;
                break;
            default:
                utterance.pitch = 1.0;
                utterance.rate = 0.9;
        }
        
        speechSynthesis.speak(utterance);
    }
}
```

### For Demo Presentation:
- Use these scripts as talking points during live demo
- Read aloud during presentation to simulate court proceedings
- Combine with visual timeline and evidence display

## Technical Implementation Notes

### Audio Fallback Strategy:
1. **Primary**: MiniMax API audio generation (if working)
2. **Secondary**: Browser text-to-speech with custom voices
3. **Tertiary**: Pre-recorded MP3 files using free TTS services
4. **Demo**: Live reading by presenter

### Integration with App Features:
- **Search Tab**: Play relevant case law audio explanations
- **Chat Tab**: Audio responses to legal questions
- **Analysis Tab**: Timeline analysis with voice narration
- **Upload Tab**: Audio description of evidence analysis

## Court Simulation Scenarios

### Scenario A: Trail Safety Negligence
- Location: Ba Xian Ling Trail, Hong Kong
- Issue: Inadequate safety barriers
- Key Evidence: Weather conditions, maintenance logs
- Witnesses: Trail ranger, safety inspector, incident observer

### Scenario B: Contract Breach Dispute  
- Issue: Service delivery failure
- Key Evidence: Contract terms, communication records
- Witnesses: Contract manager, technical expert

### Scenario C: Evidence Analysis
- Focus: Photograph interpretation, timeline construction
- Key Elements: Image analysis, witness statement comparison
- Technical: AI-powered evidence correlation

---
**Purpose**: Mock court audio content for Truth Re:Build AI demo  
**Fallback Options**: Browser TTS, live reading, pre-recorded alternatives  
**Demo Ready**: Can be used immediately for hackathon presentation