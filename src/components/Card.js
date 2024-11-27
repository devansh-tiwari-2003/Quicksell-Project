import React from "react";
import "./../styles/Card.css";

const Card = ({ ticket, userName, userAvatar, groupBy }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return "/icons/SVG - Urgent Priority colour.svg";
      case 3: return "/icons/Img - High Priority.svg";
      case 2: return "/icons/Img - Medium Priority.svg";
      case 1: return "/icons/Img - Low Priority.svg";
      default: return "/icons/No-priority.svg";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Todo":
        return "/icons/To-do.svg";
      case "In progress":
        return "/icons/in-progress.svg";
      case "Backlog":
        return "/icons/Backlog.svg";
      case "Cancelled":
        return "/icons/Cancelled.svg";
      case "Done":
        return "/icons/Done.svg";
      default:
        return "/icons/No-priority.svg";
    }
  };

  return (
    <div className="ticket-card">
      <div className="card-header">
        {/* Conditionally render Status Icon and User Avatar based on groupBy */}
        <span className="ticket-id">{ticket.id}</span>
        
        {groupBy === "status" || groupBy === "priority" ? (
          <img src={"/icons/profile.svg"} alt="User Avatar" className="user-avatar" />
        ) : null}
      </div>

      <div className="card-body">
        <h4 className="ticket-title">
          {(groupBy === "userId" || groupBy === "priority")  && <img src={getStatusIcon(ticket.status)} alt="Status Icon" className="status-icon" />} 
          {ticket.title}
        </h4>

        <div className="ticket-icons">
          {(groupBy === "status" || groupBy === "userId") && (
            <img src={getPriorityIcon(ticket.priority)} alt="Priority Icon" className="priority-icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
