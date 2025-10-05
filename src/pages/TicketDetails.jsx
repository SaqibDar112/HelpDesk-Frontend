import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import Header from "../components/Header.jsx";
import Comment from "../components/Comment.jsx";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTicket = async () => {
    try {
      const { data } = await API.get(`/tickets/${id}`);
      setTicket(data);
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      await API.post(`/tickets/${id}/comments`, { content: comment }, { headers: { "Idempotency-Key": crypto.randomUUID() } });
      setComment("");
      fetchTicket();
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to add comment");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!ticket) return;
    try {
      const { data: latestTicket } = await API.get(`/tickets/${id}`);
      await API.patch(`/tickets/${id}`, { status: newStatus, version: latestTicket.version }, { headers: { "Idempotency-Key": crypto.randomUUID() } });
      fetchTicket();
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to update status");
      setTimeout(() => setError(""), 5000);
    }
  };

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-blue-500/20 text-blue-300';
      case 'in-progress': return 'bg-purple-500/20 text-purple-300';
      case 'resolved': return 'bg-teal-500/20 text-teal-300';
      case 'closed': return 'bg-gray-600/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getPriorityClasses = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header title={`Ticket #${id ? id.substring(0, 8) : ''}...`} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading ticket details...</div>
        ) : error ? (
          <div className="text-center py-10 bg-red-900/50 text-red-300 rounded-xl p-6">{error}</div>
        ) : !ticket ? (
          <div className="text-center py-10 bg-gray-800/50 rounded-xl p-6">Ticket not found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusClasses(ticket.status)}`}>{ticket.status}</span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getPriorityClasses(ticket.priority)}`}>{ticket.priority}</span>
                  {ticket.breached && <span className="px-3 py-1 text-sm font-bold rounded-full bg-red-900/50 text-red-400 border border-red-700 animate-pulse">SLA Breached</span>}
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">{ticket.title}</h2>
                <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Comments ({ticket.comments.length})</h3>
                <ul className="space-y-4 mb-6">
                  {ticket.comments.map((c, idx) => <Comment key={idx} comment={c} />)}
                </ul>
                <div className="flex items-start gap-4">
                  <textarea placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} className="flex-1 bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none" rows="3" />
                  <button onClick={handleAddComment} className="px-6 py-3 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">Add Comment</button>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              {(user?.role === "agent" || user?.role === "admin") && (
                <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Actions</h3>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => handleStatusChange("in-progress")} className="w-full text-center px-4 py-2 bg-purple-600/80 text-white rounded-lg hover:bg-purple-700/80 transition-colors">Set In Progress</button>
                    <button onClick={() => handleStatusChange("resolved")} className="w-full text-center px-4 py-2 bg-teal-600/80 text-white rounded-lg hover:bg-teal-700/80 transition-colors">Resolve</button>
                    <button onClick={() => handleStatusChange("closed")} className="w-full text-center px-4 py-2 bg-gray-600/80 text-white rounded-lg hover:bg-gray-500/80 transition-colors">Close</button>
                  </div>
                </div>
              )}
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Timeline</h3>
                <ul className="space-y-2">
                  {ticket.timeline.map((t, idx) => (
                    <li key={idx} className="border-b border-gray-700 py-2 last:border-b-0 text-sm">
                      <p className="font-medium text-gray-200">{t.action}</p>
                      <p className="text-gray-400">
                        {t.user && <span>by {t.user.name || t.user.email}</span>}
                      </p>
                      <p className="text-gray-500 text-xs">{t.timestamp ? new Date(t.timestamp).toLocaleString() : "Invalid date"}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TicketDetail;