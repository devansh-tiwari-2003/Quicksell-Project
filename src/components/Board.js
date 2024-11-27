import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./../styles/Board.css";

const Board = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("");
  const [isDisplayVisible, setIsDisplayVisible] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  // Find user name based on userId
  const findUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  // Group tickets dynamically by status, userId, or priority
  const groupTickets = (tickets) => {
    const groups = {};
    tickets.forEach((ticket) => {
      const groupKey = ticket[groupBy];
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(ticket);
    });
    return groups;
  };

  // Sort tickets within each group
  const sortTickets = (group) => {
    return group.sort((a, b) => {
      if (sortBy === "priority") return b.priority - a.priority;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  };

  // Toggle display options
  const toggleDisplay = () => setIsDisplayVisible(!isDisplayVisible);

  const groupedTickets = groupTickets(tickets);

  return (
    <div className="kanban-container">
      <div className="kanban-controls">
        <button onClick={toggleDisplay} className="display-button">
          <img src="/icons/Display.svg" alt="Display Icon" className="display-icon" />
          Display <img src="/icons/down.svg" alt="Down Icon" className="down-icon" />
        </button>

        {/* Display control section */}
        {isDisplayVisible && (
          <div className="controls-dropdown">
            <label>
              Grouping:
              <select onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </label>

            <label>
              Ordering:
              <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        )}
      </div>

      {/* Kanban board with grouped tickets */}
      <div className="kanban-board">
        {Object.entries(groupedTickets).map(([key, group]) => (
          <div className="kanban-column" key={key}>
            <div className="column-header">
              <div className="group-title">
                {/* Display appropriate icon based on group type */}
                {groupBy === "priority" && (
                  <img 
                    src={`/icons/${key === "1" ? "Img - Low Priority" : key === "2" ? "Img - Medium Priority" : key === "3" ? "Img - High Priority" : "SVG - Urgent Priority colour"}.svg`} 
                    alt="Priority Icon"
                  />
                )}
                {groupBy === "status" && (
                  <img 
                    src={`/icons/${key === "Todo" ? "To-do" : key === "In progress" ? "in-progress" : key === "Backlog" ? "Backlog" : key === "Done" ? "Done" : key === "Cancelled" ? "Cancelled" : "No-priority"}.svg`} 
                    alt="Status Icon"
                  />
                )}
                {groupBy === "userId" && (
                  <img 
                    src={`/icons/profile.svg`} 
                    alt="User Icon"
                    className="user-avatar"
                  />
                )}
                <h3>{groupBy === "userId" ? findUserName(key) : groupBy === "priority" ? key === "1" ? "Low Priority" : key === "2" ? "Medium Priority" : key === "3" ? "High Priority" : key === "4" ? "Urgent Priority" :"No Priority" : key}</h3>
              </div>
              <div className="actions">
                <img 
                  src="/icons/add.svg" 
                  alt="Add Icon" 
                  className="add-icon"
                />
                <img 
                  src="/icons/3 dot menu.svg" 
                  alt="Menu Icon" 
                  className="menu-icon"
                />
              </div>
            </div>

            {/* Render tickets for this group */}
            {sortTickets(group).map((ticket) => (
              <Card 
                key={ticket.id} 
                ticket={ticket} 
                userName={findUserName(ticket.userId)} 
                groupBy={groupBy}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
