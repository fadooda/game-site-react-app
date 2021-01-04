import React from 'react'
import * as ReactBoostrap from "react-bootstrap";
import TicTacToeGame from "../../TictacToeGame.png"
import BattleshipGame from "../../battleship.jpg"
// import { Text, ImageBackground } from "react-native";
//import '../../App.css'
import TrivaGame from "../../TrivaGame.png"
import './home.css'
const Home = () =>{
return (
    <div className='homeContainer'>
        <div>
            <h1>w</h1>
        </div>
        <div>
            <ReactBoostrap.Carousel>
            <ReactBoostrap.Carousel.Item interval={1000}>
                <img
                className="carouselImg"
                src={TicTacToeGame}
                alt="First slide"
                />
                <ReactBoostrap.Carousel.Caption className='imgTextLabel'>            
                <h3 style={{color: 'red'}}>First Released Game</h3>
                <p style={{color: 'orange'}}>Grab a friend and challenge them to a game of a Tictactoe!</p>
                </ReactBoostrap.Carousel.Caption>
            </ReactBoostrap.Carousel.Item>
            <ReactBoostrap.Carousel.Item interval={500}>
                <img
                className="carouselImg"
                src={TrivaGame}
                alt="second slide"
                />
                <ReactBoostrap.Carousel.Caption className='imgTextLabel'>
                <h3 style={{color: 'red'}}>Second Game Title Release </h3>
                <p style={{color: 'orange'}}>In colaboration with Rhys Hall, Triva Game IN PROGRESS </p>
                </ReactBoostrap.Carousel.Caption>
            </ReactBoostrap.Carousel.Item>
            <ReactBoostrap.Carousel.Item>
                <img
                className="carouselImg"
                src={BattleshipGame}
                alt="Third slide"
                />
                <ReactBoostrap.Carousel.Caption className='imgTextLabel'>
                    <h3 style={{color: 'red'}}>Third Game Title Release </h3>
                    <p style={{color: 'orange'}}>In colaboration with Rhys Hall, Battleship Game IN PROGRESS </p>
                </ReactBoostrap.Carousel.Caption>
            </ReactBoostrap.Carousel.Item>
            </ReactBoostrap.Carousel>
        </div>

    </div>
)

}

export default Home