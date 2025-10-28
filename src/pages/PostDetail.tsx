import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ThumbsUp, MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function PostDetail() {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '자전 왕고',
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
          date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.'),
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
      <main className="w-full max-w-7xl mx-auto flex p-6 gap-6">
        <CategorySidebar />
        
        <section className="flex-1 flex flex-col gap-6">
          {/* 게시글 본문 */}
          <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                    굿
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">굿스터디</p>
                  <p className="text-sm text-muted-foreground">자연과학학 • 2025.9.19</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                팔로우
              </Button>
            </div>

            <h1 className="text-2xl font-bold mb-3">
              <Badge variant="secondary" className="mr-2">교육</Badge>
              포털기 자격 증명 들어요.
            </h1>

            <div className="text-base leading-relaxed mb-6 text-foreground">
              <p>
                독우에게분에 자격 이따가서 실력 총 스터디그... 기대노 ~~
              </p>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <ThumbsUp className="w-5 h-5" />
                <span>10</span>
              </button>
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>2</span>
              </button>
            </div>
          </div>

          {/* 댓글 작성 */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">댓글 작성</h3>
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 border-2 border-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  닉
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="댓글을 입력하세요"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-2 min-h-[80px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleCommentSubmit}>댓글 작성</Button>
                </div>
              </div>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold mb-4">댓글 {comments.length}개</h3>
            <div className="flex flex-col gap-4">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <div className="flex gap-3">
                    <Avatar className="w-10 h-10 border-2 border-primary/10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {comment.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">자연과학학 • {comment.date}</span>
                        <Badge variant="outline" className="text-xs">
                          작성자 하트
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground mb-2">{comment.content}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="hover:text-primary transition-colors">
                          답글
                        </button>
                      </div>
                    </div>
                  </div>
                  {comment.id !== comments.length && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
