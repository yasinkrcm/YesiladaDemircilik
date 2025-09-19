import { useState, useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export async function getStaticProps() {
  const fs = await import("fs");
  const path = await import("path");

  const publicDir = path.join(process.cwd(), "public");
  const allowedImageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);
  const allowedVideoExts = new Set([".mp4", ".webm", ".ogg"]);

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...walk(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    return files;
  }

  const allFiles = walk(publicDir);
  const media = allFiles
    .map((fullPath) => {
      const ext = path.extname(fullPath).toLowerCase();
      const isImage = allowedImageExts.has(ext);
      const isVideo = allowedVideoExts.has(ext);
      if (!isImage && !isVideo) return null;
      const rel = "/" + path.relative(publicDir, fullPath).replace(/\\\\/g, "/");
      return {
        src: rel,
        type: isImage ? "image" : "video",
        alt: isImage ? `Görsel: ${path.basename(fullPath)}` : `Video: ${path.basename(fullPath)}`,
      };
    })
    .filter(Boolean)
    // Exclude Dükkan.jpg with backslash or URL-encoded variants
    .filter((m) => {
      if (m.type !== "image") return true;
      const normalized = (m.src || "").replace(/\\/g, "/");
      if (/\/(images\/)?d[uü]kkan\.jpe?g$/i.test(normalized)) return false;
      if (/d%C3%BCkkan\.jpe?g$/i.test(normalized)) return false;
      return true;
    })
    // Prefer images first for nicer grids
    .sort((a, b) => (a.type === b.type ? 0 : a.type === "image" ? -1 : 1));

  return { props: { media } };
}

// Memoized MediaItem component
const MediaItem = memo(function MediaItem({ img, idx, onImageClick }) {
  const handleClick = useCallback(() => {
    onImageClick(img, idx);
  }, [img, idx, onImageClick]);

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-800 bg-gray-900"
      onClick={handleClick}
    >
      {img.type === "image" ? (
        <Image 
          src={img.src} 
          alt={img.alt} 
          fill 
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover opacity-80 transition duration-300 group-hover:scale-105" 
        />
      ) : (
        <video
          src={img.src}
          className="h-full w-full object-cover opacity-90"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      )}
    </motion.button>
  );
});

