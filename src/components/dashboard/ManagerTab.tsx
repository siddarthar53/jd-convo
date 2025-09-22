import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  MessageSquare,
  Send
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
import { useAuth } from '@/context/AuthContext';

const ManagerTab = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  // Mock data for direct reports
  const directReports = [
    {
      id: '3',
      name: 'Alex Rivera',
      email: 'alex@company.com',
      department: 'Engineering',
      progress: 75,
      status: 'in_progress',
      lastActivity: '2 hours ago',
      pendingApprovals: 1,
      completedSections: 6,
      totalSections: 8,
    },
    {
      id: '4', 
      name: 'Jamie Wilson',
      email: 'jamie@company.com',
      department: 'Design',
      progress: 45,
      status: 'in_progress',
      lastActivity: '1 day ago',
      pendingApprovals: 0,
      completedSections: 4,
      totalSections: 8,
    },
    {
      id: '5',
      name: 'Taylor Kim',
      email: 'taylor@company.com',
      department: 'Product',
      progress: 100,
      status: 'completed',
      lastActivity: '3 days ago',
      pendingApprovals: 0,
      completedSections: 8,
      totalSections: 8,
    },
  ];

  const stats = {
    total: directReports.length,
    completed: directReports.filter(rep => rep.status === 'completed').length,
    inProgress: directReports.filter(rep => rep.status === 'in_progress').length,
    pendingApprovals: directReports.reduce((sum, rep) => sum + rep.pendingApprovals, 0),
  };

  const handleSendReminder = (reportIds: string[]) => {
    toast({
      title: "Reminders Sent",
      description: `Sent reminders to ${reportIds.length} direct report(s)`,
    });
    setSelectedReports([]);
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
          <h1 className="text-2xl font-bold">Direct Reports - JD Progress</h1>
          <p className="text-muted-foreground">
            Monitor and approve JD submissions from your team members
          </p>
        </div>
        <Button
          onClick={() => handleSendReminder(selectedReports)}
          disabled={selectedReports.length === 0}
          className="btn-corporate"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Reminders ({selectedReports.length})
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
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
                <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
                <p className="text-2xl font-bold text-destructive">{stats.pendingApprovals}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Direct Reports Table */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Direct Reports Progress</CardTitle>
          <CardDescription>
            Track JD collection progress for your team members
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
                      checked={selectedReports.length === directReports.length && directReports.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedReports(directReports.map(rep => rep.id));
                        } else {
                          setSelectedReports([]);
                        }
                      }}
                      className="rounded border-border"
                    />
                  </TableHead>
                  <TableHead className="font-semibold">Employee</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Progress</TableHead>
                  <TableHead className="font-semibold">Sections</TableHead>
                  <TableHead className="font-semibold">Last Activity</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {directReports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-muted/30">
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedReports.includes(report.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedReports(prev => [...prev, report.id]);
                          } else {
                            setSelectedReports(prev => prev.filter(id => id !== report.id));
                          }
                        }}
                        className="rounded border-border"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">{report.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{report.department}</span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2 min-w-[120px]">
                        <div className="flex items-center justify-between text-sm">
                          <span>{report.progress}%</span>
                        </div>
                        <Progress value={report.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{report.completedSections}</span>
                        <span className="text-muted-foreground">/{report.totalSections}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{report.lastActivity}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(report.status)}>
                          {getStatusText(report.status)}
                        </Badge>
                        {report.pendingApprovals > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {report.pendingApprovals} pending
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {report.pendingApprovals > 0 && (
                          <Button variant="outline" size="sm" className="text-xs">
                            Review
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerTab;