import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ReportedContents = () => {
  const [reported, setReported] = useState([]);

  useEffect(() => {
    fetch("https://your-api-url.com/reported-products")
      .then(res => res.json())
      .then(data => setReported(data));
  }, []);

  const handleDelete = id => {
    fetch(`https://your-api-url.com/products/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        setReported(prev => prev.filter(item => item._id !== id));
        alert("Product deleted successfully");
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Reported Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reported.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td className="space-x-2">
                  <Link to={`/products/${p._id}`}>
                    <button className="btn btn-info btn-sm">View Details</button>
                  </Link>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedContents;
