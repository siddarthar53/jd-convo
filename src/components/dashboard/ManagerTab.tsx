import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, User, FileText, Send } from 'lucide-react';

interface DirectReport {
  id: string;
  name: string;
  email: string;
  title: string;
  jdStatus: 'not-started' | 'in-progress' | 'submitted' | 'approved' | 'needs-revision';
  jdProgress: number;
  lastUpdate: Date;
  jobDescription?: string;
}

interface ManagerTabProps {
  subordinates: string[];
}

const ManagerTab: React.FC<ManagerTabProps> = ({ subordinates }) => {
  const [directReports] = useState<DirectReport[]>([
    {
      id: '3',
      name: 'Alex Rivera',
      email: 'alex@demo.com',
      title: 'Senior Frontend Developer',
      jdStatus: 'submitted' as const,
      jdProgress: 100,
      lastUpdate: new Date('2024-01-15'),
      jobDescription: 'Responsible for developing and maintaining user interfaces using React, TypeScript, and modern web technologies. Lead frontend architecture decisions and mentor junior developers.'
    },
    {
      id: '4',
      name: 'Jamie Wilson',
      email: 'jamie@demo.com',
      title: 'UX Designer',
      jdStatus: 'in-progress' as const,
      jdProgress: 75,
      lastUpdate: new Date('2024-01-14')
    },
    {
      id: '5',
      name: 'Taylor Brown',
      email: 'taylor@demo.com',
      title: 'Backend Developer',
      jdStatus: 'not-started' as const,
      jdProgress: 0,
      lastUpdate: new Date('2024-01-10')
    }
  ].filter(report => subordinates.includes(report.id)));

  const [selectedReport, setSelectedReport] = useState<DirectReport | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs-revision':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'submitted':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'needs-revision':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleApprove = (reportId: string) => {
    console.log('Approving JD for:', reportId);
    // Mock approval action
  };

  const handleReject = (reportId: string) => {
    console.log('Requesting revision for JD:', reportId);
    // Mock rejection action
  };

  const handleSendReminder = (reportId: string) => {
    console.log('Sending reminder to:', reportId);
    // Mock reminder action
  };

  return (
    <div className="h-full flex gap-6">
      <div className="w-1/3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Direct Reports ({directReports.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              <div className="p-6 pt-0 space-y-3">
                {directReports.map((report) => (
                  <div
                    key={report.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedReport?.id === report.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-sm">{report.name}</h3>
                        <p className="text-xs text-muted-foreground">{report.title}</p>
                      </div>
                      {getStatusIcon(report.jdStatus)}
                    </div>
                    
                    <div className="space-y-2">
                      <Badge className={`text-xs ${getStatusColor(report.jdStatus)}`}>
                        {report.jdStatus.replace('-', ' ')}
                      </Badge>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs text-muted-foreground">{report.jdProgress}%</span>
                        </div>
                        <Progress value={report.jdProgress} className="h-2" />
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Last update: {report.lastUpdate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {selectedReport ? `${selectedReport.name} - Job Description` : 'Select a Direct Report'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedReport ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedReport.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedReport.title}</p>
                    <p className="text-sm text-muted-foreground">{selectedReport.email}</p>
                  </div>
                  <Badge className={getStatusColor(selectedReport.jdStatus)}>
                    {selectedReport.jdStatus.replace('-', ' ')}
                  </Badge>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Progress</h4>
                  <div className="flex items-center gap-4">
                    <Progress value={selectedReport.jdProgress} className="flex-1" />
                    <span className="text-sm font-medium">{selectedReport.jdProgress}%</span>
                  </div>
                </div>

                {selectedReport.jobDescription ? (
                  <div>
                    <h4 className="font-medium mb-2">Job Description</h4>
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      <p className="text-sm leading-relaxed">{selectedReport.jobDescription}</p>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Job description not yet submitted
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  {selectedReport.jdStatus === 'submitted' && (
                    <>
                      <Button
                        onClick={() => handleApprove(selectedReport.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReject(selectedReport.id)}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Request Revision
                      </Button>
                    </>
                  )}
                  
                  {(selectedReport.jdStatus === 'not-started' || selectedReport.jdStatus === 'in-progress') && (
                    <Button
                      variant="outline"
                      onClick={() => handleSendReminder(selectedReport.id)}
                      className="flex-1"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminder
                    </Button>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Last updated: {selectedReport.lastUpdate.toLocaleDateString()}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-center">
                <div>
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a direct report to view their job description progress
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManagerTab;