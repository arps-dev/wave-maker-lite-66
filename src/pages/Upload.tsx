import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Camera, Upload as UploadIcon, X, MapPin, Calendar, Users, Tag, Image, Share2, Copy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useUploadedImages } from "@/hooks/useUploadedImages";

const Upload = () => {
  const navigate = useNavigate();
  const { addUploadedImages } = useUploadedImages();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event: "",
    location: "",
    date: "",
    tags: ""
  });

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length !== selectedFiles.length) {
      toast({
        title: "Invalid Files",
        description: "Please select only image files (JPG, PNG, GIF, etc.)",
        variant: "destructive"
      });
    }
    
    setFiles(prev => [...prev, ...imageFiles]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    setFiles(prev => [...prev, ...imageFiles]);
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one image to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      // Add uploaded images to the store with unique URLs
      const newImages = addUploadedImages(files, formData);
      const urls = newImages.map(img => `${window.location.origin}/image/${img.uniqueUrl}`);
      
      setUploading(false);
      setUploadProgress(100);
      setUploadedUrls(urls);
      setShowSuccess(true);
      
      toast({
        title: "Upload Successful! 📸",
        description: `${files.length} photos uploaded with unique URLs. Ready to share!`,
      });
    }, 2000);
  };

  const copyUrlToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied! 🔗",
        description: "Image URL copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFiles([]);
    setFormData({
      title: "",
      description: "",
      event: "",
      location: "",
      date: "",
      tags: ""
    });
    setUploadProgress(0);
    setUploadedUrls([]);
    setShowSuccess(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-warm py-8">
      {/* Header */}
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-sunset p-3 rounded-full">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold retro-heading bg-gradient-sunset bg-clip-text text-transparent">
              Upload Memories
            </h1>
          </div>
          <div className="retro-handwritten text-vintage-teal text-xl mb-2">
            ~ Share Your Fest Moments ~
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your college fest photos and share your amazing memories with the community
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Upload Area */}
          <Card className="retro-card border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UploadIcon className="h-5 w-5" />
                <span>Select Photos</span>
              </CardTitle>
              <CardDescription>
                Drag and drop your images here or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/60 transition-colors cursor-pointer group"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <div className="bg-gradient-sunset p-4 rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Image className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Drop your photos here</h3>
                <p className="text-muted-foreground mb-4">Or click to browse your files</p>
                <Badge variant="secondary">JPG, PNG, GIF up to 10MB each</Badge>
                
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* File Preview */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Selected Files ({files.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {files.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Photo Details */}
          <Card className="retro-card border-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Tag className="h-5 w-5" />
                <span>Photo Details</span>
              </CardTitle>
              <CardDescription>
                Add context and details to your memories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Memory Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Cultural Night 2024"
                    className="retro-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Event Name</span>
                  </Label>
                  <Input
                    id="event"
                    value={formData.event}
                    onChange={(e) => handleInputChange("event", e.target.value)}
                    placeholder="e.g., Spring Fest 2024"
                    className="retro-input"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Location</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g., Main Auditorium"
                    className="retro-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="retro-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Tell us about this memory... What made it special?"
                  className="retro-input min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="e.g., music, dance, friends, celebration"
                  className="retro-input"
                />
                <p className="text-xs text-muted-foreground">
                  Separate tags with commas to help others find your photos
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upload Progress */}
          {uploading && (
            <Card className="retro-card border-2">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Uploading photos and generating unique URLs...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Message with URLs */}
          {showSuccess && uploadedUrls.length > 0 && (
            <Card className="retro-card border-2 bg-green-50 dark:bg-green-950/20 border-green-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700 dark:text-green-400">
                  <Camera className="h-5 w-5" />
                  <span>Upload Complete!</span>
                </CardTitle>
                <CardDescription className="text-green-600 dark:text-green-300">
                  Your images have been uploaded with unique shareable URLs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {uploadedUrls.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">Image {index + 1}</p>
                        <Input
                          readOnly
                          value={url}
                          className="font-mono text-xs bg-muted/50"
                        />
                      </div>
                      <Button
                        onClick={() => copyUrlToClipboard(url)}
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => window.open(url, '_blank')}
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button
                    onClick={() => navigate('/gallery')}
                    className="btn-retro text-white font-medium"
                    style={{
                      background: 'var(--gradient-vintage)',
                      border: 'none'
                    }}
                  >
                    View in Gallery
                  </Button>
                  <Button
                    onClick={resetForm}
                    variant="outline"
                  >
                    Upload More
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link to="/">
              <Button type="button" variant="outline">
                ← Back to Home
              </Button>
            </Link>
            
            <div className="flex gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={resetForm}
              >
                Clear All
              </Button>
              
              <Button 
                type="submit" 
                disabled={uploading || files.length === 0}
                className="btn-retro text-white font-medium px-8"
                style={{
                  background: 'var(--gradient-sunset)',
                  border: 'none'
                }}
              >
                {uploading ? (
                  <>
                    <UploadIcon className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    📤 Upload Photos ({files.length})
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;