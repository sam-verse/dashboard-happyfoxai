import { useEffect } from 'react';
import { useSidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

export function KeyboardShortcuts() {
  const { toggleSidebar } = useSidebar();
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Sidebar toggle: Ctrl/Cmd + B
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        toggleSidebar();
        
        // Show a subtle toast notification
        toast({
          title: "Sidebar toggled",
          description: "Use Ctrl/⌘ + B to toggle sidebar",
          duration: 2000,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar, toast]);

  return null; // This component doesn't render anything
}
