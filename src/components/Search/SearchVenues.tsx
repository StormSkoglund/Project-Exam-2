import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchedVenuesSearch, {
  Venue,
} from "../../hooks/useFetchedVenuesSearch";

// Modified version (with debouncer) of the code presented in Connor O'Brien's video "7-React-typeahead-search-example" (Accessed: 01 October 2024).

function SearchVenues() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 350);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { isLoading, isError, data, error } =
    useFetchedVenuesSearch(debouncedSearchTerm);

  if (isLoading) {
    return <span className="text-center">Loading...</span>;
  }

  if (isError) {
    const errorMessage = (error as Error).message;
    return <span>Error: {errorMessage}</span>;
  }

  if (!data) {
    return <span>There is no data</span>;
  }

  const filterProducts = data.filter((venue: Venue) =>
    venue.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex items-center flex-col justify-center m-5 relative">
      <label htmlFor="search" className="w-2/4 text-md font-bold text-gray-800">
        Search
      </label>

      <input
        autoComplete="off"
        className="border-solid border-2 border-theme-blue rounded-md p-2 w-6/12 relative"
        value={searchTerm}
        id="search"
        placeholder="What Is Your Destination?"
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {filterProducts.length > 0 && debouncedSearchTerm.length > 0 && (
        <ul className="border-solid rounded-lg p-2 w-6/12 absolute top-full z-50 mt-2 bg-theme-blue opacity-85 shadow-lg text-lg text-white">
          {filterProducts.map((venue: Venue) => (
            <li key={venue.id}>
              <Link
                to={`venuepage/${venue.id}`}
                className="block p-4 hover:bg-theme-green duration-200"
              >
                {venue.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchVenues;
