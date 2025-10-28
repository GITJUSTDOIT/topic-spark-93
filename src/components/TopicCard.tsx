import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useNavigate } from 'react-router-dom';

interface TopicCardProps {
  id?: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  isHot?: boolean;
}

export function TopicCard({ id = '1', title, content, author, date, tags, isHot }: TopicCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border bg-gradient-to-b from-card to-secondary/30"
      onClick={() => navigate(`/post/${id}`)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-10 h-10 border-2 border-primary/10">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {author[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {content}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
