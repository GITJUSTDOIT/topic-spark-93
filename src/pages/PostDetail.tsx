import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, ThumbsDown, MessageCircle, ArrowLeft, Bookmark, Edit, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
// 🔗 백엔드 연결: API 서비스
import { 
  getPost, 
  getPostComments, 
  createComment, 
  togglePostLike, 
  togglePostDislike,
  togglePostScrap,
  getIsScraped,
  toggleCommentLike,
  toggleCommentDislike,
  deletePost,
  deleteComment,
  updateComment
} from '@/services/api';
// 🔒 보안: Zustand store 사용
import useAuthStore from '@/stores/authStore';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScraped, setIsScraped] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

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

  // 🔗 백엔드 연결: GET /posts/{postId}/scrap - 스크랩 여부 확인
  useEffect(() => {
    const checkScrapStatus = async () => {
      if (!id) return;
      
      try {
        const scrapData = await getIsScraped(id);
        setIsScraped(scrapData.isScraped);
      } catch (error) {
        console.error('스크랩 상태 조회 실패:', error);
      }
    };

    checkScrapStatus();
  }, [id]);

  // 🔗 백엔드 연결: POST /posts/{postId}/like - 좋아요 토글
  const handleLike = async () => {
    if (!id) return;
    
    try {
      await togglePostLike(id);
      // 게시글 다시 조회하여 업데이트된 좋아요 수 반영
      const updatedPost = await getPost(id);
      setPost(updatedPost);
      toast({ title: '좋아요를 눌렀습니다' });
    } catch (error) {
      console.error('좋아요 실패:', error);
      toast({ title: '좋아요 실패', variant: 'destructive' });
    }
  };

  // 🔗 백엔드 연결: POST /posts/{postId}/dislike - 싫어요 토글
  const handleDislike = async () => {
    if (!id) return;
    
    try {
      await togglePostDislike(id);
      const updatedPost = await getPost(id);
      setPost(updatedPost);
      toast({ title: '싫어요를 눌렀습니다' });
    } catch (error) {
      console.error('싫어요 실패:', error);
      toast({ title: '싫어요 실패', variant: 'destructive' });
    }
  };

  // 🔗 백엔드 연결: POST /posts/{postId}/scrap - 스크랩 토글
  const handleScrap = async () => {
    if (!id) return;
    
    try {
      await togglePostScrap(id);
      setIsScraped(!isScraped);
      toast({ title: isScraped ? '스크랩을 취소했습니다' : '스크랩했습니다' });
    } catch (error) {
      console.error('스크랩 실패:', error);
      toast({ title: '스크랩 실패', variant: 'destructive' });
    }
  };

  // 🔗 백엔드 연결: DELETE /posts/{id} - 게시글 삭제
  const handleDeletePost = async () => {
    if (!id || !confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await deletePost(id);
      toast({ title: '게시글이 삭제되었습니다' });
      navigate('/');
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      toast({ title: '삭제 실패', variant: 'destructive' });
    }
  };

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

  // 🔗 백엔드 연결: POST /comments/{commentId}/like - 댓글 좋아요 토글
  const handleCommentLike = async (commentId: string) => {
    try {
      await toggleCommentLike(commentId);
      // 댓글 목록 다시 조회
      const updatedComments = await getPostComments(id!);
      setComments(updatedComments);
    } catch (error) {
      console.error('댓글 좋아요 실패:', error);
    }
  };

  // 🔗 백엔드 연결: POST /comments/{commentId}/dislike - 댓글 싫어요 토글
  const handleCommentDislike = async (commentId: string) => {
    try {
      await toggleCommentDislike(commentId);
      const updatedComments = await getPostComments(id!);
      setComments(updatedComments);
    } catch (error) {
      console.error('댓글 싫어요 실패:', error);
    }
  };

  // 🔗 백엔드 연결: DELETE /comments/{id} - 댓글 삭제
  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
      toast({ title: '댓글이 삭제되었습니다' });
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      toast({ title: '삭제 실패', variant: 'destructive' });
    }
  };

  // 🔗 백엔드 연결: PATCH /comments/{id} - 댓글 수정
  const handleUpdateComment = async (commentId: string) => {
    if (!editingCommentText.trim()) return;
    
    try {
      await updateComment(commentId, editingCommentText.trim());
      const updatedComments = await getPostComments(id!);
      setComments(updatedComments);
      setEditingCommentId(null);
      setEditingCommentText('');
      toast({ title: '댓글이 수정되었습니다' });
    } catch (error) {
      console.error('댓글 수정 실패:', error);
      toast({ title: '수정 실패', variant: 'destructive' });
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
              <div className="flex gap-2">
                {user?.id === post.authorId && (
                  <>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Edit className="w-4 h-4" />
                      수정
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={handleDeletePost}>
                      <Trash2 className="w-4 h-4" />
                      삭제
                    </Button>
                  </>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="text-base leading-relaxed mb-8 text-foreground">
              <p>{post.content}</p>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground pt-4 border-t">
              <button 
                className="flex items-center gap-2 hover:text-primary transition-colors"
                onClick={handleLike}
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="font-medium">{post.likeCount || 0}</span>
              </button>
              <button 
                className="flex items-center gap-2 hover:text-destructive transition-colors"
                onClick={handleDislike}
              >
                <ThumbsDown className="w-5 h-5" />
                <span className="font-medium">{post.dislikeCount || 0}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{comments.length}</span>
              </button>
              <button 
                className={`flex items-center gap-2 transition-colors ${isScraped ? 'text-primary' : 'hover:text-primary'}`}
                onClick={handleScrap}
              >
                <Bookmark className={`w-5 h-5 ${isScraped ? 'fill-primary' : ''}`} />
                <span className="font-medium">스크랩</span>
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
                        <span className="font-bold">{commentItem.authorName || '작성자'}</span>
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
                      
                      {editingCommentId === commentItem.id ? (
                        <div className="flex flex-col gap-2 mb-3">
                          <Textarea
                            value={editingCommentText}
                            onChange={(e) => setEditingCommentText(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleUpdateComment(commentItem.id)}>
                              저장
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => {
                              setEditingCommentId(null);
                              setEditingCommentText('');
                            }}>
                              취소
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-foreground mb-3 leading-relaxed">
                          {commentItem.body}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm">
                        <button 
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => handleCommentLike(commentItem.id)}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span className="font-medium">{commentItem.likeCount || 0}</span>
                        </button>
                        <button 
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => handleCommentDislike(commentItem.id)}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span className="font-medium">{commentItem.dislikeCount || 0}</span>
                        </button>
                        {user?.id === commentItem.authorId && (
                          <>
                            <button 
                              className="text-muted-foreground hover:text-primary transition-colors font-medium"
                              onClick={() => {
                                setEditingCommentId(commentItem.id);
                                setEditingCommentText(commentItem.body);
                              }}
                            >
                              수정
                            </button>
                            <button 
                              className="text-muted-foreground hover:text-destructive transition-colors font-medium"
                              onClick={() => handleDeleteComment(commentItem.id)}
                            >
                              삭제
                            </button>
                          </>
                        )}
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
