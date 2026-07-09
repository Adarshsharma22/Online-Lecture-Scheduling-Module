import { useEffect, useState } from "react";
import api from "../../services/api";
import LectureCard from "../../components/LectureCard";
import Loading from "../../components/Loading";
import EmptyState from "../../components/EmptyState";

const MyLectures = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/instructor/my-lectures", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLectures(response.data.lectures || []);
      } catch (error) {
        console.error(error);
        setError("Unable to retrieve your scheduled lectures. Please check your network connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 bg-red-50/80 backdrop-blur-md border border-red-100 rounded-2xl p-5 text-red-700 flex items-start gap-3.5 shadow-sm w-[calc(100%-2rem)]">
        <span className="text-lg bg-red-100 p-2 rounded-xl shrink-0 leading-none">⚠️</span>
        <div className="space-y-0.5 mt-1">
          <h3 className="font-bold text-sm tracking-tight text-red-800">Connection Error</h3>
          <p className="font-medium text-xs sm:text-sm text-red-700/90 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  if (lectures.length === 0) {
    return <EmptyState message="No lectures assigned yet. Check back later!" />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 antialiased">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">My Lectures</h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Comprehensive overview timeline of your allocated instructional course streams.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {lectures.map((lecture) => (
          <LectureCard key={lecture._id} lecture={lecture} />
        ))}
      </div>
    </div>
  );
};

export default MyLectures;