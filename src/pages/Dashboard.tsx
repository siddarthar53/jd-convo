import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  FileCheck, 
  Users, 
  UserCheck, 
  Send,
  BarChart3,
  ClipboardCheck
} from 'lucide-react';

// Tab Components
import ChatInterface from '@/components/chat/ChatInterface';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ApprovalDashboard from '@/components/dashboard/ApprovalDashboard';
import ManagerTab from '@/components/dashboard/ManagerTab';
import PeerApprovalTab from '@/components/dashboard/PeerApprovalTab';
import CollaborationTab from '@/components/dashboard/CollaborationTab';
import ReminderTab from '@/components/dashboard/ReminderTab';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('conversation');

  if (!user) return null;

  const isManager = user.role === 'employee' && user.subordinates && user.subordinates.length > 0;

  // HR Dashboard Tabs
  if (user.role === 'hr') {
    return (
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="flex h-16 items-center px-6">
            <h1 className="text-lg font-semibold">HR Admin Dashboard</h1>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b">
            <TabsList className="grid w-full grid-cols-5 rounded-none bg-transparent h-auto p-0">
              <TabsTrigger 
                value="conversation" 
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <MessageSquare className="h-4 w-4" />
                AI Agent Conversation
              </TabsTrigger>
              <TabsTrigger 
                value="review" 
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <FileCheck className="h-4 w-4" />
                Review/Approve JDs
              </TabsTrigger>
              <TabsTrigger 
                value="peer-approval" 
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <UserCheck className="h-4 w-4" />
                Peer Approval
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <Users className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard/Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="conversation" className="mt-0 border-0 p-0">
            <ChatInterface />
          </TabsContent>
          
          <TabsContent value="review" className="mt-0 border-0 p-0">
            <ApprovalDashboard />
          </TabsContent>
          
          <TabsContent value="peer-approval" className="mt-0 border-0 p-0">
            <PeerApprovalTab />
          </TabsContent>
          
          <TabsContent value="chat" className="mt-0 border-0 p-0">
            <div className="p-6">
              <div className="text-center space-y-4">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">Employee Chat</h3>
                  <p className="text-muted-foreground">Chat with employees and groups (Coming soon)</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-0 border-0 p-0">
            <AdminDashboard />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Employee Dashboard Tabs (with conditional Manager tab)
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-lg font-semibold">
            Employee Dashboard {isManager && '(Manager)'}
          </h1>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className={`grid w-full ${isManager ? 'grid-cols-4' : 'grid-cols-3'} rounded-none bg-transparent h-auto p-0`}>
            <TabsTrigger 
              value="conversation" 
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <MessageSquare className="h-4 w-4" />
              JD Conversation
            </TabsTrigger>
            
            {isManager && (
              <TabsTrigger 
                value="manager" 
                className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                <ClipboardCheck className="h-4 w-4" />
                Downline JD Approvals
              </TabsTrigger>
            )}
            
            <TabsTrigger 
              value="peer-mentions" 
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <UserCheck className="h-4 w-4" />
              Peer Mentions
            </TabsTrigger>
            
            <TabsTrigger 
              value="chat" 
              className="flex items-center gap-2 px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              <Users className="h-4 w-4" />
              Chat
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="conversation" className="mt-0 border-0 p-0">
          <ChatInterface />
        </TabsContent>
        
        {isManager && (
          <TabsContent value="manager" className="mt-0 border-0 p-0">
            <ManagerTab />
          </TabsContent>
        )}
        
        <TabsContent value="peer-mentions" className="mt-0 border-0 p-0">
          <ApprovalDashboard />
        </TabsContent>
        
        <TabsContent value="chat" className="mt-0 border-0 p-0">
          <div className="p-6">
            <div className="text-center space-y-4">
              <Users className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h3 className="text-lg font-semibold">Team Chat</h3>
                <p className="text-muted-foreground">Send/receive messages with HR, managers or peers (Coming soon)</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;