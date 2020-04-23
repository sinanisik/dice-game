import React from 'react'
import Player from '../Player';
import './DiceApp.style.css';

class DiceApp extends React.Component {
    constructor(props) {
        super(props);
        this.round = 5;
        this.general = 2;

        this.state = {
            players: [
                {
                    id: 0,
                    dice: 1,
                    currentScore: 0,
                    activePlayer: true,
                    totalScore: 0
                },
                {
                    id: 1,
                    dice: 1,
                    currentScore: 0,
                    activePlayer: false,
                    totalScore: 0
                }
            ],
            scores: [0, 0]
        }
    }

    init = () => {
        this.setState({
            players: this.state.players.map(el => {
                return { ...el, currentScore: 0 }
            })
        })
    }

    nextPlayer = () => {
        this.setState({
            players: this.state.players.map(el => {
                return { ...el, activePlayer: el.activePlayer === false ? el.activePlayer = true : el.activePlayer = false }
            })
        })
    }

    comparePlayers = () => {

        this.setState({
            players: this.state.players.map(el => {
                let max = el.currentScore;
                if (el.currentScore > max) {
                    return { ...el, totalScore: el.totalScore + 1 }
                }
                return el;
            })
        })
    }

    updateTotal = () => {
        console.log(this.state.scores);
        let max = Math.max(...this.state.scores);

        this.setState({
            players: this.state.players.map(el => {
                if (el.currentScore === max) {
                    return { ...el, totalScore: el.totalScore + 1 }
                }
                return el;
            })
        }, this.init)
    }

    rollDice = (id) => {

        const rand = Math.floor(Math.random() * 6 + 1);
        let whichPlayer = this.state.players.find(el => {
            return el.id === id;
        })

        if (this.round > 0) {
            this.setState({
                players: this.state.players.map(el => {
                    if (el === whichPlayer) return { ...el, dice: rand, currentScore: el.currentScore + rand }
                    return el;
                })
            })
            this.round--;
        } else {
            this.general -= 1;
            if (this.general === 0) { // for every 2 round general will be set 0
                this.setState({
                    scores: this.state.players.map(el => {
                        return el.currentScore
                    })
                }, this.updateTotal);
            }

            this.nextPlayer();
            this.round = 5;
            if (this.general === 0) this.general = 2;

        }
    }

    render() {
        return (
            <div className="wrapper">
                {
                    this.state.players.map((el, i) => {
                        return <Player
                            key={el.id}
                            generalRound={this.general}
                            activePlayer={this.state.players[i].activePlayer}
                            round={this.round}
                            currentScore={this.state.players[i].currentScore}
                            totalScore={this.state.players[i].totalScore}
                            id={this.state.players[i].id}
                            rollDice={this.rollDice}
                            diceValue={this.state.players[i].dice} />
                    })
                }
            </div>
        );
    }
}

export default DiceApp;