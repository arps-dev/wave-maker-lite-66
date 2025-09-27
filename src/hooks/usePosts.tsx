import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export interface Post {
  id: string;
  user_id: string;
  content?: string;
  media_url?: string;
  title?: string;
  description?: string;
  location?: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  // Computed fields
  likes_count?: number;
  comments_count?: number;
  shares_count?: number;
  saves_count?: number;
  user_liked?: boolean;
  user_saved?: boolean;
}

export interface Interaction {
  id: string;
  post_id: string;
  user_id: string;
  type: 'like' | 'comment' | 'share' | 'save';
  comment_text?: string;
  created_at: string;
}

export const usePosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all posts with interaction counts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch interaction counts for each post
      const postsWithInteractions = await Promise.all(
        (postsData || []).map(async (post) => {
          const { data: interactions } = await supabase
            .from('interactions')
            .select('type, user_id')
            .eq('post_id', post.id);

          const likes_count = interactions?.filter(i => i.type === 'like').length || 0;
          const comments_count = interactions?.filter(i => i.type === 'comment').length || 0;
          const shares_count = interactions?.filter(i => i.type === 'share').length || 0;
          const saves_count = interactions?.filter(i => i.type === 'save').length || 0;
          
          const user_liked = user ? interactions?.some(i => i.type === 'like' && i.user_id === user.id) : false;
          const user_saved = user ? interactions?.some(i => i.type === 'save' && i.user_id === user.id) : false;

          return {
            ...post,
            likes_count,
            comments_count,
            shares_count,
            saves_count,
            user_liked,
            user_saved
          };
        })
      );

      setPosts(postsWithInteractions);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData: Partial<Post>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create posts",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          ...postData,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;

      await fetchPosts(); // Refresh posts
      toast({
        title: "Post created! 🎉",
        description: "Your post has been shared successfully"
      });

      return data;
    } catch (err: any) {
      console.error('Error creating post:', err);
      toast({
        title: "Error creating post",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  // Toggle like on a post
  const toggleLike = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if user already liked this post
      const { data: existingLike } = await supabase
        .from('interactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('type', 'like')
        .single();

      if (existingLike) {
        // Unlike
        await supabase
          .from('interactions')
          .delete()
          .eq('id', existingLike.id);
      } else {
        // Like
        await supabase
          .from('interactions')
          .insert([{
            post_id: postId,
            user_id: user.id,
            type: 'like'
          }]);
      }

      await fetchPosts(); // Refresh posts
    } catch (err: any) {
      console.error('Error toggling like:', err);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive"
      });
    }
  };

  // Toggle save on a post
  const toggleSave = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save posts",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if user already saved this post
      const { data: existingSave } = await supabase
        .from('interactions')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .eq('type', 'save')
        .single();

      if (existingSave) {
        // Unsave
        await supabase
          .from('interactions')
          .delete()
          .eq('id', existingSave.id);
        
        toast({
          title: "Removed from saved",
          description: "Post removed from your saved items"
        });
      } else {
        // Save
        await supabase
          .from('interactions')
          .insert([{
            post_id: postId,
            user_id: user.id,
            type: 'save'
          }]);
        
        toast({
          title: "Saved! 🔖",
          description: "Post saved to your Golden Moments"
        });
      }

      await fetchPosts(); // Refresh posts
    } catch (err: any) {
      console.error('Error toggling save:', err);
      toast({
        title: "Error",
        description: "Failed to update save",
        variant: "destructive"
      });
    }
  };

  // Add comment to a post
  const addComment = async (postId: string, commentText: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive"
      });
      return;
    }

    if (!commentText.trim()) return;

    try {
      await supabase
        .from('interactions')
        .insert([{
          post_id: postId,
          user_id: user.id,
          type: 'comment',
          comment_text: commentText.trim()
        }]);

      await fetchPosts(); // Refresh posts
      toast({
        title: "Comment added! 💬",
        description: "Your comment has been posted"
      });
    } catch (err: any) {
      console.error('Error adding comment:', err);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    }
  };

  // Share post
  const sharePost = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to share posts",
        variant: "destructive"
      });
      return;
    }

    try {
      // Record share interaction
      await supabase
        .from('interactions')
        .upsert([{
          post_id: postId,
          user_id: user.id,
          type: 'share'
        }], { 
          onConflict: 'post_id,user_id,type',
          ignoreDuplicates: false 
        });

      await fetchPosts(); // Refresh posts
    } catch (err: any) {
      console.error('Error sharing post:', err);
    }
  };

  // Get saved posts (Golden Moments)
  const getSavedPosts = async () => {
    if (!user) return [];

    try {
      const { data: savedInteractions } = await supabase
        .from('interactions')
        .select(`
          post_id,
          posts (*)
        `)
        .eq('user_id', user.id)
        .eq('type', 'save');

      return savedInteractions?.map(interaction => interaction.posts).filter(Boolean) || [];
    } catch (err: any) {
      console.error('Error fetching saved posts:', err);
      return [];
    }
  };

  // Get comments for a post
  const getPostComments = async (postId: string) => {
    try {
      const { data: comments } = await supabase
        .from('interactions')
        .select(`
          id,
          comment_text,
          created_at,
          user_id,
          profiles (display_name, username, avatar_url)
        `)
        .eq('post_id', postId)
        .eq('type', 'comment')
        .order('created_at', { ascending: false });

      return comments || [];
    } catch (err: any) {
      console.error('Error fetching comments:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return {
    posts,
    loading,
    error,
    createPost,
    toggleLike,
    toggleSave,
    addComment,
    sharePost,
    getSavedPosts,
    getPostComments,
    refreshPosts: fetchPosts
  };
};