import { useState, useMemo } from "react";

const MOVIES = [
  {
    id: 1,
    title: "Oppenheimer",
    year: 2023,
    genre: ["Drama", "History"],
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    rating: 4.7,
    votes: 2341,
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon", "Robert Downey Jr."],
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II. A gripping tale of brilliance, moral complexity, and consequence.",
    duration: "180 min",
    language: "English",
  },
  {
    id: 2,
    title: "Dune: Part Two",
    year: 2024,
    genre: ["Sci-Fi", "Adventure"],
    poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    rating: 4.5,
    votes: 1897,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler"],
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.",
    duration: "166 min",
    language: "English",
  },
  {
    id: 3,
    title: "Poor Things",
    year: 2023,
    genre: ["Fantasy", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXInfouS8XT5HNa.jpg",
    rating: 4.3,
    votes: 1543,
    director: "Yorgos Lanthimos",
    cast: ["Emma Stone", "Mark Ruffalo", "Willem Dafoe", "Ramy Youssef"],
    description:
      "Bella Baxter is brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter. Under his protection, she longs to learn. Swept off by the dashing lawyer Duncan Wedderburn, she travels across continents.",
    duration: "141 min",
    language: "English",
  },
  {
    id: 4,
    title: "The Zone of Interest",
    year: 2023,
    genre: ["Drama", "History"],
    poster: "https://image.tmdb.org/t/p/w500/hUu9zyZmKuquJU4TzVkq0W3bUop.jpg",
    rating: 4.1,
    votes: 987,
    director: "Jonathan Glazer",
    cast: ["Christian Friedel", "Sandra Hüller"],
    description:
      "The commandant of Auschwitz, Rudolf Höss, and his wife strive to build a dream life for their family in a house and garden next to the camp.",
    duration: "105 min",
    language: "German",
  },
  {
    id: 5,
    title: "Killers of the Flower Moon",
    year: 2023,
    genre: ["Crime", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg",
    rating: 4.4,
    votes: 1678,
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Robert De Niro", "Lily Gladstone"],
    description:
      "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s, spurring a major F.B.I. investigation involving J. Edgar Hoover.",
    duration: "206 min",
    language: "English",
  },
  {
    id: 6,
    title: "Past Lives",
    year: 2023,
    genre: ["Drama", "Romance"],
    poster: "https://image.tmdb.org/t/p/w500/k3waqVXSnästad5IFxrMDE9bfbe.jpg",
    rating: 4.6,
    votes: 1234,
    director: "Celine Song",
    cast: ["Greta Lee", "Teo Yoo", "John Magaro"],
    description:
      "Nora and Hae Sung, two deeply connected childhood friends, are separated when Nora's family emigrates from South Korea. Twenty years later, they are reunited in New York for one fateful week.",
    duration: "106 min",
    language: "English",
    poster: "https://image.tmdb.org/t/p/w500/k3waqVX5El7B0Smk5NeJMCCZjTd.jpg",
  },
  {
    id: 7,
    title: "Godzilla Minus One",
    year: 2023,
    genre: ["Action", "Sci-Fi"],
    poster: "https://image.tmdb.org/t/p/w500/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
    rating: 4.5,
    votes: 2100,
    director: "Takashi Yamazaki",
    cast: ["Ryunosuke Kamiki", "Minami Hamabe", "Yuki Yamada"],
    description:
      "Postwar Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.",
    duration: "125 min",
    language: "Japanese",
  },
  {
    id: 8,
    title: "Anatomy of a Fall",
    year: 2023,
    genre: ["Drama", "Thriller"],
    poster: "https://image.tmdb.org/t/p/w500/kQs6keheMwCxJxrzV83VUwFtHkB.jpg",
    rating: 4.2,
    votes: 876,
    director: "Justine Triet",
    cast: ["Sandra Hüller", "Swann Arlaud", "Milo Machado Graner"],
    description:
      "A woman is suspected of murdering her husband after he is found dead near their alpine chalet. As the trial begins, unresolved questions about their life together emerge.",
    duration: "150 min",
    language: "French",
  },
  {
    id: 9,
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genre: ["Animation", "Action"],
    poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    rating: 4.8,
    votes: 3456,
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
    duration: "140 min",
    language: "English",
  },
  {
    id: 10,
    title: "Barbie",
    year: 2023,
    genre: ["Comedy", "Fantasy"],
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8vlzmfa85CH6w0szDMcYQ.jpg",
    rating: 4.0,
    votes: 2987,
    director: "Greta Gerwig",
    cast: ["Margot Robbie", "Ryan Gosling", "America Ferrera"],
    description:
      "Barbie suffers a crisis that leads her to question her world and her existence. She goes on a journey of self-discovery with Ken by her side to the real world.",
    duration: "114 min",
    language: "English",
  },
  {
    id: 11,
    title: "Challengers",
    year: 2024,
    genre: ["Drama", "Romance"],
    poster: "https://image.tmdb.org/t/p/w500/H6vke7zGiuLsz4v4RPeReb9rsZ.jpg",
    rating: 4.2,
    votes: 1102,
    director: "Luca Guadagnino",
    cast: ["Zendaya", "Josh O'Connor", "Mike Faist"],
    description:
      "A former tennis prodigy turned coach puts her husband and his rival — her ex — on a collision course in a bid to help him win. The result is a story about passion, rivalry, and desire.",
    duration: "131 min",
    language: "English",
  },
  {
    id: 12,
    title: "Civil War",
    year: 2024,
    genre: ["Action", "Drama"],
    poster: "https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
    rating: 4.0,
    votes: 1450,
    director: "Alex Garland",
    cast: ["Kirsten Dunst", "Wagner Moura", "Cailee Spaeny"],
    description:
      "A journey across a dystopian future America, following a team of military-embedded journalists as they race against time to reach DC before rebellious factions descend upon the White House.",
    duration: "109 min",
    language: "English",
  },
];

const GENRES = ["All", ...new Set(MOVIES.flatMap((m) => m.genre))].sort();
const YEARS = ["All", ...new Set(MOVIES.map((m) => m.year))].sort((a, b) => b - a);

const StarRating = ({ value, onChange, size = "md" }) => {
  const [hovered, setHovered] = useState(0);
  const sz = size === "sm" ? "text-lg" : "text-2xl";

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`${sz} transition-all duration-150 ${
            star <= (hovered || value) ? "text-amber-400" : "text-stone-600"
          } ${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          onClick={() => onChange && onChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const MovieCard = ({ movie, userRating, onRate, onClick }) => {
  const displayRating = userRating || movie.rating;

  return (
    <div
      className="group relative bg-stone-900 rounded-2xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/20"
      onClick={() => onClick(movie)}
    >
      <div className="relative overflow-hidden aspect-2/3">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x450/1c1917/d6d3d1?text=${encodeURIComponent(movie.title)}`;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent opacity-80" />
        <div className="absolute top-3 right-3 bg-amber-400 text-stone-950 text-xs font-black px-2 py-1 rounded-lg">
          {movie.year}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-1.5 mb-1">
            <StarRating value={Math.round(displayRating)} size="sm" />
            <span className="text-amber-400 text-sm font-bold">{displayRating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-stone-100 font-bold text-sm leading-tight mb-2 line-clamp-2 group-hover:text-amber-300 transition-colors">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((g) => (
            <span key={g} className="text-xs bg-stone-800 text-stone-400 px-2 py-0.5 rounded-full">
              {g}
            </span>
          ))}
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <p className="text-stone-500 text-xs mb-1">Your rating:</p>
          <StarRating
            value={userRating || 0}
            onChange={(r) => onRate(movie.id, r)}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

const Modal = ({ movie, userRating, onRate, onClose }) => {
  if (!movie) return null;
  const displayRating = userRating || movie.rating;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-stone-900 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-stone-700 shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-64 relative overflow-hidden">
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.src = `https://placehold.co/800x300/1c1917/d6d3d1?text=${encodeURIComponent(movie.title)}`;
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-900 via-stone-900/60 to-transparent" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-950/80 text-stone-300 hover:text-white flex items-center justify-center text-xl font-bold border border-stone-700 hover:border-amber-500 transition-all"
          >
            ×
          </button>
        </div>

        <div className="p-6 -mt-12 relative">
          <div className="flex flex-wrap gap-2 mb-3">
            {movie.genre.map((g) => (
              <span key={g} className="text-xs bg-amber-400/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-medium">
                {g}
              </span>
            ))}
          </div>

          <h2 className="text-3xl font-black text-white mb-1 leading-tight">{movie.title}</h2>
          <p className="text-stone-500 text-sm mb-4">
            {movie.year} · {movie.duration} · {movie.language}
          </p>

          <div className="flex items-center gap-6 mb-6 flex-wrap">
            <div>
              <p className="text-stone-500 text-xs mb-1">Avg Rating</p>
              <div className="flex items-center gap-2">
                <StarRating value={Math.round(displayRating)} />
                <span className="text-amber-400 text-xl font-black">{displayRating.toFixed(1)}</span>
                <span className="text-stone-600 text-sm">({movie.votes.toLocaleString()} votes)</span>
              </div>
            </div>
            <div className="border-l border-stone-700 pl-6">
              <p className="text-stone-500 text-xs mb-1">Your Rating</p>
              <StarRating
                value={userRating || 0}
                onChange={(r) => onRate(movie.id, r)}
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Synopsis</h3>
            <p className="text-stone-300 leading-relaxed text-sm">{movie.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Director</h3>
              <p className="text-stone-200 text-sm font-medium">{movie.director}</p>
            </div>
            <div>
              <h3 className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Cast</h3>
              <p className="text-stone-200 text-sm">{movie.cast.slice(0, 3).join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [year, setYear] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [userRatings, setUserRatings] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleRate = (id, rating) => {
    setUserRatings((prev) => ({ ...prev, [id]: rating }));
  };

  const filtered = useMemo(() => {
    return MOVIES.filter((m) => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genre === "All" || m.genre.includes(genre);
      const matchYear = year === "All" || m.year === Number(year);
      return matchSearch && matchGenre && matchYear;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [search, genre, year, sortBy]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center text-stone-950 text-lg font-black">
              ★
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-none tracking-tight">CineRater</h1>
              <p className="text-stone-500 text-xs">Movie Reviews</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">🔍</span>
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <span className="text-stone-600 text-sm hidden sm:block">{filtered.length} films</span>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-stone-900/50 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto scrollbar-none flex-wrap sm:flex-nowrap">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer shrink-0"
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g === "All" ? "All Genres" : g}</option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer shrink-0"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer shrink-0"
          >
            <option value="rating">Sort: Top Rated</option>
            <option value="year">Sort: Newest</option>
            <option value="title">Sort: A–Z</option>
          </select>

          {(search || genre !== "All" || year !== "All") && (
            <button
              onClick={() => { setSearch(""); setGenre("All"); setYear("All"); }}
              className="text-amber-400 text-sm hover:text-amber-300 border border-amber-500/30 rounded-lg px-3 py-2 hover:bg-amber-400/10 transition-all shrink-0"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-stone-400 text-lg">No movies match your search.</p>
            <button
              onClick={() => { setSearch(""); setGenre("All"); setYear("All"); }}
              className="mt-4 text-amber-400 underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                userRating={userRatings[movie.id]}
                onRate={handleRate}
                onClick={setSelectedMovie}
              />
            ))}
          </div>
        )}
      </main>

      {/* Stats bar */}
      <footer className="border-t border-stone-800 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between text-stone-600 text-xs">
          <span>CineRater · {MOVIES.length} movies · {Object.keys(userRatings).length} rated by you</span>
          <span>Built with React + Tailwind</span>
        </div>
      </footer>

      {/* Modal */}
      <Modal
        movie={selectedMovie}
        userRating={userRatings[selectedMovie?.id]}
        onRate={handleRate}
        onClose={() => setSelectedMovie(null)}
      />
    </div>
  );
}