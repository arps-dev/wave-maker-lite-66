import { Search, Clock, TrendingUp, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface SearchSuggestionsProps {
  suggestions: string[];
  recentSearches: string[];
  trendingSearches: string[];
  onSelectSuggestion: (suggestion: string) => void;
  onSelectTrending: (term: string) => void;
  isVisible: boolean;
}

const SearchSuggestions = ({
  suggestions,
  recentSearches,
  trendingSearches,
  onSelectSuggestion,
  onSelectTrending,
  isVisible
}: SearchSuggestionsProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 z-50">
      <Card className="shadow-retro border border-white/20 backdrop-blur-md bg-white/95">
        <CardContent className="p-0">
          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center text-xs font-semibold text-gray-500 mb-3">
                <Search className="h-3 w-3 mr-2" />
                Smart Suggestions
              </div>
              <div className="space-y-1">
                {suggestions.map((suggestion, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    onClick={() => onSelectSuggestion(suggestion)}
                    className="w-full justify-start text-left px-3 py-2 hover:bg-gradient-sunset/10 rounded-lg text-sm text-gray-700 transition-all duration-200"
                  >
                    <Search className="h-4 w-4 mr-3 text-gray-400" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center text-xs font-semibold text-gray-500 mb-3">
                <Clock className="h-3 w-3 mr-2" />
                Recent Searches
              </div>
              <div className="space-y-1">
                {recentSearches.slice(0, 3).map((recent, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    onClick={() => onSelectSuggestion(recent)}
                    className="w-full justify-start text-left px-3 py-2 hover:bg-gradient-vintage/10 rounded-lg text-sm text-gray-600 transition-all duration-200"
                  >
                    <Clock className="h-4 w-4 mr-3 text-gray-400" />
                    {recent}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Now */}
          <div className="p-4">
            <div className="flex items-center text-xs font-semibold text-gray-500 mb-3">
              <TrendingUp className="h-3 w-3 mr-2" />
              Trending Now
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.slice(0, 4).map((trend, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-gradient-retro/10 text-retro-purple hover:bg-gradient-retro/20 cursor-pointer transition-all duration-200 px-3 py-1"
                  onClick={() => onSelectTrending(trend)}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchSuggestions;