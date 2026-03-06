import { useState, useRef } from "react";

export default function RadioComponent() {
  const [playing, setPlaying] = useState(false);
  const [radioURL, setRadioURL] = useState("https://az1.mediacp.eu/listen/airport-lounge-radio/stream/1/");
  const player = useRef<HTMLAudioElement | null>(null); // useRef allows a component to persist 

  // TODO: read up on JS objects and try some excercises. 
  //       do some sort of validation to prevent new audio objects being created (ensure only one stream plays at once). 
  //       general cleanup 
  //       also a volume slider/control would be nice 

  // TODO: maybe at some point pull header data from the stream and display it in the player. 
  //       -> maybe some fancy scrolling text like in winamp would be cool.   
  //       going into one of these links -> inspect element -> in the network tab you can see this data being sent across with info about the stream    
  //       this would be a good opportunity to write some networking code myself.  

  const play = function () {
    console.log(`player.current: ${player.current}`); // backtick strings are a lot like fstrings in python. 
    if (player.current === null && !playing) { // this bit of code seems to work to prevent multiple streams playing at once. 
      player.current = new Audio(radioURL);
      player.current.volume = 0.15; // this is a value between 1 (100%), and 0 (0%). 
      setPlaying(true);
      player.current.play();
    }
    else {
      console.warn(`Stream already playing: ${player.current}`);
    }
  };

  const pause = function () {
    if (player.current) {
      setPlaying(false);
      player.current.pause();
      player.current = null;
    }
  };

  return (
    <>
      <div className="radiocomponentcontainer" style={{
        backgroundColor: "#393A41",
        borderRadius: "3px",
        border: "1",
        borderStyle: "solid",
        borderColor: "black",
        padding: "10px",
        maxWidth: "188px",
        margin: "0 auto"
      }}>
        <div className="fakescreen" style={{ backgroundColor: "green" }} >
          <h1 style={{ fontFamily: "Seven Segment", color: "black", userSelect: "none" }}>{playing ? 'Playing' : 'Paused'}</h1>
        </div>
        <div className="radiobuttoncontainer" style={{ display: "flex", width: "auto" }}>
          <button className="radiobutton" onClick={play}>Play</button> {/* this is a misleading name because it's not a radio button */}
          <button className="radiobutton" onClick={pause}>Pause</button><br></br>
        </div>
        <div className="stationjumper">
          <input type="text" name="urlbox" id="urlbox" defaultValue="Enter a URL..." onChange={(e) => setRadioURL(e.target.value)} />
        </div>
      </div>
    </>
  )
}