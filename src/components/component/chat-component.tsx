import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Copy } from 'lucide-react';
import styles from './Chat.module.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatComponentProps {
  chatSession: any;
}

export function ChatComponent({ chatSession }: ChatComponentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage: Message = { id: Date.now(), text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const result = await chatSession.sendMessage(input);
        const response = await result.response;
        const botMessageText = response.text();

        const botMessage: Message = { id: Date.now(), text: botMessageText, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Bot 응답 중 오류 발생:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (text: string, messageId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="text-center py-4 bg-white">
        <h1 className="text-xl font-bold">Gemini 1.5 Flash</h1>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-auto" ref={scrollAreaRef}>
        <div className="max-w-full md:max-w-[50%] mx-auto">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                style={{
                  display: 'flex',
                  marginBottom: '1rem',
                  flexDirection: 'column',
                  alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '9999px',
                      marginLeft: message.sender === 'user' ? '0.5rem' : '0',
                      marginRight: message.sender === 'user' ? '0' : '0.5rem',
                      backgroundColor: message.sender === 'user' ? '#3b82f6' : '#10b981',
                    }}
                  >
                    <span style={{ color: 'white' }}>{message.sender === 'user' ? 'U' : 'B'}</span>
                  </div>
                  <div
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: message.sender === 'user' ? '#dbeafe' : '#d1fae5',
                      color: message.sender === 'user' ? '#1e3a8a' : '#064e3b',
                      maxWidth: '80%',
                      wordWrap: 'break-word',
                      position: 'relative',
                    }}
                  >
                    {message.text}
                    {message.sender === 'bot' && (
                      <Button
                        onClick={() => handleCopy(message.text, message.id)}
                        variant="outline"
                        size="icon"
                        className="absolute bottom-8 -right-10 transform translate-y-8"
                        aria-label={copiedMessageId === message.id ? "Copied" : "Copy to clipboard"} 
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="h-3 w-3 text-green-500" />
                        ) : (
                          <Copy className="h-3 w-3 text-gray-500" /> 
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <AnimatePresence>
            {isTyping && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="flex items-center mb-4"
              >
                <div className={styles.typingDotWrapper}>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="sticky bottom-4 bg-background py-4 flex flex-col gap-1.5 px-4 max-w-2xl mx-auto">
        <div className="relative">
          <Input
            placeholder="Message Gemini..."
            name="message"
            id="message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute w-8 h-8 top-2 right-2"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <ArrowUpIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
        <p className="text-xs font-medium text-center text-neutral-700">
          Gemini can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}

function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}
