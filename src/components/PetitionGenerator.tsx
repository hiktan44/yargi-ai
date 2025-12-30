import React, { useState } from 'react';
import { FileText, Copy, Download, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const templates = [
  { id: 'dava', name: 'Dava Dilekçesi', icon: '⚖️' },
  { id: 'itiraz', name: 'İtiraz Dilekçesi', icon: '📝' },
  { id: 'temyiz', name: 'Temyiz Dilekçesi', icon: '📋' },
  { id: 'icra', name: 'İcra Takip Talebi', icon: '💼' },
  { id: 'sulh', name: 'Sulh Teklifi', icon: '🤝' },
];

const PetitionGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [formData, setFormData] = useState({
    davaci: '',
    davali: '',
    konu: '',
    olaylar: '',
    talepler: ''
  });
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePetition = async () => {
    if (!selectedTemplate || !formData.konu) return;
    setIsLoading(true);

    try {
      const template = templates.find(t => t.id === selectedTemplate);
      const { data } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            {
              role: 'system',
              content: `Sen bir hukuk uzmanısın. ${template?.name} formatında profesyonel bir dilekçe oluştur. Türk hukuk sistemine uygun, resmi dil kullan.`
            },
            {
              role: 'user',
              content: `Dilekçe Türü: ${template?.name}
Davacı: ${formData.davaci}
Davalı: ${formData.davali}
Konu: ${formData.konu}
Olaylar: ${formData.olaylar}
Talepler: ${formData.talepler}`
            }
          ]
        }
      });
      setGeneratedText(data.response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsText = () => {
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dilekce_${selectedTemplate}_${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
        <FileText className="h-5 w-5 text-blue-400" />
        <span>Dilekçe Oluşturucu</span>
      </h3>

      {/* Template Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTemplate(t.id)}
            className={`p-3 rounded-lg text-center transition-colors ${
              selectedTemplate === t.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <div className="text-xl mb-1">{t.icon}</div>
            <div className="text-xs">{t.name}</div>
          </button>
        ))}
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Davacı Adı"
          value={formData.davaci}
          onChange={(e) => setFormData({...formData, davaci: e.target.value})}
          className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm"
        />
        <input
          type="text"
          placeholder="Davalı Adı"
          value={formData.davali}
          onChange={(e) => setFormData({...formData, davali: e.target.value})}
          className="p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm"
        />
      </div>
      <input
        type="text"
        placeholder="Dava Konusu"
        value={formData.konu}
        onChange={(e) => setFormData({...formData, konu: e.target.value})}
        className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm mb-4"
      />
      <textarea
        placeholder="Olayların Özeti"
        value={formData.olaylar}
        onChange={(e) => setFormData({...formData, olaylar: e.target.value})}
        className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm mb-4 resize-none"
      />
      <textarea
        placeholder="Talepleriniz"
        value={formData.talepler}
        onChange={(e) => setFormData({...formData, talepler: e.target.value})}
        className="w-full h-20 p-3 bg-gray-900 border border-gray-600 rounded-lg text-white text-sm mb-4 resize-none"
      />

      <button
        onClick={generatePetition}
        disabled={!selectedTemplate || !formData.konu || isLoading}
        className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg text-white flex items-center justify-center space-x-2"
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        <span>{isLoading ? 'Oluşturuluyor...' : 'Dilekçe Oluştur'}</span>
      </button>

      {/* Generated Text */}
      {generatedText && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-medium">Oluşturulan Dilekçe</h4>
            <div className="flex space-x-2">
              <button onClick={copyToClipboard} className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-white">
                {copied ? <CheckCircle className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
              <button onClick={downloadAsText} className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-white">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          <pre className="p-4 bg-gray-900 rounded-lg text-gray-300 text-sm whitespace-pre-wrap overflow-auto max-h-96">
            {generatedText}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PetitionGenerator;
