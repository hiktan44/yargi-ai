import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { ChatMessage } from '../types';
import { audioService } from '../services/audioService';
import { supabase, chatWithAI } from '../lib/supabase';
import { generateTurkishLegalResponse } from '../services/turkishLegalAssistant';

const ChatTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Yargı AI Hukuk Asistanı’na hoş geldiniz! Dava analizi yapmanızda, hukuki sorunları tespit etmenizde ve doğrulanmış kamuya açık hukuki içtihatlara dayalı içgörüler sağlamada yardımcı olabilirim. Bugün nasıl yardımcı olabilirim?',
      timestamp: new Date(),
      audioAvailable: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const caseScenarios = [
    {
      id: 'scenario1',
      title: 'İş kazası tazminat davası',
      description: 'İşçi güvenliği ihmali nedeniyle tazminat talebi'
    },
    {
      id: 'scenario2', 
      title: 'İdari işlem iptali davası',
      description: 'Danıştay\'a açılacak iptal davası süreci'
    },
    {
      id: 'scenario3',
      title: 'Boşanma ve velayet davası', 
      description: 'Çocuk velayeti ve nafaka konuları'
    },
    {
      id: 'scenario4',
      title: 'İcra takibi ve borç ödeme',
      description: 'İlamsız icra takibi ve itiraz süreci'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Doğrudan OpenAI API çağrısı - fallback to local assistant if fails
      let responseMessage = '';
      
      try {
        const chatMessages = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        chatMessages.push({ role: 'user', content: currentInput });
        
        responseMessage = await chatWithAI(chatMessages);
      } catch (backendError) {
        // API hatası verirse local assistant kullan
        console.log('API hatası, local assistant kullanılıyor:', backendError);
        responseMessage = generateTurkishLegalResponse(currentInput);
      }
      
      if (!responseMessage) {
        responseMessage = generateTurkishLegalResponse(currentInput);
      }

      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseMessage,
        timestamp: new Date(),
        audioAvailable: true
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Hata durumunda da local assistant dene
      const fallbackResponse = generateTurkishLegalResponse(currentInput);
      
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackResponse,
        timestamp: new Date(),
        audioAvailable: true
      };
      
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };



  const handleScenarioClick = (scenario: typeof caseScenarios[0]) => {
    setInputMessage(`${scenario.title} konusunu analiz et: ${scenario.description}`);
  };

  const playMessageAudio = async (message: ChatMessage) => {
    if (!audioEnabled || !message.audioAvailable) return;
    
    try {
      setPlayingMessageId(message.id);
      
      await audioService.playAudio({
        id: message.id,
        title: 'AI Yanıtı',
        voiceType: message.role === 'assistant' ? 'default' : 'witness',
        text: message.content,
        category: 'response'
      });
    } catch (error) {
      console.error('Audio playback failed:', error);
    } finally {
      setPlayingMessageId(null);
    }
  };

  const stopAudio = () => {
    audioService.stopAudio();
    setPlayingMessageId(null);
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Yargı AI Hukuk Asistanı’na hoş geldiniz! Dava analizi yapmanızda, hukuki sorunları tespit etmenizde ve doğrulanmış kamuya açık hukuki içtihatlara dayalı içgörüler sağlamada yardımcı olabilirim. Bugün nasıl yardımcı olabilirim?',
      timestamp: new Date(),
      audioAvailable: true
    }]);
    stopAudio();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Yapay Zekâ Hukuk Asistanı</h2>
            <p className="text-sm text-gray-400">Söylevsel dava analizi ve hukuki danışmanlık</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                audioEnabled 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              <span className="text-sm">Ses</span>
            </button>
            <button
              onClick={clearChat}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="text-sm">Temizle</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-100 border border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  {message.audioAvailable && audioEnabled && message.role === 'assistant' && (
                    <button
                      onClick={() => playingMessageId === message.id ? stopAudio() : playMessageAudio(message)}
                      className="ml-3 p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors flex-shrink-0"
                    >
                      {playingMessageId === message.id ? (
                        <Pause className="h-3 w-3 text-white" />
                      ) : (
                        <Play className="h-3 w-3 text-white" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-800 text-gray-100 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-400">Yapay zekâ düşünüyor...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Örnek Dava Senaryoları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {caseScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioClick(scenario)}
                className="p-3 text-left bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <div className="text-sm font-medium text-white mb-1">{scenario.title}</div>
                <div className="text-xs text-gray-400">{scenario.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                placeholder="Hukuki davanızı veya sorunuzu anlatın..."
                rows={3}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors flex items-center justify-center"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
