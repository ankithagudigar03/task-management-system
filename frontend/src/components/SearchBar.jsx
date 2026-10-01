import { useState } from "react";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;

        setSearch(value);
        onSearch(value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={handleChange}
            />

            {search && (
                <button
                    type="button"
                    onClick={() => {
                        setSearch("");
                        onSearch("");
                    }}
                >
                    Clear
                </button>
            )}
        </div>
    );
}

export default SearchBar;