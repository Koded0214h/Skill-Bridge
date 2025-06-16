import { useEffect, useState } from "react";
import axios from 'axios';
import GigCard from '../components/GigCard.jsx';

function GigsPage() {
    const[gigs, setGigs] = useState([]);

    useEffect(() => {
        axios.get('/api/gigs/')
        .then(res=> setGigs(res.data))
        .catch(err=> console.error(err))
    }, []);



    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Available Gigs</h2>
            <div className="grid gap-4">
                {gigs.map(gig => <GigCard key={gig.id} gig={gig} />)}
            </div>
        </div>
    )
}