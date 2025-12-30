import React, { useState } from 'react';
import { Scale, User, LogOut, Sun, Moon } from 'lucide-react';
import SearchTab from './components/SearchTab';
import ChatTab from './components/ChatTab';
import AnalysisTab from './components/AnalysisTab';
import UploadTab from './components/UploadTab';
import AboutTab from './components/AboutTab';
import ToolsTab from './components/ToolsTab';
import { useTheme } from './context/ThemeContext';
import './App.css';

type Tab = 'search' | 'chat' | 'analysis' | 'tools' | 'upload' | 'about';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('search');
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const renderTabContent = () => {
    console.log('Active Tab:', activeTab);
    switch (activeTab) {
      case 'search':
        console.log('Rendering SearchTab');
        return <SearchTab />;
      case 'chat':
        console.log('Rendering ChatTab');
        return <ChatTab />;
      case 'analysis':
        console.log('Rendering AnalysisTab');
        return <AnalysisTab />;
      case 'tools':
        console.log('Rendering ToolsTab');
        return <ToolsTab />;
      case 'upload':
        console.log('Rendering UploadTab');
        return <UploadTab />;
      case 'about':
        console.log('Rendering AboutTab');
        return <AboutTab />;
      default:
        console.log('Rendering default SearchTab');
        return <SearchTab />;
    }
  };

  const tabs = [
    { id: 'search', label: 'Arama' },
    { id: 'chat', label: 'Sohbet' },
    { id: 'analysis', label: 'Analiz' },
    { id: 'tools', label: 'Araçlar' },
    { id: 'upload', label: 'Yükleme' },
    { id: 'about', label: 'Hakkında' },
  ];

  console.log('Tabs array:', tabs);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`px-4 sm:px-6 py-3 sm:py-4 border-b transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
            <div>
              <h1 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Yargı AI</h1>
              <p className={`text-xs sm:text-sm hidden sm:block ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Yapay Zekâ Destekli Hukuk Asistanı</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-gray-700 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={theme === 'dark' ? 'Aydınlık Mod' : 'Karanlık Mod'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className={`hidden sm:flex items-center space-x-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              <User className="h-4 w-4" />
              <span>Demo</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs - Scrollable on mobile */}
      <nav className={`border-b transition-colors duration-200 overflow-x-auto ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="px-4 sm:px-6">
          <div className="flex space-x-4 sm:space-x-8">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={(e) => {
                  const targetIndex = index;
                  const targetTab = tabs[targetIndex];
                  console.log('Tab clicked:', targetTab.id);
                  console.log('Tab index:', targetIndex);
                  console.log('Tab object:', targetTab);
                  console.log('All tabs:', tabs);
                  setActiveTab(targetTab.id as Tab);
                }}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-500'
                    : theme === 'dark' 
                      ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {renderTabContent()}
      </main>

      {/* Footer */}
      <footer className={`px-6 py-4 border-t transition-colors duration-200 ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>
            <a 
              href="https://thirdhandai.com.tr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              ThirdhandAI
            </a> tarafından yapılmıştır • 
            <span className="text-yellow-400 ml-1">Geliştirilmiş Ses ve Doğrulanmış Hukuki Kaynaklar</span> • 
            Yalnızca Eğitim Amaçlı Demodur
          </p>
          <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            Tüm dava verileri doğrulanmış kamuya açık kaynaklardan alınmıştır. Hukuki tavsiye değildir.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
