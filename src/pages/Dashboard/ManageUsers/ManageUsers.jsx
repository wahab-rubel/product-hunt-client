import { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://product-hunt-server-tawny.vercel.appusers') // Your API endpoint
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleMakeAdmin = (id) => {
    fetch(`https://product-hunt-server-tawny.vercel.appusers/admin/${id}`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          alert('User promoted to Admin!');
          // Refetch users
          setUsers(users.map(user => user._id === id ? { ...user, role: 'admin' } : user));
        }
      });
  };

  const handleMakeModerator = (id) => {
    fetch(`https://product-hunt-server-tawny.vercel.appusers/moderator/${id}`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          alert('User promoted to Moderator!');
          // Refetch users
          setUsers(users.map(user => user._id === id ? { ...user, role: 'moderator' } : user));
        }
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">{user.role}</td>
              <td className="py-2">
                {user.role !== 'admin' && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Make Admin
                  </button>
                )}
                {user.role !== 'moderator' && (
                  <button
                    onClick={() => handleMakeModerator(user._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Make Moderator
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
