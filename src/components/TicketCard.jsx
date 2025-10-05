import React from "react";
const getPriorityClasses = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'bg-red-500/10 text-red-400 border-red-500/30';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    case 'low':
      return 'bg-green-500/10 text-green-400 border-green-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

const getStatusClasses = (status) => {
  switch (status?.toLowerCase()) {
    case 'open':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    case 'in progress':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    case 'resolved':
      return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
    case 'closed':
      return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
  }
};

const TicketCard = ({ ticket, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-lg p-5 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group flex flex-col h-full"
    >
      <h2 className="text-xl font-bold text-gray-100 mb-2 truncate group-hover:text-blue-400 transition-colors">
        {ticket.title}
      </h2>

      <p className="text-gray-400 text-sm mb-4 flex-grow line-clamp-2">
        {ticket.description}
      </p>
      <div className="flex flex-wrap gap-2 items-center mt-auto pt-4 border-t border-gray-700/50">
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityClasses(ticket.priority)}`}>
           {ticket.priority}
        </span>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusClasses(ticket.status)}`}>
           {ticket.status}
        </span>
        {ticket.breached && (
            <span className="px-3 py-1 text-xs font-bold rounded-full border bg-red-900/50 text-red-400 border-red-700 animate-pulse">
                SLA Breached
            </span>
        )}
      </div>
    </div>
  );
};

export default TicketCard;

