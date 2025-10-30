import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// 🔗 백엔드 연결: API 서비스
import { createPost } from '@/services/api';

export default function CreatePost() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput('');
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter(t => t !== tag));
  };

  // 🔗 백엔드 연결: POST /posts - 게시글 작성
  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: '필수 항목을 입력해주세요',
        description: '제목과 내용은 필수입니다.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        tags: hashtags,
      };

      await createPost(postData);
      
      toast({
        title: '게시글 작성 완료',
        description: '게시글이 성공적으로 작성되었습니다.',
      });
      
      navigate('/');
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      toast({
        title: '게시글 작성 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full max-w-7xl mx-auto flex p-6 gap-6">
        <CategorySidebar />
        
        <section className="flex-1 flex flex-col gap-6">
          <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">게시글 작성</h2>
            
            <div className="flex flex-col gap-6">
              {/* 제목 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">제목 *</label>
                <Input
                  placeholder="게시글 제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* 카테고리 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">카테고리 *</label>
                <Input
                  placeholder="카테고리를 입력하세요"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="text-base"
                />
              </div>

              {/* 해시태그 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">해시태그</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="해시태그 입력 후 추가 버튼 클릭"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddHashtag()}
                    className="text-base"
                  />
                  <Button onClick={handleAddHashtag} variant="secondary">
                    추가
                  </Button>
                </div>
                {hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {hashtags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="rounded-full gap-1 pr-1"
                      >
                        #{tag}
                        <button
                          onClick={() => handleRemoveHashtag(tag)}
                          className="ml-1 hover:bg-background/50 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  → 검색어를 해시태그로 입력하면 사람들이 더 쉽게 글을 찾을 수 있어요!
                </p>
              </div>

              {/* 내용 */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">내용 *</label>
                <Textarea
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px] text-base"
                />
              </div>

              {/* 버튼들 */}
              <div className="flex gap-3 justify-end mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(-1)}
                  disabled={isSubmitting}
                >
                  취소
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  임시저장
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '작성 중...' : '게시글 작성'}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
