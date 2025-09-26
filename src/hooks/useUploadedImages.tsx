import { useState, useCallback } from 'react';

export interface UploadedImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  location?: string;
  date?: string;
  tags: string[];
  likes: number;
  comments: number;
  views: number;
  uniqueUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  file?: File;
}

const generateUniqueUrl = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}`;
};

export const useUploadedImages = () => {
  // Load from localStorage on initialization
  const getStoredImages = (): UploadedImage[] => {
    try {
      const stored = localStorage.getItem('uploadedImages');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(getStoredImages);

  // Save to localStorage whenever images change
  const saveToStorage = useCallback((images: UploadedImage[]) => {
    try {
      localStorage.setItem('uploadedImages', JSON.stringify(images));
    } catch (error) {
      console.error('Failed to save images to localStorage:', error);
    }
  }, []);

  const addUploadedImages = useCallback((
    files: File[],
    formData: {
      title: string;
      description: string;
      event: string;
      location: string;
      date: string;
      tags: string;
    }
  ) => {
    const newImages: UploadedImage[] = files.map((file, index) => {
      const uniqueUrl = generateUniqueUrl();
      const imageId = `img_${uniqueUrl}`;
      
      return {
        id: imageId,
        src: URL.createObjectURL(file), // This creates a blob URL for display
        alt: formData.title || `Uploaded image ${index + 1}`,
        title: formData.title || `Memory ${index + 1}`,
        description: formData.description,
        location: formData.location,
        date: formData.date || new Date().toISOString().split('T')[0],
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
        likes: 0,
        comments: 0,
        views: 0,
        uniqueUrl,
        uploadedBy: "You", // In real app, this would be the current user
        uploadedAt: new Date().toLocaleDateString(),
        file // Store the file for potential future use
      };
    });

    setUploadedImages(prev => {
      const updated = [...prev, ...newImages];
      saveToStorage(updated);
      return updated;
    });

    return newImages;
  }, [saveToStorage]);

  const updateImageStats = useCallback((imageId: string, updates: Partial<Pick<UploadedImage, 'likes' | 'comments' | 'views'>>) => {
    setUploadedImages(prev => {
      const updated = prev.map(img => 
        img.id === imageId 
          ? { ...img, ...updates }
          : img
      );
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const getImageByUniqueUrl = useCallback((uniqueUrl: string): UploadedImage | null => {
    return uploadedImages.find(img => img.uniqueUrl === uniqueUrl) || null;
  }, [uploadedImages]);

  const deleteImage = useCallback((imageId: string) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== imageId);
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  return {
    uploadedImages,
    addUploadedImages,
    updateImageStats,
    getImageByUniqueUrl,
    deleteImage
  };
};