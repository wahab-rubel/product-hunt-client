import { useState, useEffect } from 'react';

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState({ code: '', expiryDate: '', description: '', discount: '' });

  // Fetch Coupons
  useEffect(() => {
    fetch('http://localhost:5000/api/coupons')
      .then(res => res.json())
      .then(data => setCoupons(data.coupons));
  }, []);

  // Add Coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/coupons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) setCoupons([...coupons, data.coupon]);
  };

  // Delete Coupon
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/coupons/${id}`, { method: 'DELETE' });
    setCoupons(coupons.filter(c => c._id !== id));
  };

  return (
    <div>
      <h2>Manage Coupons</h2>
      <form onSubmit={handleAddCoupon}>
        <input placeholder="Coupon Code" onChange={(e) => setFormData({ ...formData, code: e.target.value })} required />
        <input type="date" onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })} required />
        <input placeholder="Description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
        <input type="number" placeholder="Discount (%)" onChange={(e) => setFormData({ ...formData, discount: e.target.value })} required />
        <button type="submit">Add Coupon</button>
      </form>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {coupons.map(coupon => (
          <div key={coupon._id} className="border p-4 rounded shadow">
            <h3>{coupon.code}</h3>
            <p>{coupon.description}</p>
            <p>Discount: {coupon.discount}%</p>
            <p>Expires: {coupon.expiryDate}</p>
            <button onClick={() => handleDelete(coupon._id)} className="bg-red-500 text-white px-2 py-1 mt-2">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCoupons;
