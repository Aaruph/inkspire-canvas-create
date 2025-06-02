
import { Button } from '@/components/ui/button';
import { Bookmark, Clock } from 'lucide-react';
import { toast } from 'sonner';

const QuickActions = () => {
  return (
    <div className="flex justify-between items-center mt-4 p-2 bg-muted rounded-lg border border-border quick-actions">
      <div className="text-xs text-muted-foreground font-medium">
        <Clock className="inline-block w-3 h-3 mr-1" /> AUTO-SAVE ENABLED
      </div>
      <Button
        variant="ghost"
        className="text-xs text-foreground hover:text-foreground hover:bg-accent uppercase tracking-wider"
        onClick={() => toast("Design saved to favorites")}
      >
        <Bookmark className="w-3 h-3 mr-1" /> SAVE TO FAVORITES
      </Button>
    </div>
  );
};

export default QuickActions;
