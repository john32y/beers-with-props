import { useEffect, useState } from "react";
import  BeerCard from "./BeerCard"

export default function BeerList() {
    const [beers, setBeers] = useState()
    const [selectedBeer, setSelectedBeer] = useState()

    const getBeers = () => {
        fetch('https://api.sampleapis.com/beers/ale')
        .then(res => res.json())
        .then(setBeers)
        .catch(alert)
        
    }

    useEffect(() => { // run once on mount
        getBeers()
    }, [])

    useEffect(() => { // triggering a side- effect when selectedBeer (state) changes
        document.title = selectedBeer || "The Beers!"
    }, [selectedBeer])

    return (
        <main>
            
        {selectedBeer && <h2> Selected: {selectedBeer}</h2>}
            <section className='beer-list'>
                {!beers
                ? <h2>Pouring...</h2>
                : beers.map((beer)=> (
                    <BeerCard
                    key={beer.id}
                    name={beer.name}
                    avgRating={beer.rating.average}
                    setSelectedBeer={setSelectedBeer}
                    image={beer.image} />
                    
                ))    
                }
            </section>
        </main>
    )
}