import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface MainComponentProps {
  onConnect: (session: any) => void;
}

export default function MainComponent({ onConnect }: MainComponentProps) {
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionStatus('idle');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chatSession = model.startChat({
        history: [],
        generationConfig: {
          maxOutputTokens: 100, 
        },
      });

      setConnectionStatus('success');
      onConnect(chatSession);
    } catch (error) {
      console.error('API 연결 중 오류가 발생했습니다:', error);
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-md h-screen flex items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Connect to Gemini 1.5 Flash</CardTitle>
          <CardDescription>Enter your API key to connect to Gemini 1.5 Flash</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <Button 
              className="w-full" 
              onClick={handleConnect}
              disabled={isConnecting}
            >
              {isConnecting ? 'Connecting...' : 'Connect'}
            </Button>
            {connectionStatus === 'success' && (
              <Alert variant="default">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Successfully connected to Gemini 1.5 Flash.
                </AlertDescription>
              </Alert>
            )}
            {connectionStatus === 'error' && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to connect. Please check your API key and try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
