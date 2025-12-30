import React, { useState } from 'react';
import { X, Scale, ArrowLeftRight } from 'lucide-react';
import { LegalCase } from '../types';

interface CompareModalProps {
  cases: LegalCase[];
  selectedCases: LegalCase[];
  onClose: () => void;
  onSelect: (case_: LegalCase) => void;
  onRemove: (id: string) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  cases,
  selectedCases,
  onClose,
  onSelect,
  onRemove,
}) => {
  const [showSelector, setShowSelector] = useState(selectedCases.length < 2);

  const ComparisonRow = ({ label, values }: { label: string; values: (string | number)[] }) => (
    <tr className="border-b border-gray-700">
      <td className="py-3 px-4 font-medium text-gray-300 bg-gray-800/50 w-32">{label}</td>
      {values.map((val, i) => (
        <td key={i} className="py-3 px-4 text-gray-200">{val}</td>
      ))}
    </tr>
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <ArrowLeftRight className="h-5 w-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Emsal Karşılaştırma</h2>
            <span className="text-sm text-gray-400">({selectedCases.length}/2 seçili)</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          {/* Case Selector */}
          {showSelector && (
            <div className="p-4 border-b border-gray-700 bg-gray-800/30">
              <p className="text-sm text-gray-400 mb-3">Karşılaştırmak için dava seçin:</p>
              <div className="flex flex-wrap gap-2">
                {cases.filter(c => !selectedCases.find(s => s.id === c.id)).slice(0, 6).map(case_ => (
                  <button
                    key={case_.id}
                    onClick={() => {
                      onSelect(case_);
                      if (selectedCases.length >= 1) setShowSelector(false);
                    }}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white transition-colors"
                  >
                    {case_.title.substring(0, 30)}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Table */}
          {selectedCases.length >= 2 ? (
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-3 px-4 text-left text-gray-400 w-32">Özellik</th>
                    {selectedCases.map((case_, i) => (
                      <th key={case_.id} className="py-3 px-4 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 font-medium">Dava {i + 1}</span>
                          <button
                            onClick={() => {
                              onRemove(case_.id);
                              setShowSelector(true);
                            }}
                            className="p-1 hover:bg-gray-700 rounded"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow label="Başlık" values={selectedCases.map(c => c.title)} />
                  <ComparisonRow label="Mahkeme" values={selectedCases.map(c => c.court)} />
                  <ComparisonRow label="Yıl" values={selectedCases.map(c => c.year)} />
                  <ComparisonRow label="Dava Türü" values={selectedCases.map(c => c.caseType)} />
                  <ComparisonRow label="Sonuç" values={selectedCases.map(c => c.outcome)} />
                  <ComparisonRow label="Benzerlik" values={selectedCases.map(c => `${c.similarity}%`)} />
                  <ComparisonRow label="Uygunluk" values={selectedCases.map(c => `${c.relevance}%`)} />
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-300 bg-gray-800/50">Özet</td>
                    {selectedCases.map(c => (
                      <td key={c.id} className="py-3 px-4 text-gray-200 text-sm">{c.summary}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-300 bg-gray-800/50">Ana Faktörler</td>
                    {selectedCases.map(c => (
                      <td key={c.id} className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {c.keyFactors.map((f, i) => (
                            <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">{f}</span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <ComparisonRow label="Kaynak" values={selectedCases.map(c => c.source)} />
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Karşılaştırma için en az 2 dava seçin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareModal;
