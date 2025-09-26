import { BarChart3, TrendingUp, Clock, Target, Eye, Heart, Bookmark, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface SearchAnalyticsProps {
  totalResults: number;
  averageLikes: number;
  searchTime: string;
  matchScore: number;
  topCategories: Array<{ name: string; count: number; color: string }>;
  engagementStats: {
    totalViews: number;
    totalLikes: number;
    totalBookmarks: number;
    totalShares: number;
  };
}

const SearchAnalyticsDashboard = ({
  totalResults,
  averageLikes,
  searchTime,
  matchScore,
  topCategories,
  engagementStats
}: SearchAnalyticsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Results */}
      <Card className="bg-gradient-sunset/10 backdrop-blur-sm border-sunset-orange/20 hover:shadow-retro transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-sunset-orange/20 rounded-full">
              <BarChart3 className="h-5 w-5 text-sunset-orange" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Results</p>
              <p className="text-2xl font-bold text-white">{totalResults}</p>
            </div>
          </div>
          <div className="mt-3">
            <Progress value={(totalResults / 50) * 100} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {totalResults > 30 ? 'Excellent coverage' : 'Good results'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Average Engagement */}
      <Card className="bg-gradient-vintage/10 backdrop-blur-sm border-vintage-teal/20 hover:shadow-retro transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-vintage-teal/20 rounded-full">
              <Heart className="h-5 w-5 text-vintage-teal" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Likes</p>
              <p className="text-2xl font-bold text-white">{averageLikes}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <Eye className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{engagementStats.totalViews} views</span>
          </div>
        </CardContent>
      </Card>

      {/* Search Performance */}
      <Card className="bg-gradient-retro/10 backdrop-blur-sm border-retro-purple/20 hover:shadow-retro transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-retro-purple/20 rounded-full">
              <Clock className="h-5 w-5 text-retro-purple" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Search Time</p>
              <p className="text-2xl font-bold text-white">{searchTime}</p>
            </div>
          </div>
          <div className="mt-3">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Fast
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Match Accuracy */}
      <Card className="bg-gradient-hero/10 backdrop-blur-sm border-white/20 hover:shadow-retro transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Match Score</p>
              <p className="text-2xl font-bold text-white">{matchScore}%</p>
            </div>
          </div>
          <div className="mt-3">
            <Progress value={matchScore} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {matchScore > 90 ? 'Excellent match' : matchScore > 70 ? 'Good match' : 'Fair match'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="md:col-span-2 lg:col-span-4 bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Users className="h-5 w-5 mr-2" />
            Category Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCategories.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.count}</span>
                </div>
                <Progress 
                  value={(category.count / totalResults) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Bookmark className="h-4 w-4 mr-1" />
                {engagementStats.totalBookmarks} bookmarks
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {engagementStats.totalShares} shares
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchAnalyticsDashboard;