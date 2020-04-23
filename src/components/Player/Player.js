import React from 'react'
import { DisplayDice } from '../../components'
import './Player.style.css';
import classnames from 'classnames';


const Player = (props) => {

    return (
        <div className={`player-${props.id}-panel`}>
            <h3>Player {props.id + 1}</h3>
            <p>Total Score: {props.totalScore}</p>
            <p>Current Score: {props.general !== 0 ? props.currentScore : 0}</p>
            <p>Remaining Round: {props.activePlayer ? props.round : 0}</p>
            <DisplayDice dice={(!props.activePlayer || props.round === 5) ? 0 : props.diceValue} />
            <button
                className={classnames({
                    "button": true,
                    "btn": true,
                    "disabled": !props.activePlayer
                })}
                onClick={() => props.rollDice(props.id)}>{props.round === 0 && props.activePlayer ? "Next Player!" : "Roll Dice!"}</button>
        </div>
    );

}

export default Player;