const Gallery = memo(function Gallery({ media = [] }) {
  const [active, setActive] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMouseDragging, setIsMouseDragging] = useState(false);
  const [mouseDragStart, setMouseDragStart] = useState({ x: 0, y: 0 });
  
  // Touch states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const [touchDragStart, setTouchDragStart] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(null);
  
  // Swipe navigation states
  const [swipeStart, setSwipeStart] = useState(null);
  const [swipeEnd, setSwipeEnd] = useState(null);

  // Navigation functions with animation
  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % media.length;
    setActiveIndex(nextIndex);
    setActive(media[nextIndex]);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [activeIndex, media]);

  const goToPrevious = useCallback(() => {
    const prevIndex = activeIndex === 0 ? media.length - 1 : activeIndex - 1;
    setActiveIndex(prevIndex);
    setActive(media[prevIndex]);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [activeIndex, media]);

  const handleImageClick = (img, index) => {
    setActiveIndex(index);
    setActive(img);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Zoom functions
  const handleZoom = (delta) => {
    setZoom(prevZoom => {
      const newZoom = Math.max(0.5, Math.min(5, prevZoom + delta));
      return newZoom;
    });
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse drag functions
  const handleMouseDown = (e) => {
    if (zoom > 1) {
      e.preventDefault();
      e.stopPropagation();
      setIsMouseDragging(true);
      setMouseDragStart({ 
        x: e.clientX - position.x, 
        y: e.clientY - position.y 
      });
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e) => {
    if (active) {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      handleZoom(delta);
    }
  };

  // Touch zoom (pinch)
  const getTouchDistance = (touches) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!active) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'Escape') {
        setActive(null);
      }
    };

    if (active) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [active, goToNext, goToPrevious]);

  // Mouse drag event handling
  useEffect(() => {
    if (!active) return;

    const handleGlobalMouseMove = (e) => {
      if (isMouseDragging && zoom > 1) {
        e.preventDefault();
        e.stopPropagation();
        const newX = e.clientX - mouseDragStart.x;
        const newY = e.clientY - mouseDragStart.y;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleGlobalMouseUp = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsMouseDragging(false);
    };

    if (isMouseDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false });
      document.addEventListener('mouseup', handleGlobalMouseUp, { passive: false });
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [active, isMouseDragging, mouseDragStart, zoom]);

  // Wheel event handling
  useEffect(() => {
    if (!active) return;

    const handleWheelEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      handleZoom(delta);
    };

    const modal = document.querySelector('.gallery-modal');
    if (modal) {
      modal.addEventListener('wheel', handleWheelEvent, { passive: false });
      return () => {
        modal.removeEventListener('wheel', handleWheelEvent);
      };
    }
  }, [active, handleZoom]);

  // Touch event handling with proper passive listeners
  useEffect(() => {
    if (!active) return;

    const handleTouchStartEvent = (e) => {
      if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        setLastTouchDistance(getTouchDistance(e.touches));
        setSwipeStart(null);
        setSwipeEnd(null);
      } else if (e.touches.length === 1) {
        // Single touch
        const now = Date.now();
        if (now - (window.lastTap || 0) < 300) {
          // Double tap
          e.preventDefault();
          if (zoom > 1) {
            resetZoom();
          } else {
            setZoom(2);
          }
        }
        window.lastTap = now;
        
        // Start touch drag for panning
        if (zoom > 1) {
          e.preventDefault();
          setIsTouchDragging(true);
          setTouchDragStart({ 
            x: e.touches[0].clientX - position.x, 
            y: e.touches[0].clientY - position.y 
          });
        } else {
          // Start swipe navigation
          setSwipeStart(e.touches[0].clientX);
          setSwipeEnd(null);
        }
      }
    };

    const handleTouchMoveEvent = (e) => {
      if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        const currentDistance = getTouchDistance(e.touches);
        if (lastTouchDistance) {
          const scale = currentDistance / lastTouchDistance;
          setZoom(prevZoom => {
            const newZoom = Math.max(0.5, Math.min(5, prevZoom * scale));
            return newZoom;
          });
        }
        setLastTouchDistance(currentDistance);
      } else if (e.touches.length === 1) {
        if (isTouchDragging && zoom > 1) {
          // Touch drag for panning
          e.preventDefault();
          const newX = e.touches[0].clientX - touchDragStart.x;
          const newY = e.touches[0].clientY - touchDragStart.y;
          setPosition({ x: newX, y: newY });
        } else if (zoom <= 1) {
          // Swipe navigation
          setSwipeEnd(e.touches[0].clientX);
        }
      }
    };

    const handleTouchEndEvent = (e) => {
      setIsTouchDragging(false);
      setLastTouchDistance(null);
      
      // Handle swipe navigation
      if (swipeStart && swipeEnd && zoom <= 1) {
        const distance = swipeStart - swipeEnd;
        const minSwipeDistance = 20; // Reduced for faster response
        
        if (distance > minSwipeDistance) {
          // Left swipe - next image
          goToNext();
        } else if (distance < -minSwipeDistance) {
          // Right swipe - previous image
          goToPrevious();
        }
      }
      
      setSwipeStart(null);
      setSwipeEnd(null);
    };

    const modal = document.querySelector('.gallery-modal');
    if (modal) {
      modal.addEventListener('touchstart', handleTouchStartEvent, { passive: false });
      modal.addEventListener('touchmove', handleTouchMoveEvent, { passive: false });
      modal.addEventListener('touchend', handleTouchEndEvent, { passive: true });
      
      return () => {
        modal.removeEventListener('touchstart', handleTouchStartEvent);
        modal.removeEventListener('touchmove', handleTouchMoveEvent);
        modal.removeEventListener('touchend', handleTouchEndEvent);
      };
    }
  }, [active, zoom, isTouchDragging, lastTouchDistance, position, touchDragStart, swipeStart, swipeEnd, resetZoom, goToNext, goToPrevious]);

  // Memoized media grid
  const mediaGrid = useMemo(() => (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
      {media.map((img, idx) => (
        <MediaItem
          key={(img.src || "") + idx}
          img={img}
          idx={idx}
          onImageClick={handleImageClick}
        />
      ))}
    </div>
  ), [media, handleImageClick]);

  // Memoized modal content
  const modalContent = useMemo(() => {
    if (!active) return null;
    
    return (
      <motion.div
        className="gallery-modal fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setActive(null)}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          onClick={() => setActive(null)}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Zoom controls */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 flex flex-col gap-2">
          <button
            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleZoom(0.2);
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button
            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleZoom(-0.2);
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
            </svg>
          </button>
          <button
            className="bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              resetZoom();
            }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Navigation arrows */}
        {media.length > 1 && (
          <>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
          {activeIndex + 1} / {media.length}
        </div>

        {/* Zoom level indicator */}
        {zoom > 1 && (
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-10 bg-black/50 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
            {Math.round(zoom * 100)}%
          </div>
        )}

        <motion.div
          key={activeIndex} // Force re-render for smooth transitions
          initial={{ scale: 0.95, opacity: 0, x: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          exit={{ scale: 0.95, opacity: 0, x: -20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3
          }}
          className="relative w-full h-full max-w-7xl max-h-[90vh] sm:max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Zoom wrapper */}
          <div
            className="relative"
            style={{
              transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
              transformOrigin: 'center center',
              transition: isMouseDragging || isTouchDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: zoom > 1 ? (isMouseDragging ? 'grabbing' : 'grab') : 'default'
            }}
            onMouseDown={handleMouseDown}
          >
            {active.type === "image" ? (
              <Image 
                src={active.src} 
                alt={active.alt} 
                width={1200}
                height={800}
                sizes="100vw"
                className="object-contain select-none max-w-full max-h-full" 
                draggable={false}
              />
            ) : (
              <video 
                src={active.src} 
                className="max-w-full max-h-full object-contain select-none" 
                controls 
                autoPlay 
                playsInline 
                draggable={false}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  }, [active, activeIndex, zoom, position, isMouseDragging, isTouchDragging, media.length, handleZoom, resetZoom, goToNext, goToPrevious, handleMouseDown]);

  return (
    <div className="container-px mx-auto py-16 sm:py-24">
      <h1 className="section-title text-white">Galeri</h1>
      <p className="section-subtitle text-white">Projelerimizden seçkiler</p>

      {mediaGrid}

      <AnimatePresence>
        {modalContent}
      </AnimatePresence>
    </div>
  );
});

export default Gallery;