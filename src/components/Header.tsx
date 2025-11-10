import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LogIn, PenSquare, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
// 🔗 백엔드 연결: API 서비스
import { searchPosts } from '@/services/api';
import { toast } from 'sonner';

export function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // 🔗 백엔드 연결: GET /posts/search - 게시글 검색
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('검색어를 입력해주세요');
      return;
    }

    try {
      const results = await searchPosts(searchQuery.trim());
      // 검색 결과를 상태로 전달하거나 검색 결과 페이지로 이동
      console.log('검색 결과:', results);
      toast.success(`${results.length}개의 게시글을 찾았습니다`);
      // TODO: 검색 결과 페이지로 이동 또는 결과 표시
    } catch (error) {
      console.error('검색 실패:', error);
      toast.error('검색에 실패했습니다');
    }
  };

  return (
    <header className="w-full border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
            로고
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="게시글 검색..." 
            className="pl-10 h-11 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="lg" className="gap-2" onClick={() => window.location.href = '/login'}>
            <LogIn className="w-4 h-4" />
            로그인
          </Button>
          <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity gap-2" onClick={() => window.location.href = '/create'}>
            <PenSquare className="w-4 h-4" />
            글쓰기
          </Button>
          <Button variant="secondary" size="lg" className="gap-2" onClick={() => window.location.href = '/mypage'}>
            <User className="w-4 h-4" />
            닉네임
          </Button>
        </div>
      </div>
    </header>
  );
}
