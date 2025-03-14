import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isPending } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stats');
            return res.data;
        }
    });

    if (isPending) return <p className="text-center text-lg font-semibold">Loading...</p>;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center">📊 Admin Statistics</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Products" value={stats.totalProducts} color="bg-gradient-to-r from-indigo-500 to-purple-500" />
                <StatCard title="Total Votes" value={stats.totalVotes} color="bg-gradient-to-r from-green-400 to-blue-500" />
                <StatCard title="Accepted Products" value={stats.acceptedProducts} color="bg-gradient-to-r from-emerald-400 to-teal-500" />
                <StatCard title="Rejected Products" value={stats.rejectedProducts} color="bg-gradient-to-r from-red-500 to-pink-500" />
                <StatCard title="Pending Products" value={stats.pendingProducts} color="bg-gradient-to-r from-yellow-400 to-orange-500" />
            </div>

            {stats.mostVotedProduct && (
                <div className="mt-8 p-6 rounded-2xl shadow-lg bg-white border">
                    <h3 className="text-2xl font-semibold text-center mb-4">🏆 Most Voted Product</h3>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={stats.mostVotedProduct.image}
                            alt={stats.mostVotedProduct.name}
                            className="w-40 h-40 object-cover rounded-xl shadow-md"
                        />
                        <div className="space-y-2">
                            <p className="text-xl font-medium">Name: <span className="font-semibold">{stats.mostVotedProduct.name}</span></p>
                            <p className="text-lg">Votes: <span className="font-semibold">{stats.mostVotedProduct.upvotes}</span></p>
                            <p className="text-lg">Comments: <span className="font-semibold">{stats.mostVotedProduct.comments}</span></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Reusable StatCard Component
const StatCard = ({ title, value, color }) => {
    return (
        <div className={`rounded-xl shadow-md text-white p-6 ${color}`}>
            <p className="text-lg font-medium">{title}</p>
            <p className="text-3xl font-bold mt-2">{value !== undefined ? value : 0}</p>
        </div>
    );
};

export default Statistics;
