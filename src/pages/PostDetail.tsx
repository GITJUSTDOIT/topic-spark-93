import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '자전 왕고',
      board: '자연과학학',
      date: '2025.9.1',
      content: '지금 진짜 비데... 꼭만 드릴께요...',
      likes: 5,
      replies: 0,
    },
  ]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: '닉네임',
          board: '자연과학학',
          date: new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }).replace(/\. /g, '.').replace('.', ''),
          content: comment,
          likes: 0,
          replies: 0,
        },
      ]);
      setComment('');
    }
  };

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
                    굿
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-lg">굿스터디</p>
                    <Badge variant="secondary" className="text-xs">교육</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">자연과학학 • 2025.9.19</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                팔로우
              </Button>
            </div>

            <h1 className="text-2xl font-bold mb-6 leading-tight">
              포털기 자격 증명 들어요.
            </h1>

            <div className="text-base leading-relaxed mb-8 text-foreground">
              <p>
                독우에게분에 자격 이따가서 실력 총 스터디그... 기대노 ~~
              </p>
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
                    disabled={!comment.trim()}
                  >
                    댓글 작성
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="font-bold text-lg mb-6">댓글 {comments.length}개</h3>
            <div className="flex flex-col">
              {comments.map((comment, index) => (
                <div key={comment.id}>
                  <div className="flex gap-4 py-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {comment.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">
                          {comment.board} • {comment.date}
                        </span>
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                          작성자 하트
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground mb-3 leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="font-medium">{comment.likes}</span>
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
