import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api.js";
import { AuthContext } from "../context/AuthContext";
import TicketCard from "../components/TicketCard";
import Header from "../components/Header";

const TicketsList = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(9); 
  const [nextOffset, setNextOffset] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async (searchTerm = "", offsetValue = 0) => {
    setLoading(true);
    try {
      const { data } = await API.get(`/tickets?search=${searchTerm}&limit=${limit}&offset=${offsetValue}`);
      setTickets(offsetValue === 0 ? data.items : prevTickets => [...prevTickets, ...data.items]);
      setNextOffset(data.next_offset);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      
      setOffset(0);
      fetchTickets(search, 0);
    }, 500); 

    return () => clearTimeout(timer);
  }, [search, limit]);


  const handleLoadMore = () => {
    if (nextOffset !== null && !loading) {
      setOffset(nextOffset);
      fetchTickets(search, nextOffset);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header title="All Tickets" />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              onChange={handleSearchChange}
              className="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            />
             <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button
            onClick={() => navigate("/tickets/new")}
            className="w-full md:w-auto bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-transform transform hover:scale-105 flex items-center justify-center gap-2"
          >
             <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            New Ticket
          </button>
        </div>

        {loading && tickets.length === 0 ? (
          <div className="text-center py-10 text-gray-400">Loading tickets...</div>
        ) : !loading && tickets.length === 0 ? (
          <div className="text-center py-10 bg-gray-800/50 border border-gray-700 rounded-xl">
            <h3 className="text-xl font-semibold text-white">No tickets found</h3>
            <p className="text-gray-400 mt-2">Try adjusting your search or create a new ticket.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} onClick={() => navigate(`/tickets/${ticket._id}`)} />
            ))}
          </div>
        )}

        {nextOffset !== null && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-3 font-semibold rounded-lg text-white bg-gray-700 hover:bg-gray-600 transition-colors disabled:bg-gray-800 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TicketsList;