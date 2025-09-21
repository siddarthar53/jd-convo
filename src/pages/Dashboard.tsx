import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AIAgentConversation from '@/components/dashboard/AIAgentConversation';
import ReviewApproveJDs from '@/components/dashboard/ReviewApproveJDs';
import PeerApproval from '@/components/dashboard/PeerApproval';
import Chat from '@/components/dashboard/Chat';
import DashboardNotifications from '@/components/dashboard/DashboardNotifications';
import ManagerTab from '@/components/dashboard/ManagerTab';
import { Bot, FileText, Users, MessageCircle, LayoutDashboard, UserCheck } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('ai-conversation');

  if (!user) return null;

  // Check if employee has subordinates (is a manager)
  const isManager = user.role === 'employee' && user.subordinates && user.subordinates.length > 0;

  // Define tabs based on user role
  const getTabs = () => {
    if (user.role === 'hr') {
      return [
        { id: 'ai-conversation', label: 'AI Agent', icon: Bot },
        { id: 'review-approve', label: 'Review JDs', icon: FileText },
        { id: 'peer-approval', label: 'Peer Approval', icon: Users },
        { id: 'chat', label: 'Chat', icon: MessageCircle },
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ];
    } else {
      // Employee tabs
      const tabs = [
        { id: 'ai-conversation', label: 'AI Agent', icon: Bot },
        { id: 'peer', label: 'Peer Requests', icon: Users },
        { id: 'chat', label: 'Chat', icon: MessageCircle },
      ];

      // Add manager tab if employee has subordinates
      if (isManager) {
        tabs.splice(1, 0, { id: 'manager', label: 'Manager', icon: UserCheck });
      }

      return tabs;
    }
  };

  const tabs = getTabs();

  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'ai-conversation':
        return <AIAgentConversation userRole={user.role} />;
        
      case 'review-approve':
        return <ReviewApproveJDs />;
        
      case 'peer-approval':
        return <PeerApproval userRole={user.role} />;
        
      case 'peer':
        return <PeerApproval userRole={user.role} />;
        
      case 'chat':
        return <Chat userRole={user.role} userId={user.id} />;
        
      case 'dashboard':
        return <DashboardNotifications />;
        
      case 'manager':
        return <ManagerTab subordinates={user.subordinates || []} />;
        
      default:
        return <div>Tab content not found</div>;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {user.role === 'hr' ? 'HR Dashboard' : 'Employee Portal'}
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name}
          {isManager && ' (Manager)'}
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="min-h-[600px]">
              {renderTabContent(tab.id)}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Dashboard;