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
        setError("Unable to retrieve your scheduled lectures. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchLectures();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 flex items-center gap-3 shadow-sm">
        <span className="text-xl">⚠️</span>
        <p className="font-medium text-sm">{error}</p>
      </div>
    );
  }

  if (lectures.length === 0) {
    return <EmptyState message="No lectures assigned yet. Check back later!" />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Lectures</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lectures.map((lecture) => (
          <LectureCard key={lecture._id} lecture={lecture} />
        ))}
      </div>
    </div>
  );
};

export default MyLectures;