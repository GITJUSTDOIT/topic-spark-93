import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { TopicCard } from '@/components/TopicCard';
import { Flame, Sparkles } from 'lucide-react';
// 🔗 백엔드 연결: API 서비스
import { getPosts } from '@/services/api';

const Index = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔗 백엔드 연결: GET /posts - 게시글 목록 조회
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('게시글 목록 조회 실패:', error);
        // 에러 발생 시 샘플 데이터 사용
        setPosts(samplePosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Sample data (백엔드 연결 전까지 사용)
  const samplePosts = [
    {
      id: '1',
      title: '취업 준비생을 위한 면접 팁',
      content: '현직 면접관이 알려주는 실전 면접 노하우를 공유합니다. 질문에 대한 답변 방법과 태도...',
      authorName: '닉네임',
      createdAt: '2025-09-18T00:00:00Z',
      tags: ['면접', '취업', '팁'],
    },
    {
      id: '2',
      title: '제목',
      content: '내용......',
      authorName: '닉네임',
      createdAt: '2025-09-18T00:00:00Z',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      id: '3',
      title: '스타트업에서 배운 것들',
      content: '3년차 스타트업 개발자가 경험한 실무 이야기를 나눕니다...',
      authorName: '닉네임',
      createdAt: '2025-09-17T00:00:00Z',
      tags: ['스타트업', '개발', '경험담'],
    },
    {
      id: '4',
      title: 'UX 디자인 포트폴리오 만들기',
      content: '실무 디자이너가 알려주는 포트폴리오 작성법과 팁...',
      authorName: '닉네임',
      createdAt: '2025-09-17T00:00:00Z',
      tags: ['디자인', '포트폴리오', 'UX'],
    },
    {
      id: '5',
      title: '효과적인 마케팅 전략',
      content: '실전에서 검증된 마케팅 전략과 노하우를 공유합니다...',
      authorName: '닉네임',
      createdAt: '2025-09-18T00:00:00Z',
      tags: ['마케팅', '전략'],
    },
    {
      id: '6',
      title: '프로그래밍 언어 선택 가이드',
      content: '2025년 배워야 할 프로그래밍 언어와 선택 기준...',
      authorName: '닉네임',
      createdAt: '2025-09-18T00:00:00Z',
      tags: ['프로그래밍', '가이드'],
    },
    {
      id: '7',
      title: '자기계발 루틴 만들기',
      content: '효율적인 자기계발 방법과 습관 형성 팁...',
      authorName: '닉네임',
      createdAt: '2025-09-18T00:00:00Z',
      tags: ['자기계발', '루틴'],
    },
    {
      id: '8',
      title: '서비스 기획 첫걸음',
      content: '초보 기획자를 위한 실전 기획 프로세스...',
      authorName: '닉네임',
      createdAt: '2025-09-18T00:00:00Z',
      tags: ['기획', '서비스'],
    },
  ];

  // 데이터 변환 함수
  const formatPost = (post: any) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    author: post.authorName || '닉네임',
    date: new Date(post.createdAt).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\. /g, '.').replace('.', ''),
    tags: post.tags || [],
  });

  const displayPosts = loading ? samplePosts.map(formatPost) : posts.map(formatPost);
  const hotTopics = displayPosts.slice(0, 4);
  const newTopics = displayPosts.slice(4, 8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Category Sidebar */}
          <CategorySidebar />

          {/* Main Content */}
          <main className="flex-1 flex flex-col gap-12">
            {/* Hot Topics Section */}
            <section className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">HOT 토픽</h2>
                </div>
                <p className="text-muted-foreground">
                  가장 주목받고 있는 댓글을 보세요
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {hotTopics.map((topic, index) => (
                  <TopicCard key={index} {...topic} isHot />
                ))}
              </div>
            </section>

            {/* New Topics Section */}
            <section className="w-full flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight">NEW 토픽</h2>
                </div>
                <p className="text-muted-foreground">
                  주목받을 댓글을 작성하세요!
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newTopics.map((topic, index) => (
                  <TopicCard key={index} {...topic} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
