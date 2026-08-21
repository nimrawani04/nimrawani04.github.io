import { useState, useMemo, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  FolderHeart, 
  Heart, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Layers, 
  Image as ImageIcon,
  Grid,
  Info
} from "lucide-react";

// Shared IntersectionObserver singleton — avoids creating 28+ separate observers
const observerCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cb = observerCallbacks.get(entry.target);
            if (cb) {
              cb();
              observerCallbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        });
      },
      { rootMargin: "300px" }
    );
  }
  return sharedObserver;
}

// Optimized lazy-loading image — uses shared observer + native loading="lazy"
const LazyImage = memo(({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const imgRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const observer = getSharedObserver();
    observerCallbacks.set(el, () => setIsVisible(true));
    observer.observe(el);
    return () => {
      observerCallbacks.delete(el);
      observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={imgRef} className={`${className ?? ''} bg-slate-800/60`}>
      {isVisible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          width={400}
          height={400}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
});

// Memoized photo card — prevents re-render of ALL cards when one favorite toggles
const PhotoCard = memo(({ photo, index, isFavorite, onOpenLightbox, onToggleFavorite }: {
  photo: Photo;
  index: number;
  isFavorite: boolean;
  onOpenLightbox: (index: number) => void;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}) => {
  return (
    <div
      onClick={() => onOpenLightbox(index)}
      className="group relative aspect-square bg-slate-900 rounded-xl border border-slate-800/50 overflow-hidden cursor-zoom-in shadow-lg"
    >
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 flex flex-col justify-end p-3 text-left">
        <span className="text-xs font-bold text-white line-clamp-1">{photo.title}</span>
        <span className="text-[9px] text-slate-300 font-semibold">{photo.albumName}</span>
      </div>

      {/* Favorite Badge */}
      <button
        onClick={(e) => onToggleFavorite(photo.id, e)}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors z-20"
      >
        <Heart 
          className={`w-3.5 h-3.5 ${isFavorite ? "fill-red-500 text-red-500" : "text-slate-300"}`} 
        />
      </button>

      <LazyImage 
        src={photo.src} 
        alt={photo.title}
        className="w-full h-full"
      />
    </div>
  );
});

interface Photo {
  id: string;
  src: string;
  albumId: string;
  albumName: string;
  date: string;
  title: string;
  description?: string;
}

const PHOTOS: Photo[] = [
  { 
    id: "kcet1", 
    src: "/gallery/kcet1.jpeg", 
    albumId: "synertech", 
    albumName: "Synertech", 
    date: "9th-10th May 2026", 
    title: "Synertech", 
    description: "Pitching our AI solution at the Synertech Hackathon." 
  },
  { 
    id: "kcet2", 
    src: "/gallery/kcet2.jpeg", 
    albumId: "synertech", 
    albumName: "Synertech", 
    date: "9th-10th May 2026", 
    title: "Synertech", 
    description: "Giving live demonstrations of the product prototype to the judging panel." 
  },
  { 
    id: "kcet3", 
    src: "/gallery/kcet3.jpeg", 
    albumId: "synertech", 
    albumName: "Synertech", 
    date: "9th-10th May 2026", 
    title: "Synertech", 
    description: "A memorable moment celebrating our team's effort at the hackathon." 
  },
  { 
    id: "cursor1", 
    src: "/gallery/cursor.jpg", 
    albumId: "cursor-hackathon", 
    albumName: "Cursor Hackathon", 
    date: "28-29th March 2026", 
    title: "Cursor Hackathon", 
    description: "Pair programming and writing clean React components during the 24-hour sprint." 
  },
  { 
    id: "cursor2", 
    src: "/gallery/cursor2.jpg", 
    albumId: "cursor-hackathon", 
    albumName: "Cursor Hackathon", 
    date: "28-29th March 2026", 
    title: "Cursor Hackathon", 
    description: "Finishing the final user interface dashboard right before the submission deadline." 
  },
  { 
    id: "bis1", 
    src: "/gallery/bis1.jpeg", 
    albumId: "standard-a-thon", 
    albumName: "Standard-a-Thon Hackathon", 
    date: "14th March 2026", 
    title: "Standard-a-Thon Hackathon", 
    description: "Receiving recognition and showcasing our solution at Standard-a-Thon." 
  },
  { 
    id: "foss1", 
    src: "/gallery/foss1.jpeg", 
    albumId: "foss-united", 
    albumName: "FOSS United", 
    date: "1st November 2025", 
    title: "FOSS United", 
    description: "Introducing our open-source AI project to the developer community." 
  },
  { 
    id: "foss2", 
    src: "/gallery/foss2.jpeg", 
    albumId: "foss-united", 
    albumName: "FOSS United", 
    date: "1st November 2025", 
    title: "FOSS United", 
    description: "Answering engaging technical questions from attendees at the meetup." 
  },
  { 
    id: "frappe1", 
    src: "/gallery/frappe1.jpeg", 
    albumId: "frappe-workshop", 
    albumName: "Frappe Workshop", 
    date: "1st August 2026", 
    title: "Frappe Workshop", 
    description: "Deep dive into Frappe framework architecture and development." 
  },
  { 
    id: "frappe2", 
    src: "/gallery/frappe2.jpeg", 
    albumId: "frappe-workshop", 
    albumName: "Frappe Workshop", 
    date: "1st August 2026", 
    title: "Frappe Workshop", 
    description: "Hands-on application building and Frappe site setup." 
  },
  { 
    id: "frappe3", 
    src: "/gallery/frappe3.jpeg", 
    albumId: "frappe-workshop", 
    albumName: "Frappe Workshop", 
    date: "1st August 2026", 
    title: "Frappe Workshop", 
    description: "Collaborative problem solving and setup verification session." 
  },
  { 
    id: "pc1", 
    src: "/gallery/pc1.jpg", 
    albumId: "pre-conference", 
    albumName: "Pre-Conference", 
    date: "17th June 2026", 
    title: "Pre-Conference", 
    description: "Setting up tools and aligning with presenters before the main sessions." 
  },
  { 
    id: "pc2", 
    src: "/gallery/pc2.JPG", 
    albumId: "pre-conference", 
    albumName: "Pre-Conference", 
    date: "17th June 2026", 
    title: "Pre-Conference", 
    description: "Interactive session with industry leaders and academic researchers." 
  },
  { 
    id: "pc3", 
    src: "/gallery/pc3.JPG", 
    albumId: "pre-conference", 
    albumName: "Pre-Conference", 
    date: "17th June 2026", 
    title: "Pre-Conference", 
    description: "Hands-on setup workshop for applied artificial intelligence tools." 
  },
  { 
    id: "pc4", 
    src: "/gallery/pc4.JPG", 
    albumId: "pre-conference", 
    albumName: "Pre-Conference", 
    date: "17th June 2026", 
    title: "Pre-Conference", 
    description: "Collaborative knowledge sharing between delegates." 
  },
  { 
    id: "preconf", 
    src: "/gallery/preconf.jpeg", 
    albumId: "pre-conference", 
    albumName: "Pre-Conference", 
    date: "17th June 2026", 
    title: "Pre-Conference", 
    description: "Opening keynote introducing the topics for pre-conference workshops." 
  },
  { 
    id: "2c", 
    src: "/gallery/2c.jpg", 
    albumId: "pre-conference", 
    albumName: "Pre-Conference", 
    date: "17th June 2026", 
    title: "Pre-Conference", 
    description: "Connecting with attendees and organizers." 
  },
  { 
    id: "conf1_2", 
    src: "/gallery/conf1,2.jpg", 
    albumId: "conference-day-1", 
    albumName: "Conference Day 1", 
    date: "18th June 2026", 
    title: "Conference Day 1", 
    description: "Official inaugural ceremony of the applied AI international conference." 
  },
  { 
    id: "conf1_1", 
    src: "/gallery/conf1.1.jpg", 
    albumId: "conference-day-1", 
    albumName: "Conference Day 1", 
    date: "18th June 2026", 
    title: "Conference Day 1", 
    description: "Keynote presentation detailing upcoming advancements in deep learning models." 
  },
  { 
    id: "conf2_3", 
    src: "/gallery/conf2.3.JPG", 
    albumId: "conference-day-1", 
    albumName: "Conference Day 1", 
    date: "18th June 2026", 
    title: "Conference Day 1", 
    description: "Technical track showcasing research findings in natural language models." 
  },
  { 
    id: "conf2_4", 
    src: "/gallery/conf2.4.JPG", 
    albumId: "conference-day-1", 
    albumName: "Conference Day 1", 
    date: "18th June 2026", 
    title: "Conference Day 1", 
    description: "Exhibition stalls highlighting prototype solutions and poster presentations." 
  },
  { 
    id: "2_2c", 
    src: "/gallery/2.2c.jpg", 
    albumId: "conference-day-1", 
    albumName: "Conference Day 1", 
    date: "18th June 2026", 
    title: "Conference Day 1", 
    description: "Panel discussion with experts on AI safety and ethics." 
  },
  { 
    id: "conf2", 
    src: "/gallery/conf2.jpeg", 
    albumId: "conference-day-2", 
    albumName: "Conference Day 2", 
    date: "19th June 2026", 
    title: "Conference Day 2", 
    description: "Main track presentations on computer vision applications." 
  },
  { 
    id: "c2_4", 
    src: "/gallery/c2.4.jpg", 
    albumId: "conference-day-2", 
    albumName: "Conference Day 2", 
    date: "19th June 2026", 
    title: "Conference Day 2", 
    description: "Breakout sessions discussing AI integration workflows." 
  },
  { 
    id: "conf2_2", 
    src: "/gallery/conf2.2.jpg", 
    albumId: "conference-day-2", 
    albumName: "Conference Day 2", 
    date: "19th June 2026", 
    title: "Conference Day 2", 
    description: "Interactive session demonstrating edge AI hardware nodes." 
  },
  { 
    id: "3c", 
    src: "/gallery/3c.JPG", 
    albumId: "conference-day-2", 
    albumName: "Conference Day 2", 
    date: "19th June 2026", 
    title: "Conference Day 2", 
    description: "Valedictory function and certificate distribution ceremony." 
  },
  { 
    id: "3_2c", 
    src: "/gallery/3.2c.JPG", 
    albumId: "conference-day-2", 
    albumName: "Conference Day 2", 
    date: "19th June 2026", 
    title: "Conference Day 2", 
    description: "Group photo with conference organizers and attendees." 
  }
];

interface Album {
  id: string;
  name: string;
  coverImage: string;
  photoCount: number;
}

export const GalleryView = () => {
  const [galleryTab, setGalleryTab] = useState<"library" | "albums" | "favorites" | "search">("library");
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["kcet3", "cursor1"]); // Pre-populate some favorites for excellent UX
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxList, setLightboxList] = useState<Photo[]>([]);

  // 1. Group Photos by Date
  const dateGroups = useMemo(() => {
    const groups: { [key: string]: Photo[] } = {};
    PHOTOS.forEach((photo) => {
      if (!groups[photo.date]) {
        groups[photo.date] = [];
      }
      groups[photo.date].push(photo);
    });
    // Order of dates as requested
    const orderedDates = [
      "1st August 2026",
      "19th June 2026",
      "18th June 2026",
      "17th June 2026",
      "9th-10th May 2026",
      "28-29th March 2026",
      "14th March 2026",
      "1st November 2025"
    ];
    
    return orderedDates.map(date => ({
      date,
      photos: groups[date] || []
    })).filter(g => g.photos.length > 0);
  }, []);

  // 2. Generate Albums list
  const albums = useMemo((): Album[] => {
    const albumsMap: { [key: string]: { name: string; images: string[] } } = {
      "frappe-workshop": { name: "Frappe Workshop", images: ["/gallery/frappe1.jpeg", "/gallery/frappe2.jpeg", "/gallery/frappe3.jpeg"] },
      "pre-conference": { name: "Pre-Conference", images: ["/gallery/pc1.jpg", "/gallery/pc2.JPG", "/gallery/pc3.JPG", "/gallery/pc4.JPG", "/gallery/preconf.jpeg", "/gallery/2c.jpg"] },
      "conference-day-1": { name: "Conference Day 1", images: ["/gallery/conf1,2.jpg", "/gallery/conf1.1.jpg", "/gallery/conf2.3.JPG", "/gallery/conf2.4.JPG", "/gallery/2.2c.jpg"] },
      "conference-day-2": { name: "Conference Day 2", images: ["/gallery/conf2.jpeg", "/gallery/c2.4.jpg", "/gallery/conf2.2.jpg", "/gallery/3c.JPG", "/gallery/3.2c.JPG"] },
      "foss-united": { name: "FOSS United", images: ["/gallery/foss1.jpeg", "/gallery/foss2.jpeg"] },
      "cursor-hackathon": { name: "Cursor Hackathon", images: ["/gallery/cursor.jpg", "/gallery/cursor2.jpg"] },
      "standard-a-thon": { name: "Standard-a-Thon Hackathon", images: ["/gallery/bis1.jpeg"] },
      "synertech": { name: "Synertech", images: ["/gallery/kcet1.jpeg", "/gallery/kcet2.jpeg", "/gallery/kcet3.jpeg"] },
    };

    return Object.entries(albumsMap).map(([id, data]) => ({
      id,
      name: data.name,
      coverImage: data.images[0],
      photoCount: data.images.length
    }));
  }, []);

  // Filtered photos for Favorites tab
  const favoritePhotos = useMemo(() => {
    return PHOTOS.filter(p => favorites.includes(p.id));
  }, [favorites]);

  // Filtered photos for Search tab
  const searchedPhotos = useMemo(() => {
    if (!searchQuery.trim()) return PHOTOS;
    const q = searchQuery.toLowerCase();
    return PHOTOS.filter(
      p => 
        p.title.toLowerCase().includes(q) || 
        p.albumName.toLowerCase().includes(q) || 
        p.date.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Toggle favorite status
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  // Open Lightbox
  const openLightbox = (photoList: Photo[], index: number) => {
    setLightboxList(photoList);
    setLightboxIndex(index);
  };

  const currentLightboxPhoto = lightboxIndex !== null ? lightboxList[lightboxIndex] : null;

  const navigateLightbox = (direction: "next" | "prev", e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    let nextIndex = direction === "next" ? lightboxIndex + 1 : lightboxIndex - 1;
    if (nextIndex >= lightboxList.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = lightboxList.length - 1;
    setLightboxIndex(nextIndex);
  };

  const selectedAlbum = useMemo(() => {
    return albums.find(a => a.id === selectedAlbumId);
  }, [selectedAlbumId, albums]);

  const albumPhotos = useMemo(() => {
    if (!selectedAlbumId) return [];
    return PHOTOS.filter(p => p.albumId === selectedAlbumId);
  }, [selectedAlbumId]);

  return (
    <div className="flex flex-col h-full bg-slate-950/40 text-slate-100 font-sans rounded-2xl overflow-hidden relative border border-slate-800/40">
      
      {/* iOS Top Bar Navigation (Inside modal container) */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/60 border-b border-slate-800/60 backdrop-blur-md sticky top-0 z-30">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {galleryTab === "library" && "Photos Library"}
              {galleryTab === "albums" && (selectedAlbumId ? selectedAlbum?.name : "Albums")}
              {galleryTab === "favorites" && "Favorites"}
              {galleryTab === "search" && "Search Gallery"}
            </span>
          </h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
            {galleryTab === "library" && "Moments Timeline"}
            {galleryTab === "albums" && (selectedAlbumId ? "Collection detail" : "My Collections")}
            {galleryTab === "favorites" && "Bookmarked photos"}
            {galleryTab === "search" && "Find project highlights"}
          </p>
        </div>

        {/* Back Button if in album detail view */}
        {galleryTab === "albums" && selectedAlbumId && (
          <button
            onClick={() => setSelectedAlbumId(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-cyan-400 rounded-lg transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Albums
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-grow p-4 md:p-6 overflow-y-auto scrollbar-none max-h-[55vh]">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: LIBRARY (DATE-WISE) */}
          {galleryTab === "library" && (
            <motion.div
              key="library-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {dateGroups.map((group) => (
                <div key={group.date} className="space-y-3">
                  {/* Sticky Date Title */}
                  <div className="flex items-center justify-between border-b border-slate-900/60 pb-1 pt-2 sticky top-0 bg-slate-950/10 backdrop-blur-xs z-10">
                    <span className="text-sm font-black text-slate-200 tracking-wide flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      {group.date}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800/40">
                      {group.photos.length} Photo{group.photos.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
                    {group.photos.map((photo, index) => (
                      <div
                        key={photo.id}
                        onClick={() => openLightbox(group.photos, index)}
                        className="group relative aspect-square bg-slate-900 rounded-xl border border-slate-800/50 overflow-hidden cursor-zoom-in shadow-lg hover:scale-[1.02] transition-transform duration-200"
                      >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-3 text-left">
                          <span className="text-xs font-bold text-white line-clamp-1">{photo.title}</span>
                          <span className="text-[9px] text-slate-300 font-semibold">{photo.albumName}</span>
                        </div>

                        {/* Favorite Badge */}
                        <button
                          onClick={(e) => toggleFavorite(photo.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all z-20"
                        >
                          <Heart 
                            className={`w-3.5 h-3.5 ${favorites.includes(photo.id) ? "fill-red-500 text-red-500" : "text-slate-300"}`} 
                          />
                        </button>

                        <LazyImage 
                          src={photo.src} 
                          alt={photo.title}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* TAB 2: ALBUMS */}
          {galleryTab === "albums" && (
            <motion.div
              key="albums-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {!selectedAlbumId ? (
                /* Album Grid (iOS Albums mockup) */
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-900/60 pb-1.5">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">My Albums</span>
                    <span className="text-[10px] text-slate-500 font-bold">{albums.length} Albums</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-5">
                    {albums.map((album) => (
                      <div
                        key={album.id}
                        onClick={() => setSelectedAlbumId(album.id)}
                        className="group flex flex-col cursor-pointer text-left hover:-translate-y-1 transition-transform duration-200"
                      >
                        {/* iOS Stack/Cover Design */}
                        <div className="relative aspect-square bg-slate-900 rounded-2xl border border-slate-800/80 overflow-hidden shadow-md group-hover:shadow-cyan-950/20 group-hover:border-cyan-500/20 transition-all duration-300">
                          
                          {/* Folder/Album Stack Visual Effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent z-10" />

                          <LazyImage
                            src={album.coverImage}
                            alt={album.name}
                            className="w-full h-full"
                          />

                          {/* Photos indicator badge */}
                          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 rounded-full text-[9px] font-bold text-slate-300 border border-white/5 backdrop-blur-xs flex items-center gap-1 z-20">
                            <Layers className="w-2.5 h-2.5" />
                            {album.photoCount}
                          </div>
                        </div>

                        {/* Title & Count Info (iOS details below card) */}
                        <div className="mt-2.5 px-1">
                          <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-1">{album.name}</h4>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{album.photoCount} Photos</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Album Details View */
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 pb-2 border-b border-slate-900/60">
                    <span className="text-cyan-400">Albums</span>
                    <span>/</span>
                    <span className="text-slate-200">{selectedAlbum?.name}</span>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    {albumPhotos.map((photo, index) => (
                      <div
                        key={photo.id}
                        onClick={() => openLightbox(albumPhotos, index)}
                        className="group relative aspect-square bg-slate-900 rounded-xl border border-slate-800/60 overflow-hidden cursor-zoom-in shadow-md hover:scale-[1.02] transition-transform duration-200"
                      >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-3 text-left">
                          <span className="text-xs font-bold text-white line-clamp-1">{photo.title}</span>
                          <span className="text-[9px] text-slate-300 font-semibold">{photo.date}</span>
                        </div>

                        {/* Favorite Badge */}
                        <button
                          onClick={(e) => toggleFavorite(photo.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all z-20"
                        >
                          <Heart 
                            className={`w-3.5 h-3.5 ${favorites.includes(photo.id) ? "fill-red-500 text-red-500" : "text-slate-300"}`} 
                          />
                        </button>

                        <LazyImage 
                          src={photo.src} 
                          alt={photo.title}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: FAVORITES */}
          {galleryTab === "favorites" && (
            <motion.div
              key="favorites-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {favoritePhotos.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 space-y-3">
                  <div className="p-4 rounded-full bg-slate-900 border border-slate-800/80 text-slate-400">
                    <FolderHeart className="w-8 h-8 opacity-60" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-300">No Favorites Yet</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-[260px]">Tap the heart icon on any photo in the library to save your favorite project moments here.</p>
                  </div>
                </div>
              ) : (
                /* Favorites Grid */
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {favoritePhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      onClick={() => openLightbox(favoritePhotos, index)}
                      className="group relative aspect-square bg-slate-900 rounded-xl border border-slate-800/60 overflow-hidden cursor-zoom-in shadow-md hover:scale-[1.02] transition-transform duration-200"
                    >
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-3 text-left">
                        <span className="text-xs font-bold text-white line-clamp-1">{photo.title}</span>
                        <span className="text-[9px] text-slate-300 font-semibold">{photo.albumName}</span>
                      </div>

                      {/* Remove Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(photo.id, e)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 border border-white/10 text-red-500 hover:bg-black/85 transition-all z-20"
                      >
                        <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                      </button>

                      <LazyImage 
                        src={photo.src} 
                        alt={photo.title}
                        className="w-full h-full"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: SEARCH */}
          {galleryTab === "search" && (
            <motion.div
              key="search-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Search input container */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, event, technology or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-medium placeholder-slate-500 text-slate-200 outline-none focus:border-cyan-500/50 transition-colors focus:ring-1 focus:ring-cyan-500/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-slate-400 hover:text-slate-200 absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {searchedPhotos.length === 0 ? (
                /* Search empty state */
                <div className="flex flex-col items-center justify-center py-16 text-slate-500 space-y-2">
                  <p className="text-sm font-bold text-slate-400">No Matches Found</p>
                  <p className="text-xs text-slate-600">Try searching for keywords like "synertech", "cursor", "winning", or "FOSS"</p>
                </div>
              ) : (
                /* Search Results */
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    Found {searchedPhotos.length} Match{searchedPhotos.length > 1 ? "es" : ""}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                    {searchedPhotos.map((photo, index) => (
                      <div
                        key={photo.id}
                        onClick={() => openLightbox(searchedPhotos, index)}
                        className="group relative aspect-square bg-slate-900 rounded-xl border border-slate-800/60 overflow-hidden cursor-zoom-in shadow-md hover:scale-[1.02] transition-transform duration-200"
                      >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-3 text-left">
                          <span className="text-xs font-bold text-white line-clamp-1">{photo.title}</span>
                          <span className="text-[9px] text-slate-300 font-semibold">{photo.albumName}</span>
                        </div>

                        {/* Favorite Badge */}
                        <button
                          onClick={(e) => toggleFavorite(photo.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-all z-20"
                        >
                          <Heart 
                            className={`w-3.5 h-3.5 ${favorites.includes(photo.id) ? "fill-red-500 text-red-500" : "text-slate-300"}`} 
                          />
                        </button>

                        <LazyImage 
                          src={photo.src} 
                          alt={photo.title}
                          className="w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* iOS-style Bottom Tab Bar Navigation */}
      <div className="mt-auto px-6 py-3 bg-slate-950/80 border-t border-slate-900 backdrop-blur-md flex items-center justify-around text-slate-400 select-none z-30">
        <button
          onClick={() => { setGalleryTab("library"); setSelectedAlbumId(null); }}
          className={`flex flex-col items-center gap-1 transition-colors ${galleryTab === "library" ? "text-cyan-400" : "hover:text-slate-200"}`}
        >
          <ImageIcon className="w-4 h-4" />
          <span className="text-[9px] font-bold tracking-wider">Library</span>
        </button>

        <button
          onClick={() => { setGalleryTab("albums"); setSelectedAlbumId(null); }}
          className={`flex flex-col items-center gap-1 transition-colors ${galleryTab === "albums" ? "text-cyan-400" : "hover:text-slate-200"}`}
        >
          <Layers className="w-4 h-4" />
          <span className="text-[9px] font-bold tracking-wider">Albums</span>
        </button>

        <button
          onClick={() => { setGalleryTab("favorites"); setSelectedAlbumId(null); }}
          className={`flex flex-col items-center gap-1 transition-colors ${galleryTab === "favorites" ? "text-cyan-400" : "hover:text-slate-200"}`}
        >
          <div className="relative">
            <Heart className="w-4 h-4" />
            {favoritePhotos.length > 0 && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
            )}
          </div>
          <span className="text-[9px] font-bold tracking-wider">Favorites</span>
        </button>

        <button
          onClick={() => { setGalleryTab("search"); setSelectedAlbumId(null); }}
          className={`flex flex-col items-center gap-1 transition-colors ${galleryTab === "search" ? "text-cyan-400" : "hover:text-slate-200"}`}
        >
          <Search className="w-4 h-4" />
          <span className="text-[9px] font-bold tracking-wider">Search</span>
        </button>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL (iOS immersive slideshow style) */}
      <AnimatePresence>
        {currentLightboxPhoto && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/98 backdrop-blur-2xl p-4 md:p-6"
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between py-3 px-4 text-slate-300">
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">{currentLightboxPhoto.albumName}</span>
                <span className="text-xs font-bold text-slate-300">{currentLightboxPhoto.date}</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Favorite Action inside Lightbox */}
                <button
                  onClick={() => toggleFavorite(currentLightboxPhoto.id)}
                  className="p-2 rounded-full bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800 text-slate-300 transition-colors"
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.includes(currentLightboxPhoto.id) ? "fill-red-500 text-red-500" : "text-slate-400 hover:text-white"}`} 
                  />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2 rounded-full bg-slate-900/60 border border-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                  title="Close Lightbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Immersive Photo Viewer Layout with Side Navigation */}
            <div className="flex-grow flex items-center justify-between relative overflow-hidden px-4 md:px-12 my-auto">
              
              {/* Left Arrow */}
              {lightboxList.length > 1 && (
                <button
                  onClick={(e) => navigateLightbox("prev", e)}
                  className="absolute left-4 z-25 p-3 rounded-full bg-slate-900/50 hover:bg-slate-900 border border-slate-800/40 text-slate-300 hover:text-white transition-all shadow-md group active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              )}

              {/* Main Photo viewport */}
              <div className="w-full h-full max-h-[60vh] flex items-center justify-center">
                <motion.img
                  key={currentLightboxPhoto.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  src={currentLightboxPhoto.src}
                  alt={currentLightboxPhoto.title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-900 select-none"
                />
              </div>

              {/* Right Arrow */}
              {lightboxList.length > 1 && (
                <button
                  onClick={(e) => navigateLightbox("next", e)}
                  className="absolute right-4 z-25 p-3 rounded-full bg-slate-900/50 hover:bg-slate-900 border border-slate-800/40 text-slate-300 hover:text-white transition-all shadow-md group active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Bottom Photo Metadata & Sub-slider navigation */}
            <div className="py-4 px-6 bg-slate-950/80 border-t border-slate-900/80 max-w-2xl mx-auto w-full rounded-2xl mb-2 backdrop-blur-md">
              <div className="flex gap-3 text-left items-start">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mt-1">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">{currentLightboxPhoto.title}</h3>
                  {currentLightboxPhoto.description && (
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{currentLightboxPhoto.description}</p>
                  )}
                </div>
              </div>
              
              {/* Photo position indicator */}
              <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] font-bold text-slate-500">
                <span>{lightboxIndex + 1}</span>
                <span>/</span>
                <span>{lightboxList.length}</span>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
