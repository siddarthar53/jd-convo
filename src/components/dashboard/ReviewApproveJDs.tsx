import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, FileText, User } from 'lucide-react';

interface JobDescription {
  id: string;
  employeeName: string;
  employeeId: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  submittedDate: Date;
  content: string;
}

const ReviewApproveJDs: React.FC = () => {
  const [jobDescriptions] = useState<JobDescription[]>([
    {
      id: '1',
      employeeName: 'Alex Rivera',
      employeeId: '3',
      title: 'Senior Frontend Developer',
      status: 'pending',
      submittedDate: new Date('2024-01-15'),
      content: 'Responsible for developing and maintaining user interfaces using React, TypeScript, and modern web technologies...'
    },
    {
      id: '2',
      employeeName: 'Jamie Wilson',
      employeeId: '4',
      title: 'UX Designer',
      status: 'in-review',
      submittedDate: new Date('2024-01-14'),
      content: 'Design user experiences and interfaces for web applications, conduct user research, create wireframes and prototypes...'
    },
    {
      id: '3',
      employeeName: 'Michael Chen',
      employeeId: '2',
      title: 'Engineering Manager',
      status: 'approved',
      submittedDate: new Date('2024-01-10'),
      content: 'Lead engineering team, oversee project delivery, mentor team members, collaborate with stakeholders...'
    }
  ]);

  const [selectedJD, setSelectedJD] = useState<JobDescription | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in-review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in-review':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filterByStatus = (status: string) => {
    if (status === 'all') return jobDescriptions;
    return jobDescriptions.filter(jd => jd.status === status);
  };

  const handleApprove = (id: string) => {
    console.log('Approving JD:', id);
    // Mock approval action
  };

  const handleReject = (id: string) => {
    console.log('Rejecting JD:', id);
    // Mock rejection action
  };

  return (
    <div className="h-full flex gap-6">
      <div className="w-1/3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Job Descriptions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mx-6 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-review">Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
              </TabsList>
              
              {['all', 'pending', 'in-review', 'approved'].map((status) => (
                <TabsContent key={status} value={status} className="mt-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-6 pt-0 space-y-3">
                      {filterByStatus(status).map((jd) => (
                        <div
                          key={jd.id}
                          className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedJD?.id === jd.id ? 'border-primary bg-primary/5' : ''
                          }`}
                          onClick={() => setSelectedJD(jd)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{jd.employeeName}</span>
                            </div>
                            {getStatusIcon(jd.status)}
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{jd.title}</h3>
                          <Badge className={`text-xs ${getStatusColor(jd.status)}`}>
                            {jd.status.replace('-', ' ')}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-2">
                            Submitted: {jd.submittedDate.toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {selectedJD ? `Review: ${selectedJD.title}` : 'Select a Job Description'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedJD ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedJD.employeeName}</h3>
                    <p className="text-sm text-muted-foreground">{selectedJD.title}</p>
                  </div>
                  <Badge className={getStatusColor(selectedJD.status)}>
                    {selectedJD.status.replace('-', ' ')}
                  </Badge>
                </div>

                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  <p className="text-sm leading-relaxed">{selectedJD.content}</p>
                </ScrollArea>

                {selectedJD.status === 'pending' && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApprove(selectedJD.id)}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedJD.id)}
                      className="flex-1"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-center">
                <div>
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a job description from the list to review
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

export default ReviewApproveJDs;