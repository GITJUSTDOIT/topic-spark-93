import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { CLASS_CATEGORY } from '@/constants/category.constant';

export function CategorySidebar() {
  return (
    <aside className="min-w-60 w-60 flex flex-col gap-6 sticky top-24 h-fit">
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <h4 className="font-bold text-lg">카테고리</h4>
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          {CLASS_CATEGORY.map((menu) => (
            <Button
              key={menu.id}
              variant="ghost"
              className="justify-start gap-3 hover:bg-primary/10 hover:text-primary hover:translate-x-2 transition-all duration-300 text-foreground"
            >
              <span className="w-5 h-5 flex items-center justify-center">
                {menu.icon}
              </span>
              <span>{menu.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
