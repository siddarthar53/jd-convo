import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Send,
  BarChart3,
  MessageCircle,
  UserCheck
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Dummy data
  const employeeData = [
    {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex@company.com',
      department: 'Engineering',
      progress: 85,
      status: 'in_progress',
      lastActivity: '2 hours ago',
      mentions: 3,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@company.com',
      department: 'Marketing',
      progress: 100,
      status: 'completed',
      lastActivity: '1 day ago',
      mentions: 0,
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@company.com',
      department: 'Sales',
      progress: 45,
      status: 'in_progress',
      lastActivity: '4 hours ago',
      mentions: 1,
    },
    {
      id: '4',
      name: 'Jamie Wilson',
      email: 'jamie@company.com',
      department: 'Design',
      progress: 0,
      status: 'not_started',
      lastActivity: '1 week ago',
      mentions: 0,
    },
    {
      id: '5',
      name: 'Taylor Kim',
      email: 'taylor@company.com',
      department: 'Product',
      progress: 60,
      status: 'in_progress',
      lastActivity: '1 hour ago',
      mentions: 2,
    },
  ];

  const stats = {
    total: employeeData.length,
    completed: employeeData.filter(emp => emp.status === 'completed').length,
    inProgress: employeeData.filter(emp => emp.status === 'in_progress').length,
    notStarted: employeeData.filter(emp => emp.status === 'not_started').length,
    avgProgress: Math.round(employeeData.reduce((sum, emp) => sum + emp.progress, 0) / employeeData.length),
  };

  const collaborationData = [
    { department: 'Engineering', mentions: 12, collaborations: 8 },
    { department: 'Marketing', mentions: 8, collaborations: 5 },
    { department: 'Sales', mentions: 6, collaborations: 4 },
    { department: 'Design', mentions: 10, collaborations: 7 },
    { department: 'Product', mentions: 9, collaborations: 6 },
  ];

  const handleSendReminder = (employeeIds: string[]) => {
    toast({
      title: "Reminders Sent",
      description: `Sent reminders to ${employeeIds.length} employee(s)`,
    });
    setSelectedEmployees([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-approved';
      case 'in_progress': return 'status-pending';
      case 'not_started': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'not_started': return 'Not Started';
      default: return 'Unknown';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">HR Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor JD collection progress across the organization</p>
        </div>
        <Button
          onClick={() => handleSendReminder(selectedEmployees)}
          disabled={selectedEmployees.length === 0}
          className="btn-corporate"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Reminders ({selectedEmployees.length})
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-warning">{stats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Progress</p>
                <p className="text-2xl font-bold">{stats.avgProgress}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Progress Table */}
        <Card className="lg:col-span-2 card-elevated">
          <CardHeader>
            <CardTitle>Employee Progress</CardTitle>
            <CardDescription>Track individual JD collection status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employeeData.map((employee) => (
                <div key={employee.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEmployees(prev => [...prev, employee.id]);
                          } else {
                            setSelectedEmployees(prev => prev.filter(id => id !== employee.id));
                          }
                        }}
                        className="rounded border-border"
                      />
                      <div>
                        <h4 className="font-medium">{employee.name}</h4>
                        <p className="text-sm text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {employee.mentions > 0 && (
                        <Badge variant="outline" className="text-xs">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          {employee.mentions}
                        </Badge>
                      )}
                      <Badge className={getStatusColor(employee.status)}>
                        {getStatusText(employee.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{employee.progress}%</span>
                    </div>
                    <Progress value={employee.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Last activity: {employee.lastActivity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Collaboration Heatmap */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Collaboration Activity</CardTitle>
            <CardDescription>Cross-department mentions & collaborations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collaborationData.map((dept) => (
                <div key={dept.department} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{dept.department}</span>
                    <div className="flex gap-2 text-xs">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {dept.mentions}
                      </span>
                      <span className="flex items-center gap-1">
                        <UserCheck className="w-3 h-3" />
                        {dept.collaborations}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-primary/10 rounded p-2 text-center">
                      <div className="text-sm font-medium text-primary">{dept.mentions}</div>
                      <div className="text-xs text-muted-foreground">Mentions</div>
                    </div>
                    <div className="bg-accent/10 rounded p-2 text-center">
                      <div className="text-sm font-medium text-accent">{dept.collaborations}</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;