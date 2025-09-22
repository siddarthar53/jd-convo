import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  MessageCircle, 
  UserCheck, 
  Users,
  TrendingUp
} from 'lucide-react';

const CollaborationTab = () => {
  // Mock collaboration activity data
  const collaborationData = [
    { 
      department: 'Engineering', 
      mentions: 15, 
      collaborations: 12,
      activeEmployees: 8,
      completionRate: 85
    },
    { 
      department: 'Marketing', 
      mentions: 10, 
      collaborations: 8,
      activeEmployees: 6,
      completionRate: 92
    },
    { 
      department: 'Sales', 
      mentions: 8, 
      collaborations: 6,
      activeEmployees: 5,
      completionRate: 78
    },
    { 
      department: 'Design', 
      mentions: 12, 
      collaborations: 9,
      activeEmployees: 4,
      completionRate: 95
    },
    { 
      department: 'Product', 
      mentions: 11, 
      collaborations: 8,
      activeEmployees: 7,
      completionRate: 88
    },
  ];

  const totalStats = {
    totalMentions: collaborationData.reduce((sum, dept) => sum + dept.mentions, 0),
    totalCollaborations: collaborationData.reduce((sum, dept) => sum + dept.collaborations, 0),
    totalActiveEmployees: collaborationData.reduce((sum, dept) => sum + dept.activeEmployees, 0),
    avgCompletionRate: Math.round(collaborationData.reduce((sum, dept) => sum + dept.completionRate, 0) / collaborationData.length),
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Collaboration Activity</h1>
        <p className="text-muted-foreground">
          Monitor collaboration patterns and employee engagement across departments
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Mentions</p>
                <p className="text-2xl font-bold">{totalStats.totalMentions}</p>
              </div>
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collaborations</p>
                <p className="text-2xl font-bold text-success">{totalStats.totalCollaborations}</p>
              </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
                <p className="text-2xl font-bold text-warning">{totalStats.totalActiveEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">{totalStats.avgCompletionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Collaboration Details */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Department Collaboration Metrics</CardTitle>
          <CardDescription>
            Detailed collaboration activity and completion rates by department
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {collaborationData.map((dept) => (
            <div key={dept.department} className="border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{dept.department}</h3>
                <div className="flex gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {dept.activeEmployees} active
                  </span>
                  <span className="flex items-center gap-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    {dept.completionRate}%
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Mentions */}
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">Mentions</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{dept.mentions}</div>
                </div>

                {/* Collaborations */}
                <div className="bg-success/10 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <UserCheck className="w-5 h-5 text-success" />
                    <span className="text-sm font-medium text-muted-foreground">Collaborations</span>
                  </div>
                  <div className="text-2xl font-bold text-success">{dept.collaborations}</div>
                </div>

                {/* Completion Rate */}
                <div className="bg-warning/10 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-warning" />
                    <span className="text-sm font-medium text-muted-foreground">Completion Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-warning mb-2">{dept.completionRate}%</div>
                  <Progress value={dept.completionRate} className="h-2" />
                </div>
              </div>

              {/* Collaboration Efficiency */}
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  Collaboration Efficiency: {Math.round((dept.collaborations / dept.mentions) * 100)}%
                </span>
                <span className="text-sm text-muted-foreground">
                  Avg per Employee: {Math.round(dept.mentions / dept.activeEmployees)} mentions
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CollaborationTab;