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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLectures(response.data.lectures);
      } catch (error) {
        console.error(error);
        setError("Unable to load lectures.");
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (lectures.length === 0) {
    return <EmptyState message="No lectures assigned yet." />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        My Lectures
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {lectures.map((lecture) => (
          <LectureCard
            key={lecture._id}
            lecture={lecture}
          />
        ))}
      </div>
    </div>
  );
};

export default MyLectures;