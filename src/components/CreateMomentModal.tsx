import { useState } from 'react';
import { Camera, MapPin, Calendar, Tag, Sparkles, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface CreateMomentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMomentModal = ({ isOpen, onClose }: CreateMomentModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    location: '',
    date: '',
    category: 'milestones',
    tags: '',
    description: ''
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'legendary', name: 'Legendary', color: 'bg-gradient-sunset' },
    { id: 'achievements', name: 'Achievements', color: 'bg-gradient-vintage' },
    { id: 'milestones', name: 'Milestones', color: 'bg-gradient-retro' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Golden Moment Created! ✨",
      description: "Your epic moment has been shared with the world!",
    });

    // Reset form
    setFormData({
      title: '',
      subtitle: '',
      location: '',
      date: '',
      category: 'milestones',
      tags: '',
      description: ''
    });
    setSelectedImage(null);
    setIsSubmitting(false);
    onClose();
  };

  const isFormValid = formData.title && formData.subtitle && formData.location && formData.date;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="retro-heading text-2xl font-bold text-foreground flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-sunset-orange" />
            <span>Create Your Golden Moment</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Moment Photo</label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              {selectedImage ? (
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="max-h-48 mx-auto rounded-lg shadow-vintage"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:scale-110 transition-all duration-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-muted-foreground mb-2">Upload your moment photo</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-sunset text-white rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Choose Photo</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Title *</label>
              <Input
                placeholder="e.g., Graduation Day Glory"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Subtitle *</label>
              <Input
                placeholder="e.g., Four years of hard work paid off! 🎓"
                value={formData.subtitle}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Location & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Location *</span>
              </label>
              <Input
                placeholder="e.g., Grand Auditorium"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Date *</span>
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleInputChange('category', category.id)}
                  className={`
                    px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:scale-105
                    ${formData.category === category.id 
                      ? `${category.color} scale-105 shadow-retro` 
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }
                  `}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center space-x-1">
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </label>
            <Input
              placeholder="e.g., graduation, achievement, milestone (comma separated)"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="border-border focus:ring-primary"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description (Optional)</label>
            <Textarea
              placeholder="Tell the story behind this golden moment..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="border-border focus:ring-primary min-h-[100px]"
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`px-8 py-3 font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 ${
                isFormValid 
                  ? 'bg-gradient-sunset hover:shadow-retro' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>Create Golden Moment</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMomentModal;