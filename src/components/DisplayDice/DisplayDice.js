import React from 'react'
import './DisplayDice.style.css';

const DisplayDice = props => {
    return (
        <div>
            <img src={`/assets/dice-${props.dice}.png`} alt={`dice-${props.dice}`} />
        </div>
    );
}

export default DisplayDice;