import { useState } from 'react';
import { ChatComponent } from '@/components/component/chat-component';
import MainComponent from '@/components/component/main-component';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);

  const handleConnect = (session: any) => {
    setIsConnected(true);
    setChatSession(session);
  };

  return (
    <div className="App">
      {isConnected ? (
        <ChatComponent chatSession={chatSession} />
      ) : (
        <MainComponent onConnect={handleConnect} />
      )}
    </div>
  );
}
