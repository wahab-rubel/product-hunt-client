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

    if (isPending) return <p>Loading...</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Statistics</h2>
            <p>Total Products: {stats.totalProducts}</p>
            <p>Total Votes: {stats.totalVotes}</p>
            <p>Accepted Products: {stats.acceptedProducts}</p>
            <p>Rejected Products: {stats.rejectedProducts}</p>
            <p>Pending Products: {stats.pendingProducts}</p>

            {stats.mostVotedProduct && (
                <div className="mt-4 p-4 border rounded">
                    <h3 className="text-xl font-semibold">Most Voted Product</h3>
                    <img src={stats.mostVotedProduct.image} alt={stats.mostVotedProduct.name} className="w-32 h-32 object-cover" />
                    <p>Name: {stats.mostVotedProduct.name}</p>
                    <p>Votes: {stats.mostVotedProduct.upvotes}</p>
                    <p>Comments: {stats.mostVotedProduct.comments}</p>
                </div>
            )}
        </div>
    );
};

export default Statistics;
