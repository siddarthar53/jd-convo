import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, AtSign, User, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  type: 'system' | 'user';
  content: string;
  timestamp: Date;
  mentions?: Mention[];
}

interface Mention {
  id: string;
  name: string;
  email: string;
  type: 'approval' | 'feedback' | 'collaboration';
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Hello! I\'m here to help you create your job description. Let\'s start with the basics. What is your current job title?',
      timestamp: new Date(Date.now() - 10000),
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState('');
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [selectedMentions, setSelectedMentions] = useState<Mention[]>([]);
  const [mentionType, setMentionType] = useState<'approval' | 'feedback' | 'collaboration'>('approval');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Dummy peer data
  const availablePeers = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@company.com' },
    { id: '2', name: 'Michael Chen', email: 'michael@company.com' },
    { id: '3', name: 'Jamie Wilson', email: 'jamie@company.com' },
    { id: '4', name: 'Alex Rivera', email: 'alex@company.com' },
    { id: '5', name: 'Taylor Kim', email: 'taylor@company.com' },
  ];

  // Dummy questions for different sections
  const questionFlows = {
    basic: [
      'What is your current job title?',
      'Which department do you work in?',
      'Who do you report to directly?',
      'How long have you been in this role?'
    ],
    responsibilities: [
      'What are your main daily responsibilities?',
      'What projects are you currently working on?',
      'Which tasks take up most of your time?',
      'Do you manage any direct reports?'
    ],
    skills: [
      'What technical skills do you use regularly?',
      'What software or tools do you work with?',
      'What qualifications are essential for your role?',
      'What experience is most valuable for this position?'
    ]
  };

  const [currentSection, setCurrentSection] = useState<keyof typeof questionFlows>('basic');
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
      mentions: selectedMentions.length > 0 ? selectedMentions : undefined,
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setSelectedMentions([]);

    // Auto-generate next system response
    setTimeout(() => {
      const currentQuestions = questionFlows[currentSection];
      const nextIndex = (questionIndex + 1) % currentQuestions.length;
      
      let nextQuestion = currentQuestions[nextIndex];
      
      // Move to next section if we've gone through all questions
      if (nextIndex === 0 && questionIndex !== 0) {
        const sections = Object.keys(questionFlows) as (keyof typeof questionFlows)[];
        const currentSectionIndex = sections.indexOf(currentSection);
        const nextSection = sections[(currentSectionIndex + 1) % sections.length];
        setCurrentSection(nextSection);
        nextQuestion = `Great! Now let's move to the next section. ${questionFlows[nextSection][0]}`;
        setQuestionIndex(0);
      } else {
        setQuestionIndex(nextIndex);
      }

      const systemResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'system',
        content: nextQuestion,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, systemResponse]);
    }, 1500);
  };

  const handleInputChange = (value: string) => {
    setCurrentMessage(value);
    
    // Check for @ mention
    const atIndex = value.lastIndexOf('@');
    if (atIndex !== -1 && atIndex === value.length - 1) {
      setShowMentionDropdown(true);
      setMentionSearch('');
    } else if (atIndex !== -1 && value[atIndex] === '@') {
      const searchTerm = value.substring(atIndex + 1);
      setMentionSearch(searchTerm);
      setShowMentionDropdown(true);
    } else {
      setShowMentionDropdown(false);
    }
  };

  const handleMentionSelect = (peer: typeof availablePeers[0]) => {
    const mention: Mention = {
      id: peer.id,
      name: peer.name,
      email: peer.email,
      type: mentionType,
    };

    setSelectedMentions(prev => [...prev, mention]);
    
    // Remove the @ and search term from the message
    const atIndex = currentMessage.lastIndexOf('@');
    const newMessage = currentMessage.substring(0, atIndex) + `@${peer.name} `;
    setCurrentMessage(newMessage);
    setShowMentionDropdown(false);
  };

  const filteredPeers = availablePeers.filter(peer =>
    peer.name.toLowerCase().includes(mentionSearch.toLowerCase()) ||
    peer.email.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-chat-bg">
      {/* Header */}
      <div className="border-b bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Job Description Collection</h1>
            <p className="text-sm text-muted-foreground">Section: {currentSection} ({questionIndex + 1}/{questionFlows[currentSection].length})</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-primary">In Progress</Badge>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className="fade-in">
              <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'system' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div className={`chat-bubble ${message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-system'}`}>
                  <p className="text-sm">{message.content}</p>
                  
                  {message.mentions && message.mentions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-xs opacity-75">Mentions:</p>
                      {message.mentions.map((mention) => (
                        <div key={mention.id} className="mention-badge">
                          <AtSign className="w-3 h-3 mr-1" />
                          {mention.name} ({mention.type})
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Mention Dropdown */}
      {showMentionDropdown && (
        <div className="mx-4 mb-2 max-w-4xl mx-auto">
          <Card className="p-2 border shadow-lg">
            <div className="mb-2">
              <label className="text-xs font-medium text-muted-foreground">Mention Type:</label>
              <div className="flex gap-2 mt-1">
                {(['approval', 'feedback', 'collaboration'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={mentionType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMentionType(type)}
                    className="text-xs"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {filteredPeers.map((peer) => (
                <button
                  key={peer.id}
                  onClick={() => handleMentionSelect(peer)}
                  className="w-full p-2 text-left hover:bg-muted rounded-md text-sm transition-colors"
                >
                  <div className="font-medium">{peer.name}</div>
                  <div className="text-xs text-muted-foreground">{peer.email}</div>
                </button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t bg-card p-4">
        <div className="max-w-4xl mx-auto">
          {selectedMentions.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {selectedMentions.map((mention, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <AtSign className="w-3 h-3 mr-1" />
                  {mention.name} ({mention.type})
                  <button
                    onClick={() => setSelectedMentions(prev => prev.filter((_, i) => i !== index))}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex gap-2">
            <Input
              value={currentMessage}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Type your response... (use @ to mention colleagues)"
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} className="btn-corporate">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            Use @ to mention colleagues for approval, feedback, or collaboration
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;