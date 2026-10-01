import { useState } from "react";

function FilterBar({ onFilter }) {
    const [filters, setFilters] = useState({
        status: "",
        priority: "",
        assignedTo: "",
        dueDate: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        const updatedFilters = {
            ...filters,
            [name]: value
        };

        setFilters(updatedFilters);
        onFilter(updatedFilters);
    };

    const clearFilters = () => {
        const emptyFilters = {
            status: "",
            priority: "",
            assignedTo: "",
            dueDate: ""
        };

        setFilters(emptyFilters);
        onFilter(emptyFilters);
    };

    return (
        <div className="filter-bar">
            <select
                name="status"
                value={filters.status}
                onChange={handleChange}
            >
                <option value="">All Status</option>
                <option value="TODO">TODO</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>

            <select
                name="priority"
                value={filters.priority}
                onChange={handleChange}
            >
                <option value="">All Priorities</option>
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>

            <input
                type="text"
                name="assignedTo"
                placeholder="Assigned to"
                value={filters.assignedTo}
                onChange={handleChange}
            />

            <input
                type="date"
                name="dueDate"
                value={filters.dueDate}
                onChange={handleChange}
            />

            <button
                type="button"
                onClick={clearFilters}
            >
                Clear Filters
            </button>
        </div>
    );
}

export default FilterBar;