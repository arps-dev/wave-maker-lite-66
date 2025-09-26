import { useState } from 'react';
import { Download, FileText, FileJson, FileSpreadsheet, Share2, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface SearchResultsExporterProps {
  results: any[];
  searchTerm: string;
}

const SearchResultsExporter = ({ results, searchTerm }: SearchResultsExporterProps) => {
  const [exportFormat, setExportFormat] = useState('json');
  const [includeImages, setIncludeImages] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const formatOptions = [
    { value: 'json', label: 'JSON Format', icon: FileJson, description: 'Machine readable format' },
    { value: 'csv', label: 'CSV Format', icon: FileSpreadsheet, description: 'Spreadsheet compatible' },
    { value: 'txt', label: 'Text Format', icon: FileText, description: 'Plain text format' },
    { value: 'markdown', label: 'Markdown', icon: FileText, description: 'Formatted text with links' }
  ];

  const exportResults = async () => {
    setIsExporting(true);
    
    try {
      let data: string;
      const filename = `search-results-${searchTerm.replace(/\s+/g, '-').toLowerCase()}`;
      
      switch (exportFormat) {
        case 'json':
          data = JSON.stringify({
            searchTerm,
            exportDate: new Date().toISOString(),
            totalResults: results.length,
            results: results.map(r => ({
              ...r,
              ...(includeImages ? {} : { image: undefined }),
              ...(includeMetadata ? {} : { tags: undefined, author: undefined })
            }))
          }, null, 2);
          break;
          
        case 'csv':
          const headers = ['Title', 'Type', 'Date', 'Location', 'Likes', 'Description'];
          const csvRows = [
            headers.join(','),
            ...results.map(r => [
              `"${r.title}"`,
              r.type,
              r.date,
              `"${r.location}"`,
              r.likes,
              `"${r.description}"`
            ].join(','))
          ];
          data = csvRows.join('\n');
          break;
          
        case 'markdown':
          data = `# Search Results for "${searchTerm}"\n\n`;
          data += `**Export Date:** ${new Date().toLocaleDateString()}\n`;
          data += `**Total Results:** ${results.length}\n\n`;
          results.forEach((r, idx) => {
            data += `## ${idx + 1}. ${r.title}\n\n`;
            data += `- **Type:** ${r.type}\n`;
            data += `- **Date:** ${r.date}\n`;
            data += `- **Location:** ${r.location}\n`;
            data += `- **Likes:** ${r.likes}\n\n`;
            data += `${r.description}\n\n`;
            if (includeMetadata && r.tags) {
              data += `**Tags:** ${r.tags.join(', ')}\n\n`;
            }
            data += '---\n\n';
          });
          break;
          
        default: // txt
          data = `Search Results for "${searchTerm}"\n`;
          data += `Export Date: ${new Date().toLocaleDateString()}\n`;
          data += `Total Results: ${results.length}\n\n`;
          data += '='.repeat(50) + '\n\n';
          results.forEach((r, idx) => {
            data += `${idx + 1}. ${r.title}\n`;
            data += `   Type: ${r.type}\n`;
            data += `   Date: ${r.date}\n`;
            data += `   Location: ${r.location}\n`;
            data += `   Likes: ${r.likes}\n`;
            data += `   Description: ${r.description}\n\n`;
          });
      }
      
      const blob = new Blob([data], { 
        type: exportFormat === 'json' ? 'application/json' : 
             exportFormat === 'csv' ? 'text/csv' : 'text/plain' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${filename}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export completed!",
        description: `${results.length} results exported as ${exportFormat.toUpperCase()}`
      });
      
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your results",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const shareResults = async () => {
    const shareData = {
      title: `Search Results: ${searchTerm}`,
      text: `Found ${results.length} results for "${searchTerm}"`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast({ title: "Shared successfully!" });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        toast({ title: "Link copied to clipboard" });
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      toast({ title: "Link copied to clipboard" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export Search Results
          </DialogTitle>
          <DialogDescription>
            Export {results.length} search results for "{searchTerm}"
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Export Format</Label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formatOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center">
                      <option.icon className="h-4 w-4 mr-2" />
                      <div>
                        <div>{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Export Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Include Images</Label>
                <p className="text-xs text-muted-foreground">Include image URLs in export</p>
              </div>
              <Switch checked={includeImages} onCheckedChange={setIncludeImages} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Include Metadata</Label>
                <p className="text-xs text-muted-foreground">Include tags, author info, etc.</p>
              </div>
              <Switch checked={includeMetadata} onCheckedChange={setIncludeMetadata} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button 
              onClick={exportResults} 
              disabled={isExporting}
              className="flex-1"
            >
              {isExporting ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </>
              )}
            </Button>
            
            <Button variant="outline" onClick={shareResults}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {/* File Size Estimate */}
          <div className="text-xs text-muted-foreground text-center">
            Estimated file size: ~{Math.round(results.length * 0.5)}KB
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchResultsExporter;