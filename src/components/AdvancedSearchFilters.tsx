import { useState } from 'react';
import { Filter, Calendar, MapPin, Heart, User, Tag, SortAsc, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdvancedSearchFiltersProps {
  dateRange: number[];
  minLikes: number[];
  selectedLocation: string;
  sortBy: string;
  onDateRangeChange: (range: number[]) => void;
  onMinLikesChange: (likes: number[]) => void;
  onLocationChange: (location: string) => void;
  onSortChange: (sort: string) => void;
  locations: string[];
  sortOptions: Array<{ value: string; label: string; icon: any }>;
}

const AdvancedSearchFilters = ({
  dateRange,
  minLikes,
  selectedLocation,
  sortBy,
  onDateRangeChange,
  onMinLikesChange,
  onLocationChange,
  onSortChange,
  locations,
  sortOptions
}: AdvancedSearchFiltersProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const availableTags = [
    'graduation', 'cultural', 'sports', 'tech', 'friends', 'faculty', 
    'events', 'academics', 'extracurricular', 'memories', 'achievements'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    onDateRangeChange([2020, 2024]);
    onMinLikesChange([0]);
    onLocationChange('all');
    onSortChange('relevance');
    setSelectedTags([]);
    setIncludeArchived(false);
    setVerifiedOnly(false);
  };

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-primary" />
          <h3 className="font-semibold">Advanced Filters</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>

      {/* Date Range Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="px-3">
            <Slider
              value={dateRange}
              onValueChange={onDateRangeChange}
              max={2024}
              min={2020}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>{dateRange[0]}</span>
              <span>{dateRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Engagement Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Minimum Likes: {minLikes[0]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            value={minLikes}
            onValueChange={onMinLikesChange}
            max={300}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0</span>
            <span>150</span>
            <span>300+</span>
          </div>
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Sort Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort By
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center">
                    <option.icon className="h-4 w-4 mr-2" />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tag Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedTags.includes(tag) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {selectedTags.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-sm text-muted-foreground mb-2">Selected tags:</p>
              <div className="flex flex-wrap gap-1">
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => toggleTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <User className="h-4 w-4 mr-2" />
            Advanced Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Include Archived Content</Label>
              <p className="text-xs text-muted-foreground">Show archived memories and posts</p>
            </div>
            <Switch 
              checked={includeArchived} 
              onCheckedChange={setIncludeArchived} 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Verified Content Only</Label>
              <p className="text-xs text-muted-foreground">Show only verified memories</p>
            </div>
            <Switch 
              checked={verifiedOnly} 
              onCheckedChange={setVerifiedOnly} 
            />
          </div>
        </CardContent>
      </Card>

      {/* Apply Filters */}
      <div className="pt-4 border-t">
        <Button className="w-full bg-gradient-primary hover:bg-gradient-primary/90">
          Apply Filters ({selectedTags.length + (includeArchived ? 1 : 0) + (verifiedOnly ? 1 : 0)} active)
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSearchFilters;