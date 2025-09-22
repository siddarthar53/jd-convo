import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Send,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  Mail
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const ReminderTab = () => {
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // Mock employee data for reminders
  const employeesNeedingReminders = [
    {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex@company.com',
      department: 'Engineering',
      progress: 25,
      status: 'in_progress',
      lastActivity: '1 week ago',
      daysInactive: 7,
      priority: 'medium',
    },
    {
      id: '2',
      name: 'Jamie Wilson',
      email: 'jamie@company.com',
      department: 'Design',
      progress: 0,
      status: 'not_started',
      lastActivity: '2 weeks ago',
      daysInactive: 14,
      priority: 'high',
    },
    {
      id: '3',
      name: 'David Martinez',
      email: 'david@company.com',
      department: 'Sales',
      progress: 0,
      status: 'not_started',
      lastActivity: '3 weeks ago',
      daysInactive: 21,
      priority: 'critical',
    },
    {
      id: '4',
      name: 'Lisa Wang',
      email: 'lisa@company.com',
      department: 'Marketing',
      progress: 15,
      status: 'in_progress',
      lastActivity: '10 days ago',
      daysInactive: 10,
      priority: 'medium',
    },
    {
      id: '5',
      name: 'Robert Smith',
      email: 'robert@company.com',
      department: 'Product',
      progress: 5,
      status: 'in_progress',
      lastActivity: '2 weeks ago',
      daysInactive: 14,
      priority: 'high',
    },
  ];

  const stats = {
    total: employeesNeedingReminders.length,
    notStarted: employeesNeedingReminders.filter(emp => emp.status === 'not_started').length,
    stalled: employeesNeedingReminders.filter(emp => emp.status === 'in_progress' && emp.daysInactive > 7).length,
    critical: employeesNeedingReminders.filter(emp => emp.priority === 'critical').length,
  };

  const handleSendReminders = (employeeIds: string[], reminderType: 'gentle' | 'urgent' | 'final') => {
    const employees = employeesNeedingReminders.filter(emp => employeeIds.includes(emp.id));
    toast({
      title: "Reminders Sent",
      description: `Sent ${reminderType} reminders to ${employees.length} employee(s)`,
    });
    setSelectedEmployees([]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-approved';
      case 'in_progress': return 'status-pending';
      case 'not_started': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Employee Reminders</h1>
          <p className="text-muted-foreground">
            Send reminders to employees who haven't started or are stalled in their JD collection
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => handleSendReminders(selectedEmployees, 'gentle')}
            disabled={selectedEmployees.length === 0}
            variant="outline"
            size="sm"
          >
            <Mail className="w-4 h-4 mr-2" />
            Gentle Reminder
          </Button>
          <Button
            onClick={() => handleSendReminders(selectedEmployees, 'urgent')}
            disabled={selectedEmployees.length === 0}
            variant="outline"
            size="sm"
            className="text-orange-600"
          >
            <Send className="w-4 h-4 mr-2" />
            Urgent Reminder
          </Button>
          <Button
            onClick={() => handleSendReminders(selectedEmployees, 'final')}
            disabled={selectedEmployees.length === 0}
            variant="destructive"
            size="sm"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Final Notice
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Need Reminders</p>
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
                <p className="text-sm font-medium text-muted-foreground">Not Started</p>
                <p className="text-2xl font-bold text-destructive">{stats.notStarted}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Stalled</p>
                <p className="text-2xl font-bold text-warning">{stats.stalled}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">{stats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employees Needing Reminders */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Employees Needing Reminders</CardTitle>
          <CardDescription>
            Select employees to send reminders about their JD collection progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.length === employeesNeedingReminders.length && employeesNeedingReminders.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEmployees(employeesNeedingReminders.map(emp => emp.id));
                        } else {
                          setSelectedEmployees([]);
                        }
                      }}
                      className="rounded border-border"
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Progress</TableHead>
                  <TableHead className="font-semibold">Last Activity</TableHead>
                  <TableHead className="font-semibold">Days Inactive</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employeesNeedingReminders.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-muted/30">
                    <TableCell>
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
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{employee.department}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-[120px]">
                        <div className="flex items-center justify-between text-sm">
                          <span>{employee.progress}%</span>
                        </div>
                        <Progress value={employee.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{employee.lastActivity}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{employee.daysInactive} days</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(employee.priority)}>
                        {employee.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(employee.status)}>
                        {employee.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {selectedEmployees.length > 0 && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <strong>{selectedEmployees.length}</strong> employee(s) selected
                </div>
                <div className="text-xs text-muted-foreground">
                  Click a reminder type above to send notifications
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReminderTab;