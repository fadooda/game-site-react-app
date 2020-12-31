import React, { useState, useEffect } from "react";
import friesSaltMeme from "../../Friessaltmeme.jpg"
import christianSaltMeme from "../../Christian salt meme.jpg"
import banned from "../../banned.jpg"
import './home.css'
const SaltyJeremy = () =>{
    const [name] = useState(sessionStorage.getItem('user'));
    const [seconds, setSeconds] = useState(30)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours]= useState(0)
    const [days, setDays]= useState(0)
    const [years, setYears]= useState(0)
    const [didWait, setDidWait] = useState(false)

    useEffect(() => {
        // use set timeout and be confident because updateTime will cause rerender
        // rerender mean re call this effect => then it will be similar to how setinterval works
        // but with easy to understand logic
        const token = setTimeout(updateTime, 1000)
    
        return function cleanUp() {
          clearTimeout(token);
        }
      })
    

    function updateTime() {
        if (years===0 && hours===0 && days===0 && minutes === 0 && seconds === 0) {
          //reset
          setDidWait(true)
          setSeconds(0);
          setMinutes(0);
          setDays(0)
          setYears(1000)
          setHours(0);
        }
        else {
            if(days===0 && minutes === 0 && seconds === 0){
                setYears(years=> years-1)
                setDays(364);
                setHours(23)
                setMinutes(59);
                setSeconds(59);
            }else if(hours===0 && minutes === 0 && seconds === 0){
                setDays(days => days- 1);
                setHours(23)
                setMinutes(59);
                setSeconds(59);
            }else if(minutes === 0 && seconds === 0){
                setHours(hours => hours - 1);
                setMinutes(59)
                setSeconds(59);
            }else if (seconds === 0) {
            setMinutes(minutes => minutes - 1);
            setSeconds(59);
          } else {
            setSeconds(seconds => seconds - 1);
          }
        }
      }
    if (name!=='Jeremy' && name !=='jeremy')
    {
        window.location.href="/404"
    }else{
        return (
            <div className='containerJeremy'>
                <div className='containerAboutMe'>
                    <div> 
                        {(didWait)? <h1> You are still wayyy too salty!!! You need a little Time Out!</h1> : <h1> WHOOOAAA I can taste the saltiness!</h1>}
                        {(didWait)? <h4> Reason for banning: Saltier than the ocean</h4> : <h4> Reason for banning: Too much NaCl</h4>}
                        <h4> Ban Expires In: </h4>
                        <p>
                            Years: {years}
                            Days: {days}
                            Hours: {hours}
                            Minutes: {minutes}
                            Seconds: {seconds}
                        </p>
                        {(didWait)? 
                        <strong>
                            What you can do during this <u>short</u> ban time:
                                <lu>
                                    <li>
                                        1) Re-think your life!
                                    </li>
                                    <li>
                                        2) Be the good kind of salt (ice salt or food salt)!
                                    </li>
                                    <li>
                                        3) Find love!
                                    </li>
                                </lu> 
                        </strong> :
                        <strong>
                            Your BAN is about to end!
                        </strong>}
                    </div>
                </div>
                {(didWait)? <img src={friesSaltMeme} className="App-unAuth" style={{height: '800px', width: '50%'}}/> : <img src={christianSaltMeme} className="App-unAuth" style={{height: '800px', width: '50%'}}/>}
                <img src={banned} className="App-unAuth" style={{height: '800px', width: '50%'}}/>
            </div>

        )
    }


}

export default SaltyJeremy