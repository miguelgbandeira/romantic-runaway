import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Heart } from 'lucide-react';

const Index = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const noButton = document.getElementById('no-button');
    if (!noButton) return;

    const buttonRect = noButton.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate distance between mouse and button
    const deltaX = mouseX - (buttonRect.x + buttonRect.width / 2);
    const deltaY = mouseY - (buttonRect.y + buttonRect.height / 2);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Move button away if mouse is close
    if (distance < 100) {
      const moveX = (deltaX / distance) * -150;
      const moveY = (deltaY / distance) * -150;
      setNoButtonPosition({ x: moveX, y: moveY });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const handleYesClick = () => {
    setShowCelebration(true);
    toast({
      title: "Yay! 💖",
      description: "I'm so happy you said yes!",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-[#ffd1d1] to-[#ff719a]">
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center animate-celebrate">
            <Heart className="w-32 h-32 text-red-500" fill="currentColor" />
          </div>
        </div>
      )}
      
      <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-12 animate-fade-in">
        Do you want to be my Valentine?
      </h1>
      
      <div className="flex gap-6 items-center">
        <button
          onClick={handleYesClick}
          className="px-8 py-4 bg-white text-valentine-primary rounded-full font-bold text-xl hover:scale-110 transition-transform duration-200 shadow-lg"
        >
          Yes 💖
        </button>
        
        <button
          id="no-button"
          className="px-8 py-4 bg-white/80 text-gray-500 rounded-full font-bold text-xl transition-all duration-200 shadow-lg hover:bg-white/90"
          style={{
            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
          }}
        >
          No 😢
        </button>
      </div>
    </div>
  );
};

export default Index;