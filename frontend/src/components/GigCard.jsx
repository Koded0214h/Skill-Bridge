import { Link } from 'react-router-dom';

function GigCard({ gig }) {
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold">{gig.title}</h3>
            <p>{gig.company}</p>
            <p className="text-gray-500">{gig.description.clice(0, 100)}...</p>
            <Link to={`/gigs/${gig.id}`} className="text-blue-500 hover:underline mt-2 block">
            View Details</Link>
        </div>
    );
}