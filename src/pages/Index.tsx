import { useState, useEffect, useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { Heart } from "lucide-react";

const Index = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showCelebration, setShowCelebration] = useState(false);
  const [backgroundHearts, setBackgroundHearts] = useState<
    Array<{ id: number; x: number; y: number; size: number; rotation: number }>
  >([]);
  const [hearts, setHearts] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  // Add background hearts on component mount
  useEffect(() => {
    const hearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 30 + 20, // pixels
      rotation: Math.random() * 360, // degrees
    }));
    setBackgroundHearts(hearts);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const noButton = document.getElementById("no-button");
    if (!noButton) return;

    const buttonRect = noButton.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate distance between mouse and button
    const deltaX = mouseX - (buttonRect.x + buttonRect.width / 2);
    const deltaY = mouseY - (buttonRect.y + buttonRect.height / 2);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Move button away if mouse is close (increased trigger distance from 100 to 150)
    if (distance < 150) {
      const moveX = (deltaX / distance) * -200; // Increased movement distance from 150 to 200
      const moveY = (deltaY / distance) * -200; // Increased movement distance from 150 to 200
      setNoButtonPosition({ x: moveX, y: moveY });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const handleYesClick = () => {
    setShowCelebration(true);
    // Create multiple floating hearts
    for (let i = 0; i < 15; i++) {
      const randomX = Math.random() * window.innerWidth;
      setHearts((prev) => [
        ...prev,
        { id: Date.now() + i, x: randomX, y: window.innerHeight },
      ]);
    }
    toast({
      title: "Yay! 💖",
      description: "You've made me the happiest person in the world!",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 romantic-bg relative overflow-hidden">
      {/* Background hearts */}
      {backgroundHearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-white/20 animate-float-background"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            transform: `rotate(${heart.rotation}deg)`,
          }}
        />
      ))}

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-white/80 animate-float"
          style={{
            left: `${heart.x}px`,
            bottom: `-50px`,
            width: `${Math.random() * 20 + 20}px`,
            height: `${Math.random() * 20 + 20}px`,
          }}
        />
      ))}

      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center animate-celebrate">
            <Heart className="w-32 h-32 text-white" fill="currentColor" />
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/30">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-8 animate-fade-in drop-shadow-lg">
          Will you be my Valentine?
        </h1>

        <div className="flex gap-6 items-center justify-center">
          <button
            onClick={handleYesClick}
            className="px-8 py-4 bg-white text-valentine-primary rounded-full font-bold text-xl hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-2xl"
          >
            Yes 💖
          </button>

          <button
            id="no-button"
            className="px-8 py-4 bg-white/80 text-gray-500 rounded-full font-bold text-xl shadow-lg hover:bg-white/90"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            No 😢
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
