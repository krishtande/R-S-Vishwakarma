import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [transformation, setTransformation] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const res = await fetch('/api/transformations');
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setTransformation(data.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch transformations:', error);
      }
    };
    fetchTransformations();
  }, []);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const beforeImg = transformation?.beforeImage || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80";
  const afterImg = transformation?.afterImage || "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80";

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h4 className="text-accent font-bold tracking-[0.2em] uppercase text-xl md:text-2xl mb-4 inline-block">See The Transformation</h4>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark mb-6">
            From Blueprint to <span className="italic font-light text-primary">Masterpiece</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">
            Drag the slider to compare raw structural spaces with our completed, bespoke luxury interiors.
          </p>
        </div>

        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="relative w-full max-w-5xl aspect-[4/3] md:aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl cursor-ew-resize group select-none bg-gray-100"
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
          >
            {/* Background Image: AFTER (Finished Masterpiece on the right) */}
            <img
              src={afterImg}
              alt="Finished Masterpiece"
              className="absolute inset-0 w-full h-full object-cover"
              draggable="false"
            />
            <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-accent/90 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
              After (Finished)
            </div>

            {/* Foreground Clipped Image: BEFORE (Raw space on the left) */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={beforeImg}
                alt="Raw Site Construction"
                className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-95"
                draggable="false"
              />
              <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-dark/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
                Before (Raw Site)
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10 flex items-center justify-center cursor-ew-resize transition-all duration-75"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className={`w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-primary transition-transform duration-300 ${isDragging ? 'scale-110 shadow-primary/30' : 'group-hover:scale-110'}`}>
                <GripVertical size={24} />
              </div>
            </div>

            {/* Initial Animation Hint */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-dark/75 backdrop-blur-sm text-white px-6 py-3 rounded-full flex items-center gap-3 animate-pulse">
                <span>Drag to compare</span>
                <div className="flex gap-1 text-accent">
                  <span className="text-xl">←</span>
                  <span className="text-xl">→</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
