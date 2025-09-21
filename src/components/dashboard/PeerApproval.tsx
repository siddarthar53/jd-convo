import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, XCircle, Clock, Users, MessageSquare, User } from 'lucide-react';

interface PeerRequest {
  id: string;
  type: 'approval' | 'feedback' | 'collaboration';
  fromUser: string;
  fromUserName: string;
  toUser: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: Date;
  jobDescription?: string;
}

interface PeerApprovalProps {
  userRole: 'hr' | 'employee';
}

const PeerApproval: React.FC<PeerApprovalProps> = ({ userRole }) => {
  const [peerRequests] = useState<PeerRequest[]>([
    {
      id: '1',
      type: 'approval',
      fromUser: '3',
      fromUserName: 'Alex Rivera',
      toUser: '4',
      title: 'Job Description Approval',
      description: 'Please review and approve my job description for Senior Frontend Developer role',
      status: 'pending',
      submittedDate: new Date('2024-01-15'),
      jobDescription: 'Responsible for developing and maintaining user interfaces using React, TypeScript...'
    },
    {
      id: '2',
      type: 'feedback',
      fromUser: '4',
      fromUserName: 'Jamie Wilson',
      toUser: '3',
      title: 'Design System Feedback',
      description: 'Could you provide feedback on the new design system components?',
      status: 'pending',
      submittedDate: new Date('2024-01-14')
    },
    {
      id: '3',
      type: 'collaboration',
      fromUser: '2',
      fromUserName: 'Michael Chen',
      toUser: '3',
      title: 'Project Collaboration',
      description: 'Would like to include you in the new mobile app project',
      status: 'approved',
      submittedDate: new Date('2024-01-10')
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<PeerRequest | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'feedback':
        return <MessageSquare className="h-4 w-4 text-orange-500" />;
      case 'collaboration':
        return <Users className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'approval':
        return 'bg-blue-100 text-blue-800';
      case 'feedback':
        return 'bg-orange-100 text-orange-800';
      case 'collaboration':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filterByStatus = (status: string) => {
    if (status === 'all') return peerRequests;
    return peerRequests.filter(req => req.status === status);
  };

  const handleApprove = (id: string) => {
    console.log('Approving request:', id);
    // Mock approval action
  };

  const handleReject = (id: string) => {
    console.log('Rejecting request:', id);
    // Mock rejection action
  };

  return (
    <div className="h-full flex gap-6">
      <div className="w-1/3">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {userRole === 'hr' ? 'All Peer Requests' : 'Peer Requests'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mx-6 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <TabsContent key={status} value={status} className="mt-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-6 pt-0 space-y-3">
                      {filterByStatus(status).map((request) => (
                        <div
                          key={request.id}
                          className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedRequest?.id === request.id ? 'border-primary bg-primary/5' : ''
                          }`}
                          onClick={() => setSelectedRequest(request)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{request.fromUserName}</span>
                            </div>
                            {getTypeIcon(request.type)}
                          </div>
                          <h3 className="font-semibold text-sm mb-2">{request.title}</h3>
                          <div className="flex gap-2 mb-2">
                            <Badge className={`text-xs ${getTypeColor(request.type)}`}>
                              {request.type}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(request.status)}`}>
                              {request.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {request.submittedDate.toLocaleDateString()}
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
              {selectedRequest ? `${selectedRequest.type.charAt(0).toUpperCase() + selectedRequest.type.slice(1)} Request` : 'Select a Request'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRequest ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{selectedRequest.fromUserName}</h3>
                    <p className="text-sm text-muted-foreground">{selectedRequest.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getTypeColor(selectedRequest.type)}>
                      {selectedRequest.type}
                    </Badge>
                    <Badge className={getStatusColor(selectedRequest.status)}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
                </div>

                {selectedRequest.jobDescription && (
                  <div>
                    <h4 className="font-medium mb-2">Job Description</h4>
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                      <p className="text-sm leading-relaxed">{selectedRequest.jobDescription}</p>
                    </ScrollArea>
                  </div>
                )}

                <div className="text-sm text-muted-foreground">
                  <p>Submitted: {selectedRequest.submittedDate.toLocaleDateString()}</p>
                </div>

                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleApprove(selectedRequest.id)}
                      className="flex-1"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(selectedRequest.id)}
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
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select a peer request to review
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

export default PeerApproval;