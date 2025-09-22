import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserCheck, Users, MessageCircle } from 'lucide-react';

const PeerApprovalTab = () => {
  // Mock data for peer approval requests across all employees
  const allPeerRequests = [
    {
      id: '1',
      employeeName: 'Alex Rivera',
      mentionType: 'approval',
      context: 'Cross-functional collaboration on API integration project',
      status: 'pending',
      department: 'Engineering',
      requestedAt: '2 hours ago',
    },
    {
      id: '2', 
      employeeName: 'Jamie Wilson',
      mentionType: 'feedback',
      context: 'Design review for mobile app interface',
      status: 'pending',
      department: 'Design',
      requestedAt: '4 hours ago',
    },
    {
      id: '3',
      employeeName: 'Taylor Kim',
      mentionType: 'collaboration',
      context: 'Product roadmap planning and feature prioritization',
      status: 'approved',
      department: 'Product',
      requestedAt: '1 day ago',
    },
    {
      id: '4',
      employeeName: 'Maria Garcia',
      mentionType: 'approval',
      context: 'Marketing campaign strategy and execution',
      status: 'pending',
      department: 'Marketing',
      requestedAt: '6 hours ago',
    },
  ];

  const stats = {
    total: allPeerRequests.length,
    pending: allPeerRequests.filter(req => req.status === 'pending').length,
    approved: allPeerRequests.filter(req => req.status === 'approved').length,
    rejected: allPeerRequests.filter(req => req.status === 'rejected').length,
  };

  const getMentionTypeColor = (type: string) => {
    switch (type) {
      case 'approval': return 'mention-approval';
      case 'feedback': return 'mention-feedback';
      case 'collaboration': return 'mention-collaboration';
      default: return 'mention-approval';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return 'status-pending';
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">All Employee Peer Approvals</h1>
        <p className="text-muted-foreground">
          Monitor peer approval requests across all employees in the organization
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Requests</p>
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
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{stats.approved}</p>
              </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
              </div>
              <UserCheck className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Peer Requests */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>All Employee Peer Requests</CardTitle>
          <CardDescription>
            View all peer approval requests across the organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {allPeerRequests.map((request) => (
            <div
              key={request.id}
              className="border rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{request.employeeName}</h3>
                    <Badge className={getMentionTypeColor(request.mentionType)}>
                      {request.mentionType}
                    </Badge>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {request.context}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Department: {request.department}</span>
                    <span>Requested: {request.requestedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {allPeerRequests.length === 0 && (
            <div className="text-center py-8">
              <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Peer Requests</h3>
              <p className="text-muted-foreground">
                No peer approval requests found across the organization.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerApprovalTab;