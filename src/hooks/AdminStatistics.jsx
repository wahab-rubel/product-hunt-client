import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

const AdminStatistics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch('https://product-hunt-server-tawny.vercel.appadmin/statistics')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  const pieData = {
    labels: ['All Products', 'Accepted', 'Pending', 'Reviews', 'Users'],
    datasets: [{
      data: [
        stats.totalProducts,
        stats.totalAcceptedProducts,
        stats.totalPendingProducts,
        stats.totalReviews,
        stats.totalUsers
      ],
      backgroundColor: ['#36A2EB', '#4BC0C0', '#FFCE56', '#FF6384', '#9966FF']
    }]
  };

  return <Pie data={pieData} />;
};

export default AdminStatistics;
