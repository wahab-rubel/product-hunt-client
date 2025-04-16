import { useEffect, useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://product-hunt-server-eight-flax.vercel.app/products/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const updateUserRole = (id, role) => {
    fetch(`https://product-hunt-server-eight-flax.vercel.app/products/users/${role}/${id}`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          alert(`User promoted to ${role.charAt(0).toUpperCase() + role.slice(1)}!`);
          setUsers(prev =>
            prev.map(user =>
              user._id === id ? { ...user, role } : user
            )
          );
        }
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{idx + 1}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role || 'User'}</td>
                <td className="py-2 px-4 space-x-2">
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => updateUserRole(user._id, 'admin')}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== 'moderator' && (
                    <button
                      onClick={() => updateUserRole(user._id, 'moderator')}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Make Moderator
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
