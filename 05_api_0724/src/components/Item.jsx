import React from 'react'
const Item = ({ id, height, pokemonName, weight, front, back, shiny, shinyBack }) => {
    return (
        <div className='pokemonItem'>
            <div>図鑑番号:{id}</div>
            <div>ポケモン:{pokemonName}</div>
            <div>身長:{height}</div>
            <div>体重:{weight}</div>
            <img src={front} alt={pokemonName} />
            <img src={back} alt={pokemonName} />
            <img src={shiny} alt={pokemonName} />
            <img src={shinyBack} alt={pokemonName} />
        </div>
    );
};
export default Item;