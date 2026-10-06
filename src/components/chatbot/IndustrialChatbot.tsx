import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  RotateCw,
  User,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Translations, Language } from '../../i18n/translations';
import printheadAvatarImg from '../../assets/images/printhead_avatar_1791194959249.jpg';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface IndustrialChatbotProps {
  t: Translations;
  currentLanguage: Language;
  onNavigateToQuote?: () => void;
  onNavigateToContact?: () => void;
}

export const IndustrialChatbot: React.FC<IndustrialChatbotProps> = ({
  t,
  currentLanguage,
  onNavigateToQuote,
  onNavigateToContact,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatLanguage, setChatLanguage] = useState<Language>(currentLanguage);

  useEffect(() => {
    setChatLanguage(currentLanguage);
  }, [currentLanguage]);

  // Official welcome greeting specified
  const initialGreeting =
    '¡Hola! Soy Project 3D Assistant. ¿Tienes dudas sobre materiales (PLA, ABS, PETG, Resina SLA, Nylon), tolerancias ISO o cómo cotizar tu archivo STL?';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Autonomous language detection from message
  const detectLanguage = (text: string): Language => {
    const lower = text.toLowerCase();
    if (
      /^(hi|hello|hey|what|how|where|when|can|is|are|price|cost|quote|lead|shipping|material)/i.test(
        lower
      ) ||
      /\b(the|and|for|with|about|delivery|hours|specs)\b/i.test(lower)
    ) {
      return 'en';
    }
    if (
      /^(bonjour|salut|comment|quel|quelle|où|quand|prix|devis|matière|délai|livraison)/i.test(
        lower
      ) ||
      /\b(le|la|les|pour|avec|sur|dans)\b/i.test(lower)
    ) {
      return 'fr';
    }
    if (
      /^(hallo|guten|was|wie|wo|wann|kann|preis|angebot|werkstoff|lieferzeit|versand)/i.test(
        lower
      ) ||
      /\b(der|die|das|und|für|mit|über)\b/i.test(lower)
    ) {
      return 'de';
    }
    return 'es';
  };

  const handleSendMessage = async (customMessage?: string) => {
    const msgToSend = customMessage || inputMessage;
    if (!msgToSend.trim()) return;

    const detected = detectLanguage(msgToSend);
    if (detected !== chatLanguage) {
      setChatLanguage(detected);
    }

    const newUserMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: msgToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msgToSend,
          language: detected,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }],
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Chat API returned error');
      }

      const data = await response.json();
      const replyText =
        data.reply ||
        'En PROJECT 3D fabricamos prototipos y series en Torrijos (Toledo). Puedes subir tu STL en la calculadora para obtener precio al instante.';

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text:
            'Gracias por tu consulta. En PROJECT 3D fabricamos prototipos y series en PLA Técnico, ABS, PETG, Resina SLA y Nylon SLS con tolerancias ISO 2768. Puedes calcular el coste de tu modelo subiendo el archivo .STL en nuestra calculadora 3D.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Circular Avatar with High-Quality 3D Extrusion Head Render & Emerald Halo
  const renderAvatar = (sizeClass = 'w-9 h-9') => (
    <div className={`relative ${sizeClass} rounded-full overflow-hidden shrink-0 ring-2 ring-[#059669] shadow-md shadow-emerald-500/30 bg-slate-900`}>
      <img
        src={printheadAvatarImg}
        alt="Project 3D Assistant Avatar"
        className="w-full h-full object-cover"
      />
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full animate-pulse" />
    </div>
  );

  return (
    <>
      {/* Floating Toggle Button with Asymmetric Cyber-Clean Geometry & 3D Extrusion Avatar */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          title="Project 3D Assistant"
          className="fixed bottom-6 right-4 sm:right-6 z-40 bg-[#0F172A] hover:bg-[#1E293B] border-2 border-[#059669] rounded-2xl rounded-br-sm sm:rounded-3xl sm:rounded-br-md p-2 sm:p-2.5 shadow-2xl shadow-emerald-500/30 flex items-center gap-3 transition-all hover:scale-105 active:scale-95 group cursor-pointer ring-4 ring-[#059669]/20"
        >
          {/* Avatar with emerald glow */}
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-[#059669] shadow-inner shrink-0 bg-slate-900">
            <img
              src={printheadAvatarImg}
              alt="Project 3D Assistant"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <span className="absolute top-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#0F172A] animate-ping" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-[#10B981] rounded-full border-2 border-[#0F172A]" />
          </div>

          {/* Attached Label & Flashing Indicator */}
          <div className="text-left font-mono pr-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white tracking-wide">
                Project 3D Assistant
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-semibold tracking-tight">
                Online • Respuesta inmediata
              </span>
            </div>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 font-sans">
          {/* Header with Project 3D Assistant, profile picture and 'En línea' status */}
          <div className="px-4 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {renderAvatar('w-10 h-10')}
              <div>
                <h4 className="text-xs font-bold text-[#0F172A] tracking-wider font-mono">
                  Project 3D Assistant
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse" />
                  <span className="text-[11px] font-mono text-[#059669] font-bold">
                    En línea
                  </span>
                  <span className="text-slate-300 text-[10px]">·</span>
                  <span className="text-[11px] text-[#475569] font-mono">
                    Ingeniería Torrijos
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 text-[10px] font-mono shadow-2xs">
                {(['es', 'en', 'fr', 'de'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setChatLanguage(lang)}
                    className={`px-1.5 py-0.5 rounded uppercase cursor-pointer ${
                      chatLanguage === lang
                        ? 'bg-[#059669] text-white font-bold'
                        : 'text-[#475569] hover:text-[#0F172A]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors ml-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Question Chips */}
          <div className="px-3 py-2 bg-slate-50/80 border-b border-slate-200 overflow-x-auto scrollbar-none flex gap-1.5 text-[11px] font-mono">
            <button
              onClick={() => handleSendMessage('¿Qué materiales recomendáis para piezas mecánicas?')}
              className="shrink-0 px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#475569] hover:text-[#059669] rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Materiales
            </button>
            <button
              onClick={() => handleSendMessage('¿Dónde está ubicada la empresa en Torrijos?')}
              className="shrink-0 px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#475569] hover:text-[#059669] rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Ubicación
            </button>
            <button
              onClick={() => handleSendMessage('¿Cómo funciona la estimación del STL?')}
              className="shrink-0 px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#475569] hover:text-[#059669] rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Cotizar STL
            </button>
            <button
              onClick={() => handleSendMessage('¿Qué tolerancias dimensionales podéis garantizar?')}
              className="shrink-0 px-2.5 py-1 bg-white hover:bg-emerald-50 text-[#475569] hover:text-[#059669] rounded-lg border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Tolerancias ISO
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAFBFD] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && renderAvatar('w-7 h-7')}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-[#059669] text-white font-medium rounded-tr-none shadow-xs'
                      : 'bg-white border border-slate-200 text-[#0F172A] rounded-tl-none shadow-2xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <span
                    className={`block text-[10px] font-mono mt-1 ${
                      m.sender === 'user' ? 'text-white/80' : 'text-[#475569]'
                    }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-[#0F172A] border border-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-[#475569] text-xs font-mono">
                {renderAvatar('w-7 h-7')}
                <div className="bg-white border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-2xs">
                  <RotateCw className="w-3.5 h-3.5 text-[#059669] animate-spin" />
                  <span className="italic">Project 3D Assistant respondiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Footer */}
          <div className="px-3.5 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-[#475569]">
            <button
              onClick={() => {
                setIsOpen(false);
                if (onNavigateToContact) onNavigateToContact();
              }}
              className="text-[#059669] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Contacto Humano</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onNavigateToQuote) onNavigateToQuote();
              }}
              className="text-[#475569] hover:text-[#0F172A] flex items-center gap-1 cursor-pointer"
            >
              <span>Subir STL</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu consulta sobre impresión 3D..."
              className="flex-1 bg-[#FAFBFD] border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#059669] focus:bg-white"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputMessage.trim()}
              className="p-2.5 bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white rounded-xl transition-colors cursor-pointer shadow-md shadow-emerald-600/25"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
