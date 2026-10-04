import { useRef, useState } from "react";

function FilterBar({ onFilter }) {
    const [filters, setFilters] = useState({
        status: "",
        priority: "",
        assignedTo: "",
        dueDate: ""
    });

    const dateInputRef = useRef(null);

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
        <div className="filter-panel">

            {/* STATUS */}
            <div className="filter-field filter-with-icon">
                <span className="filter-icon">
                    {filters.status === "" && "🔄"}
                    {filters.status === "TODO" && "📋"}
                    {filters.status === "IN PROGRESS" && "⚙️"}
                    {filters.status === "COMPLETED" && "✅"}
                </span>

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
            </div>


            {/* PRIORITY */}
            <div className="filter-field filter-with-icon">
                <span className="filter-icon">
                    {filters.priority === "" && "◆"}
                    {filters.priority === "LOW" && "🟢"}
                    {filters.priority === "MEDIUM" && "🟡"}
                    {filters.priority === "HIGH" && "🔴"}
                </span>

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
            </div>


            {/* ASSIGNED TO */}
            <div className="filter-field filter-with-icon">
                <span className="filter-icon">
                    👤
                </span>

                <input
                    type="text"
                    name="assignedTo"
                    placeholder="Assigned to"
                    value={filters.assignedTo}
                    onChange={handleChange}
                />
            </div>


            {/* DUE DATE */}
            
<div className="filter-field filter-with-icon">

    <button
        type="button"
        className="filter-icon date-icon-button"
        onClick={() => {
            if (dateInputRef.current) {
                dateInputRef.current.showPicker();
            }
        }}
        aria-label="Open calendar"
    >
        📅
    </button>

    <input
        ref={dateInputRef}
        type="date"
        name="dueDate"
        value={filters.dueDate}
        onChange={handleChange}
    />

</div>


            {/* CLEAR */}
            <button
                type="button"
                className="clear-filters"
                onClick={clearFilters}
            >
                ↻ Clear
            </button>

        </div>
    );
}

export default FilterBar;