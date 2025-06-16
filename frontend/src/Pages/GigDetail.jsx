import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

function GigDetail() {
    const { id } = useParams();
    const { gigs, setGig } = useState(null);

    useEffect(() => {
        axios.get(`/api/gigs/${id}`)
        .then(res=> setGig(res.data))
        .catch(err=> console.error(err));
    }, [id]);

    if(!gig) return <p>Loading.....</p>;

    return(

        <div className="p-6">
            <h2 className="text-2xl font-bold">{gig.title}</h2>
            <p>{gigs.description}</p>
            <p className="mt-4 font-semibold">Company: {gigs.company}</p>
            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded">
                Apply with CV
            </button>
        </div>
    )
}