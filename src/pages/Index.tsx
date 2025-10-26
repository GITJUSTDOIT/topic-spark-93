import { Header } from '@/components/Header';
import { CategorySidebar } from '@/components/CategorySidebar';
import { TopicCard } from '@/components/TopicCard';
import { Flame, Sparkles } from 'lucide-react';

const Index = () => {
  // Sample data
  const hotTopics = [
    {
      title: '취업 준비생을 위한 면접 팁',
      content: '현직 면접관이 알려주는 실전 면접 노하우를 공유합니다. 질문에 대한 답변 방법과 태도...',
      author: '닉네임',
      date: '2025.09.18',
      tags: ['면접', '취업', '팁'],
    },
    {
      title: '제목',
      content: '내용......',
      author: '닉네임',
      date: '2025.09.18',
      tags: ['태그1', '태그2', '태그3'],
    },
    {
      title: '스타트업에서 배운 것들',
      content: '3년차 스타트업 개발자가 경험한 실무 이야기를 나눕니다...',
      author: '닉네임',
      date: '2025.09.17',
      tags: ['스타트업', '개발', '경험담'],
    },
    {
      title: 'UX 디자인 포트폴리오 만들기',
      content: '실무 디자이너가 알려주는 포트폴리오 작성법과 팁...',
      author: '닉네임',
      date: '2025.09.17',
      tags: ['디자인', '포트폴리오', 'UX'],
    },
  ];

  const newTopics = [
    {
      title: '효과적인 마케팅 전략',
      content: '실전에서 검증된 마케팅 전략과 노하우를 공유합니다...',
      author: '닉네임',
      date: '2025.09.18',
      tags: ['마케팅', '전략'],
    },
    {
      title: '프로그래밍 언어 선택 가이드',
      content: '2025년 배워야 할 프로그래밍 언어와 선택 기준...',
      author: '닉네임',
      date: '2025.09.18',
      tags: ['프로그래밍', '가이드'],
    },
    {
      title: '자기계발 루틴 만들기',
      content: '효율적인 자기계발 방법과 습관 형성 팁...',
      author: '닉네임',
      date: '2025.09.18',
      tags: ['자기계발', '루틴'],
    },
    {
      title: '서비스 기획 첫걸음',
      content: '초보 기획자를 위한 실전 기획 프로세스...',
      author: '닉네임',
      date: '2025.09.18',
      tags: ['기획', '서비스'],
    },
  ];

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
