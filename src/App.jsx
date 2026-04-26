import { useState, useMemo, useEffect } from "react";

const API_KEY = "3c97adf";

const parseRating = (imdbRating) => {
  if (!imdbRating || imdbRating === "N/A") return 0;
  return parseFloat(imdbRating) / 2; // Convert 10-scale to 5-scale
};

const parseVotes = (imdbVotes) => {
  if (!imdbVotes || imdbVotes === "N/A") return 0;
  return parseInt(imdbVotes.replace(/,/g, ""));
};

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
      className="group relative bg-stone-900 rounded-2xl overflow-hidden cursor-pointer border border-stone-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/20 flex flex-col h-full"
      onClick={() => onClick(movie)}
    >
      <div className="relative overflow-hidden aspect-2/3 shrink-0">
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

      <div className="p-4 flex flex-col grow">
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
        <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
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
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [genre, setGenre] = useState("All");
  const [year, setYear] = useState("All");
  const [minRating, setMinRating] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  
  // Try to load user ratings from localStorage to make them persistent
  const [userRatings, setUserRatings] = useState(() => {
    try {
      const saved = localStorage.getItem("cinerater_ratings");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const query = searchInput.trim() || "Batman";
        const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
        const data = await res.json();

        if (data.Response === "True") {
          const detailPromises = data.Search.slice(0, 10).map((m) =>
            fetch(`https://www.omdbapi.com/?i=${m.imdbID}&apikey=${API_KEY}`).then((r) => r.json())
          );
          const detailedMovies = await Promise.all(detailPromises);

          const formattedMovies = detailedMovies.map((m) => ({
            id: m.imdbID,
            title: m.Title,
            year: parseInt(m.Year) || m.Year,
            genre: m.Genre !== "N/A" ? m.Genre.split(", ") : ["Unknown"],
            poster: m.Poster !== "N/A" && m.Poster !== "" ? m.Poster : `https://placehold.co/300x450/1c1917/d6d3d1?text=${encodeURIComponent(m.Title)}`,
            rating: parseRating(m.imdbRating),
            votes: parseVotes(m.imdbVotes),
            director: m.Director,
            cast: m.Actors !== "N/A" ? m.Actors.split(", ") : ["Unknown"],
            description: m.Plot !== "N/A" ? m.Plot : "No description available.",
            duration: m.Runtime,
            language: m.Language,
          }));
          setMovies(formattedMovies);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch (err) {
        setMovies([]);
        setError("Failed to fetch movies.");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchInput]);

  const handleRate = (id, rating) => {
    const newRatings = { ...userRatings, [id]: rating };
    setUserRatings(newRatings);
    localStorage.setItem("cinerater_ratings", JSON.stringify(newRatings));
  };

  const GENRES = ["All", ...new Set(movies.flatMap((m) => m.genre))].sort();
  const YEARS = ["All", ...new Set(movies.map((m) => m.year))].sort((a, b) => b - a);

  const filtered = useMemo(() => {
    return movies.filter((m) => {
      const matchGenre = genre === "All" || m.genre.includes(genre);
      const matchYear = year === "All" || m.year === Number(year);
      const matchRating = minRating === "All" || m.rating >= Number(minRating);
      return matchGenre && matchYear && matchRating;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.year - a.year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [movies, genre, year, minRating, sortBy]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100" style={{ fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div className="w-9 h-9 bg-amber-400 rounded-xl flex items-center justify-center text-stone-950 text-lg font-black shadow-lg shadow-amber-400/20">
              ★
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-none tracking-tight">CineRater</h1>
              <p className="text-stone-500 text-xs uppercase tracking-wider font-bold mt-0.5">Movie Reviews</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:flex-1 sm:max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500">🔍</span>
            <input
              type="text"
              placeholder="Search Here..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
            />
          </div>

          <span className="text-stone-600 text-sm hidden lg:block font-medium">
            {isLoading ? "Searching..." : `${filtered.length} results`}
          </span>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-stone-900/50 border-b border-stone-800 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 overflow-x-auto scrollbar-none flex-nowrap">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer shrink-0 transition-colors hover:border-stone-500"
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g === "All" ? "All Genres" : g}</option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer shrink-0 transition-colors hover:border-stone-500"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>{y === "All" ? "All Years" : y}</option>
            ))}
          </select>

          <select
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer shrink-0 transition-colors hover:border-stone-500"
          >
            <option value="All">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Stars</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 cursor-pointer shrink-0 transition-colors hover:border-stone-500"
          >
            <option value="rating">Sort: Top Rated</option>
            <option value="year">Sort: Newest</option>
            <option value="title">Sort: A–Z</option>
          </select>

          {(genre !== "All" || year !== "All" || minRating !== "All") && (
            <button
              onClick={() => { setGenre("All"); setYear("All"); setMinRating("All"); }}
              className="text-amber-400 text-sm font-medium hover:text-amber-300 border border-amber-500/30 rounded-lg px-3 py-2 hover:bg-amber-400/10 transition-all shrink-0 ml-auto sm:ml-0"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative min-h-[50vh]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-stone-500 animate-pulse">
              <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
              <p className="text-sm font-medium uppercase tracking-widest">Loading Movies...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4 text-stone-700">⚠️</div>
            <p className="text-red-400 text-lg font-medium">{error}</p>
            <p className="text-stone-500 mt-2 text-sm">Try searching for something else.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4 opacity-50">🎬</div>
            <p className="text-stone-400 text-lg">No movies match your filters.</p>
            <button
              onClick={() => { setGenre("All"); setYear("All"); setMinRating("All"); }}
              className="mt-4 text-amber-400 underline text-sm hover:text-amber-300 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 lg:gap-6">
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
      <footer className="border-t border-stone-800 mt-auto bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-xs font-medium gap-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">CineRater</span>
            <span className="opacity-50">•</span>
            <span>{movies.length} movies loaded</span>
            <span className="opacity-50">•</span>
            <span>{Object.keys(userRatings).length} rated</span>
          </div>
          <div className="flex gap-4">
            <span>Powered by OMDb API</span>
            <span className="opacity-50">•</span>
            <span>React + Tailwind</span>
          </div>
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
