import { Home, TrendingUp, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export function CategorySidebar() {
  return (
    <aside className="min-w-60 w-60 flex flex-col gap-4 sticky top-24 h-fit">
      {/* 로고 */}
      <div className="px-3 py-2">
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          클래스팅
        </h2>
      </div>

      {/* 홈, 인기 메뉴 */}
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          className="justify-start gap-3 hover:bg-accent transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>홈</span>
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-3 hover:bg-accent transition-colors"
        >
          <TrendingUp className="w-5 h-5" />
          <span>인기</span>
        </Button>
      </div>

      <Separator />

      {/* 닉네임의 게시판 */}
      <div className="flex flex-col gap-3">
        <h3 className="px-3 text-sm font-semibold">닉네임의 게시판</h3>
        
        <div className="grid grid-cols-2 gap-2 px-3">
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <span className="text-lg font-bold">2</span>
            <span className="text-xs text-muted-foreground">게시판</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <span className="text-lg font-bold">2</span>
            <span className="text-xs text-muted-foreground">게시판</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-sm text-muted-foreground hover:text-foreground mx-3"
        >
          전체 구독 태그 보기
        </Button>
      </div>

      <Separator />

      {/* 내 관심사 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-sm font-semibold">내 관심사</h3>
          <Switch />
        </div>
        
        <div className="flex flex-wrap gap-2 px-3">
          <Badge variant="secondary" className="rounded-full">
            스타터
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            취업
          </Badge>
        </div>
      </div>

      <Separator />

      {/* 개발 관련 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-3">
          <h3 className="text-sm font-semibold">개발 관련</h3>
          <Switch />
        </div>
        
        <div className="flex flex-wrap gap-2 px-3">
          <Badge variant="secondary" className="rounded-full">
            리액트
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            프로젝트
          </Badge>
          <Badge variant="secondary" className="rounded-full">
            프론트
          </Badge>
        </div>
      </div>

      <Separator />

      {/* 새 게시판 만들기 */}
      <Button
        variant="outline"
        className="mx-3 gap-2 hover:bg-accent transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>새 게시판 만들기</span>
      </Button>
    </aside>
  );
}
