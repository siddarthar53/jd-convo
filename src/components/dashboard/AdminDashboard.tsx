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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dummy data
  const employeeData = [
    {
      id: '1',
      name: 'Alex Rivera',
      email: 'alex@company.com',
      department: 'Engineering',
      reportingManager: 'Sarah Johnson',
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
      reportingManager: 'Michael Chen',
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
      reportingManager: 'Jamie Wilson',
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
      reportingManager: 'Taylor Kim',
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
      reportingManager: 'Alex Rivera',
      progress: 60,
      status: 'in_progress',
      lastActivity: '1 hour ago',
      mentions: 2,
    },
    {
      id: '6',
      name: 'Emma Davis',
      email: 'emma@company.com',
      department: 'Engineering',
      reportingManager: 'Sarah Johnson',
      progress: 75,
      status: 'in_progress',
      lastActivity: '3 hours ago',
      mentions: 1,
    },
    {
      id: '7',
      name: 'James Brown',
      email: 'james@company.com',
      department: 'Marketing',
      reportingManager: 'Michael Chen',
      progress: 100,
      status: 'completed',
      lastActivity: '2 days ago',
      mentions: 0,
    },
    {
      id: '8',
      name: 'Lisa Wang',
      email: 'lisa@company.com',
      department: 'Sales',
      reportingManager: 'Jamie Wilson',
      progress: 30,
      status: 'in_progress',
      lastActivity: '5 hours ago',
      mentions: 2,
    },
    {
      id: '9',
      name: 'David Martinez',
      email: 'david@company.com',
      department: 'Design',
      reportingManager: 'Taylor Kim',
      progress: 0,
      status: 'not_started',
      lastActivity: '2 weeks ago',
      mentions: 0,
    },
    {
      id: '10',
      name: 'Maria Garcia',
      email: 'maria@company.com',
      department: 'Product',
      reportingManager: 'Alex Rivera',
      progress: 90,
      status: 'in_progress',
      lastActivity: '1 hour ago',
      mentions: 1,
    },
    {
      id: '11',
      name: 'Robert Smith',
      email: 'robert@company.com',
      department: 'Engineering',
      reportingManager: 'Sarah Johnson',
      progress: 100,
      status: 'completed',
      lastActivity: '3 days ago',
      mentions: 0,
    },
    {
      id: '12',
      name: 'Jennifer Lee',
      email: 'jennifer@company.com',
      department: 'Marketing',
      reportingManager: 'Michael Chen',
      progress: 20,
      status: 'in_progress',
      lastActivity: '6 hours ago',
      mentions: 3,
    },
  ];

  const stats = {
    total: employeeData.length,
    completed: employeeData.filter(emp => emp.status === 'completed').length,
    inProgress: employeeData.filter(emp => emp.status === 'in_progress').length,
    notStarted: employeeData.filter(emp => emp.status === 'not_started').length,
    avgProgress: Math.round(employeeData.reduce((sum, emp) => sum + emp.progress, 0) / employeeData.length),
  };

  // Pagination logic
  const totalPages = Math.ceil(employeeData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employeeData.slice(startIndex, endIndex);

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
              {/* Data Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.length === currentEmployees.length && currentEmployees.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedEmployees(currentEmployees.map(emp => emp.id));
                            } else {
                              setSelectedEmployees([]);
                            }
                          }}
                          className="rounded border-border"
                        />
                      </TableHead>
                      <TableHead className="font-semibold">Employee Name</TableHead>
                      <TableHead className="font-semibold">Department</TableHead>
                      <TableHead className="font-semibold">Reporting Manager</TableHead>
                      <TableHead className="font-semibold">Progress</TableHead>
                      <TableHead className="font-semibold">Last Activity</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentEmployees.map((employee) => (
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
                          <span className="text-sm">{employee.reportingManager}</span>
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
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(employee.status)}>
                              {getStatusText(employee.status)}
                            </Badge>
                            {employee.mentions > 0 && (
                              <Badge variant="outline" className="text-xs">
                                <MessageCircle className="w-3 h-3 mr-1" />
                                {employee.mentions}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to {Math.min(endIndex, employeeData.length)} of {employeeData.length} employees
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
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