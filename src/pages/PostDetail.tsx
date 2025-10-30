import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
// 🔗 백엔드 연결: API 서비스
import { getPost, getPostComments, createComment } from '@/services/api';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔗 백엔드 연결: GET /posts/{id} - 게시글 상세 조회
  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!id) return;
      
      try {
        const postData = await getPost(id);
        setPost(postData);
      } catch (error) {
        console.error('게시글 조회 실패:', error);
        toast({
          title: '게시글을 불러올 수 없습니다',
          variant: 'destructive',
        });
        // 샘플 데이터 사용
        setPost({
          id: id,
          title: '포털기 자격 증명 들어요.',
          content: '독우에게분에 자격 이따가서 실력 총 스터디그... 기대노 ~~',
          authorName: '굿스터디',
          createdAt: '2025-09-19T00:00:00Z',
          tags: ['교육'],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id, toast]);

  // 🔗 백엔드 연결: GET /posts/{postId}/comments - 댓글 목록 조회
  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      
      try {
        const commentsData = await getPostComments(id);
        setComments(commentsData);
      } catch (error) {
        console.error('댓글 조회 실패:', error);
        // 샘플 데이터 사용
        setComments([
          {
            id: '1',
            postId: id,
            authorId: 'user1',
            body: '지금 진짜 비데... 꼭만 드릴께요...',
            status: 'ACTIVE',
            createdAt: '2025-09-01T00:00:00Z',
          },
        ]);
      }
    };

    fetchComments();
  }, [id]);

  // 🔗 백엔드 연결: POST /posts/{postId}/comments - 댓글 작성
  const handleCommentSubmit = async () => {
    if (!comment.trim() || !id) return;

    setIsSubmitting(true);
    try {
      const newComment = await createComment(id, comment.trim());
      
      setComments([...comments, newComment]);
      setComment('');
      
      toast({
        title: '댓글이 작성되었습니다',
      });
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      toast({
        title: '댓글 작성 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="w-full max-w-[1400px] mx-auto flex p-6 gap-6">
          <CategorySidebar />
          <section className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">로딩 중...</p>
          </section>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="w-full max-w-[1400px] mx-auto flex p-6 gap-6">
          <CategorySidebar />
          <section className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">게시글을 찾을 수 없습니다</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full max-w-[1400px] mx-auto flex p-6 gap-6">
        <CategorySidebar />
        
        <section className="flex-1 flex flex-col gap-6">
          {/* 뒤로 가기 버튼 */}
          <Button
            variant="ghost"
            className="w-fit gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            목록으로
          </Button>

          {/* 게시글 본문 */}
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <Avatar className="w-14 h-14 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                    {post.authorName?.[0] || '사'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-lg">{post.authorName || '작성자'}</p>
                    {post.tags?.[0] && (
                      <Badge variant="secondary" className="text-xs">{post.tags[0]}</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    }).replace(/\. /g, '.').replace('.', '')}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                팔로우
              </Button>
            </div>

            <h1 className="text-2xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="text-base leading-relaxed mb-8 text-foreground">
              <p>{post.content}</p>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground pt-4 border-t">
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span className="font-medium">10</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">2</span>
              </button>
            </div>
          </div>

          {/* 댓글 작성 */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-bold text-lg mb-4">댓글 작성</h3>
            <div className="flex gap-4">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  닉
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex flex-col gap-3">
                <Textarea
                  placeholder="댓글을 입력하세요..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleCommentSubmit}
                    disabled={!comment.trim() || isSubmitting}
                  >
                    {isSubmitting ? '작성 중...' : '댓글 작성'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-bold text-lg mb-6">댓글 {comments.length}개</h3>
            <div className="flex flex-col">
              {comments.map((commentItem, index) => (
                <div key={commentItem.id}>
                  <div className="flex gap-4 py-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        댓
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">작성자</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(commentItem.createdAt).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          }).replace(/\. /g, '.').replace('.', '')}
                        </span>
                        {commentItem.authorId === post.authorId && (
                          <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                            작성자
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        {commentItem.body}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="font-medium">0</span>
                        </button>
                        <button className="text-muted-foreground hover:text-primary transition-colors font-medium">
                          답글
                        </button>
                      </div>
                    </div>
                  </div>
                  {index < comments.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
