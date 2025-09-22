import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  CheckCircle, 
  XCircle, 
  Edit,
  MessageCircle,
  Clock,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface MentionRequest {
  id: string;
  employeeName: string;
  employeeEmail: string;
  mentionType: 'approval' | 'feedback' | 'collaboration';
  context: string;
  section: string;
  timestamp: Date;
  status: 'pending' | 'approved' | 'rejected' | 'suggested_edit';
  response?: string;
}

const ApprovalDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedMention, setSelectedMention] = useState<MentionRequest | null>(null);
  const [responseText, setResponseText] = useState('');
  const [mentions, setMentions] = useState<MentionRequest[]>([
    {
      id: '1',
      employeeName: 'Alex Rivera',
      employeeEmail: 'alex@company.com',
      mentionType: 'approval',
      context: 'I handle the technical architecture for our web applications, including React, Node.js, and database design. I also mentor junior developers and lead code reviews.',
      section: 'Technical Responsibilities',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      status: 'pending',
    },
    {
      id: '2',
      employeeName: 'Sarah Johnson',
      employeeEmail: 'sarah@company.com',
      mentionType: 'feedback',
      context: 'I collaborate closely with the design team on user experience research and implement marketing campaigns across digital channels.',
      section: 'Cross-functional Collaboration',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      status: 'pending',
    },
    {
      id: '3',
      employeeName: 'Michael Chen',
      employeeEmail: 'michael@company.com',
      mentionType: 'collaboration',
      context: 'I work with the product team to identify customer needs and translate them into sales strategies. I also train new sales representatives.',
      section: 'Strategic Responsibilities',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: 'approved',
      response: 'This accurately reflects our collaboration on product-market fit initiatives.',
    },
  ]);

  const handleAction = (mentionId: string, action: 'approved' | 'rejected' | 'suggested_edit') => {
    setMentions(prev => prev.map(mention => 
      mention.id === mentionId 
        ? { ...mention, status: action, response: responseText }
        : mention
    ));

    toast({
      title: "Response Sent",
      description: `${action.replace('_', ' ')} the mention from ${mentions.find(m => m.id === mentionId)?.employeeName}`,
    });

    setSelectedMention(null);
    setResponseText('');
  };

  const getMentionTypeColor = (type: string) => {
    switch (type) {
      case 'approval': return 'bg-primary/10 text-primary border-primary/20';
      case 'feedback': return 'bg-warning/10 text-warning border-warning/20';
      case 'collaboration': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'suggested_edit': return 'status-pending';
      case 'pending': return 'status-pending';
      default: return 'status-pending';
    }
  };

  const pendingMentions = mentions.filter(m => m.status === 'pending');
  const processedMentions = mentions.filter(m => m.status !== 'pending');

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Peer Approval Dashboard
        </h1>
        <p className="text-muted-foreground">
          Review and respond to mentions in job descriptions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-warning">{pendingMentions.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">
                  {mentions.filter(m => m.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Mentions</p>
                <p className="text-2xl font-bold">{mentions.length}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Mentions */}
      {pendingMentions.length > 0 && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Mentions waiting for your response</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingMentions.map((mention) => (
              <div key={mention.id} className="border rounded-lg p-4 space-y-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{mention.employeeName}</h4>
                      <p className="text-sm text-muted-foreground">{mention.employeeEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getMentionTypeColor(mention.mentionType)}>
                      {mention.mentionType}
                    </Badge>
                    <Badge variant="outline">{mention.section}</Badge>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm">{mention.context}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {mention.timestamp.toLocaleString()}
                  </span>
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedMention(mention);
                            setResponseText('');
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Suggest Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Suggest Edit</DialogTitle>
                          <DialogDescription>
                            Provide feedback for {mention.employeeName}'s job description
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-muted/30 rounded-lg p-3">
                            <p className="text-sm">{mention.context}</p>
                          </div>
                          <Textarea
                            placeholder="Provide your feedback or suggested changes..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            className="min-h-[100px]"
                          />
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              onClick={() => setSelectedMention(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={() => handleAction(mention.id, 'suggested_edit')}
                              disabled={!responseText.trim()}
                            >
                              Send Feedback
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAction(mention.id, 'rejected')}
                      className="text-destructive hover:text-destructive"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                    
                    <Button
                      size="sm"
                      onClick={() => handleAction(mention.id, 'approved')}
                      className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Processed Mentions */}
      {processedMentions.length > 0 && (
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Recently Processed</CardTitle>
            <CardDescription>Your recent responses to mentions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {processedMentions.map((mention) => (
              <div key={mention.id} className="border rounded-lg p-4 space-y-3 opacity-75">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{mention.employeeName}</h4>
                      <p className="text-xs text-muted-foreground">{mention.section}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(mention.status)}>
                    {mention.status.replace('_', ' ')}
                  </Badge>
                </div>

                {mention.response && (
                  <div className="bg-muted/30 rounded-lg p-3">
                    <p className="text-sm">{mention.response}</p>
                  </div>
                )}

                <span className="text-xs text-muted-foreground">
                  {mention.timestamp.toLocaleString()}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApprovalDashboard;