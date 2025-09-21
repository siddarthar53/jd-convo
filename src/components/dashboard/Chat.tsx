import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Search, MessageCircle, Users } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: string[];
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  avatar: string;
}

interface ChatProps {
  userRole: 'hr' | 'employee';
  userId: string;
}

const Chat: React.FC<ChatProps> = ({ userRole, userId }) => {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Sarah Johnson (HR)',
      type: 'direct',
      participants: ['1', userId],
      lastMessage: 'Hi! How is your job description coming along?',
      lastMessageTime: new Date('2024-01-15T10:30:00'),
      unreadCount: 1,
      avatar: 'SJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      type: 'direct',
      participants: ['2', userId],
      lastMessage: 'Thanks for the feedback on the quarterly goals',
      lastMessageTime: new Date('2024-01-15T09:15:00'),
      unreadCount: 0,
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Engineering Team',
      type: 'group',
      participants: ['2', '3', '4', userId],
      lastMessage: 'Meeting scheduled for tomorrow at 2 PM',
      lastMessageTime: new Date('2024-01-14T16:45:00'),
      unreadCount: 3,
      avatar: 'ET'
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (selectedConversation) {
      // Mock loading messages for selected conversation
      setMessages([
        {
          id: '1',
          senderId: selectedConversation.participants[0],
          senderName: selectedConversation.name.split(' ')[0],
          content: 'Hi! How is your job description coming along?',
          timestamp: new Date('2024-01-15T10:30:00'),
          isOwn: false
        },
        {
          id: '2',
          senderId: userId,
          senderName: 'You',
          content: 'Making good progress! Should have it ready by tomorrow.',
          timestamp: new Date('2024-01-15T10:35:00'),
          isOwn: true
        }
      ]);
    }
  }, [selectedConversation, userId]);

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: userId,
      senderName: 'You',
      content: currentMessage,
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');

    // Mock response after a delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedConversation.participants.find(p => p !== userId) || '1',
        senderName: selectedConversation.name.split(' ')[0],
        content: 'Thanks for the update! Let me know if you need any help.',
        timestamp: new Date(),
        isOwn: false
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex gap-6">
      {/* Conversations List */}
      <div className="w-1/3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Conversations
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="p-6 pt-0 space-y-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{conversation.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                          <div className="flex items-center gap-2">
                            {conversation.type === 'group' && (
                              <Users className="h-3 w-3 text-muted-foreground" />
                            )}
                            {conversation.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mb-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.lastMessageTime?.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Messages Area */}
      <div className="flex-1">
        <Card className="h-full flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{selectedConversation.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{selectedConversation.name}</span>
                    {selectedConversation.type === 'group' && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedConversation.participants.length} members
                      </Badge>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex gap-2 max-w-[80%] ${message.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                          {!message.isOwn && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {message.senderName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`rounded-lg p-3 ${
                              message.isOwn
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-secondary text-secondary-foreground'
                            }`}
                          >
                            {!message.isOwn && (
                              <p className="text-xs font-medium mb-1">{message.senderName}</p>
                            )}
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="p-6 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!currentMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Chat;