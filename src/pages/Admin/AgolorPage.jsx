import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // Use the custom hook

const AgolorPage = () => {
  const { user } = useAuth();  // Correct usage of useAuth hook
  const [activityLog, setActivityLog] = useState([]);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    fetch('/activity-log.json')
      .then((res) => res.json())
      .then((data) => setActivityLog(data))
      .catch((err) => console.error('Failed to load activity log:', err));
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        ⛔ You do not have access to this page.
      </div>
    );
  }

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedActivityLog = [...activityLog].sort((a, b) => {
    let comparison = 0;
    if (['user', 'activity', 'timestamp'].includes(sortBy)) {
      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();
      comparison = valueA.localeCompare(valueB);
    } else if (sortBy === 'id') {
      comparison = a.id - b.id;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-28">
      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-xl font-semibold mb-4">📝 User Activity Log</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('id')}>
                  ID {sortBy === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('user')}>
                  User {sortBy === 'user' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('activity')}>
                  Activity {sortBy === 'activity' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('timestamp')}>
                  Timestamp {sortBy === 'timestamp' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedActivityLog.map(log => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{log.id}</td>
                  <td className="border border-gray-300 p-2">{log.user}</td>
                  <td className="border border-gray-300 p-2">{log.activity}</td>
                  <td className="border border-gray-300 p-2">{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgolorPage;
