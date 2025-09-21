import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ChatInterface from '@/components/chat/ChatInterface';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import ApprovalDashboard from '@/components/dashboard/ApprovalDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Route based on user role
  switch (user.role) {
    case 'employee':
      return <ChatInterface />;
    
    case 'manager':
    case 'peer':
      return <ApprovalDashboard />;
    
    case 'hr':
    case 'admin':
      return <AdminDashboard />;
    
    default:
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Unknown Role</h1>
            <p className="text-muted-foreground">Your role is not recognized in the system.</p>
          </div>
        </div>
      );
  }
};

export default Dashboard;