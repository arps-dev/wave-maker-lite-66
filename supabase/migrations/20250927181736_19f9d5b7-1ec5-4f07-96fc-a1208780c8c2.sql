-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT,
  media_url TEXT,
  title TEXT,
  description TEXT,
  location TEXT,
  category TEXT DEFAULT 'general',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interactions table for likes, comments, shares, saves
CREATE TYPE interaction_type AS ENUM ('like', 'comment', 'share', 'save');

CREATE TABLE public.interactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type interaction_type NOT NULL,
  comment_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Ensure one interaction of each type per user per post (except comments)
  UNIQUE(post_id, user_id, type) DEFERRABLE INITIALLY DEFERRED
);

-- Remove unique constraint for comments (users can comment multiple times)
ALTER TABLE public.interactions DROP CONSTRAINT IF EXISTS interactions_post_id_user_id_type_key;
CREATE UNIQUE INDEX interactions_unique_non_comment ON public.interactions (post_id, user_id, type) 
WHERE type != 'comment';

-- Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interactions ENABLE ROW LEVEL SECURITY;

-- Posts policies - users can view all posts, but only edit their own
CREATE POLICY "Posts are viewable by everyone" 
ON public.posts 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own posts" 
ON public.posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" 
ON public.posts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts" 
ON public.posts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Interactions policies
CREATE POLICY "Interactions are viewable by everyone" 
ON public.interactions 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own interactions" 
ON public.interactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions" 
ON public.interactions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions" 
ON public.interactions 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add trigger for updating timestamps
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_posts_category ON public.posts(category);
CREATE INDEX idx_interactions_post_id ON public.interactions(post_id);
CREATE INDEX idx_interactions_user_id ON public.interactions(user_id);
CREATE INDEX idx_interactions_type ON public.interactions(type);