import React, { useMemo } from 'react'
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher'
import { HeroCard } from './HeroCard';

export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);
    // useMemo optimises the process because avoids rendering again the view everytime there is a change, only lets changing when publishes changes.
    return (
        <div className="row">
            {
                heroes.map( hero => (
                    <HeroCard 
                        className="col-12 col-md-6 col-lg-3"
                        key={ hero.id }
                        { ...hero }
                    />
                ))
            }
        </div>
    )
}
