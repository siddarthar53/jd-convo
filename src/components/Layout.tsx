import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  LogOut, 
  User, 
  Building2,
  MessageCircle,
  BarChart3,
  CheckSquare
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  if (!user) return <>{children}</>;

  const getRoleIcon = () => {
    if (user?.role === 'hr') return <BarChart3 className="w-5 h-5" />;
    if (user?.role === 'employee' && user?.subordinates?.length) return <CheckSquare className="w-5 h-5" />; // Manager
    return <MessageCircle className="w-5 h-5" />; // Regular employee
  };

  const getRoleColor = () => {
    if (user?.role === 'hr') return 'text-warning';
    if (user?.role === 'employee' && user?.subordinates?.length) return 'text-accent'; // Manager
    return 'text-primary'; // Regular employee
  };

  const getRoleDisplayName = () => {
    if (user?.role === 'hr') return 'HR Admin';
    if (user?.role === 'employee' && user?.subordinates?.length) return 'Manager';
    return 'Employee';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">JD Platform</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Card className="px-4 py-2 border-dashed">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-full bg-muted ${getRoleColor()}`}>
                  {getRoleIcon()}
                </div>
                <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-muted-foreground">{getRoleDisplayName()}</p>
                </div>
              </div>
            </Card>

            <Button
              variant="outline"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;