import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Header from "../components/Header";

const NewTicket = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/tickets", { title, description, priority }, { headers: { "Idempotency-Key": crypto.randomUUID() } });
      navigate("/tickets");
    } catch (err) {
      setError(err.response?.data?.error?.message || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header title="Create New Ticket" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto bg-gray-800/50 border border-gray-700 rounded-2xl shadow-lg p-8">
          {error && (
             <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-6 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Title</label>
              <input
                id="title" type="text" placeholder="e.g., Printer not working" value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                id="description" placeholder="Provide a detailed description of the issue..." value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                rows={6} required
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select
                id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-gray-700/50 text-gray-200 border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none appearance-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex justify-end gap-4 pt-4">
                 <button type="button" onClick={() => navigate('/tickets')} className="px-6 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition-colors">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-transform transform hover:scale-105 disabled:bg-blue-800 disabled:cursor-not-allowed disabled:scale-100"
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Ticket"}
                </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NewTicket;