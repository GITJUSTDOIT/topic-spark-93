import { Search, LogIn, PenSquare, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="w-full border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
            로고
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="게시글 검색..." 
            className="pl-10 h-11 bg-secondary border-border"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="lg" className="gap-2" onClick={() => window.location.href = '/'}>
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
