'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { addComment } from '@/actions/comments';
import { Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

type Comment = Database['public']['Tables']['comments']['Row'];

interface ProposalCommentsProps {
  proposalId: string;
}

export function ProposalComments({ proposalId }: ProposalCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch initial comments
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('proposal_id', proposalId)
        .order('created_at', { ascending: true });

      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch comments.' });
      } else {
        setComments(data);
      }
    };
    fetchComments();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`comments:${proposalId}`)
      .on<Comment>(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `proposal_id=eq.${proposalId}` },
        (payload) => {
          setComments((prevComments) => [...prevComments, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [proposalId, supabase, toast]);
  
  // Scroll to bottom when new comments are added
   useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [comments]);


  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    const result = await addComment({
      proposal_id: proposalId,
      content: newComment,
    });
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error.message,
      });
    } else {
      setNewComment('');
    }
  };

  return (
    <Card className="h-full flex flex-col min-h-[500px]">
      <CardHeader>
        <CardTitle className="font-headline">Collaboration Feed</CardTitle>
        <CardDescription>Leave comments and see updates in real-time.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar className="h-10 w-10 border">
                  <AvatarImage src={comment.user_avatar_url || undefined} data-ai-hint="person" />
                  <AvatarFallback>{comment.user_full_name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-sm">{comment.user_full_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="text-sm text-foreground/90 bg-muted p-3 rounded-lg mt-1">
                    <p className="whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
             {comments.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                    No comments yet. Start the conversation!
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form onSubmit={handleAddComment} className="w-full flex items-start gap-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-grow resize-none"
            rows={2}
          />
          <Button type="submit" disabled={isLoading || !newComment.trim()}>
             {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
