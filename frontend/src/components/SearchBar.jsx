import { useState } from "react";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;

        setSearch(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setSearch("");
        onSearch("");
    };

    return (
        <div className="search-bar">

            <span className="search-icon">
                🔍
            </span>

            <input
                type="text"
                placeholder="Search your tasks..."
                value={search}
                onChange={handleChange}
            />

            {search && (
                <button
                    type="button"
                    className="search-clear"
                    onClick={clearSearch}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}

        </div>
    );
}

export default SearchBar;