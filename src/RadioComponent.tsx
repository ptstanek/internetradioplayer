import { useState, useRef } from "react";

export default function RadioComponent() {
  const [playing, setPlaying] = useState(false);
  const [radioURL, setRadioURL] = useState("https://az1.mediacp.eu/listen/airport-lounge-radio/stream/1/");
  const [volume, setVolume] = useState(0.5); // default volume is 50%.
  const player = useRef<HTMLAudioElement | null>(null); // useRef allows a component to persist 

  // TODO: read up on JS objects and try some excercises. 
  //       do some sort of validation to prevent new audio objects being created (ensure only one stream plays at once). -- done
  //       general cleanup 
  //       also a volume slider/control would be nice -- done 

  // TODO: maybe at some point pull header data from the stream and display it in the player. 
  //       -> maybe some fancy scrolling text like in winamp would be cool.   
  //       going into one of these links -> inspect element -> in the network tab you can see this data being sent across with info about the stream    
  //       this would be a good opportunity to write some networking code myself.  

  const play = function () {
    console.log(`player.current: ${player.current}`); // backtick strings are a lot like fstrings in python. 
    if (player.current === null && !playing) { // this bit of code seems to work to prevent multiple streams playing at once. 
      player.current = new Audio(radioURL);
      player.current.volume = volume; // this is a value between 1 (100%), and 0 (0%). 
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

  const changeVolume = function (e: React.ChangeEvent<HTMLInputElement>) {
    if (player.current) {
      // horrid work. this line fixes the issue with number rounding.
      // you'd set the slider to zero but the value would actually be like 0.05 or something and you'd still hear the stream.       
      let volumeValue = Math.round(parseFloat(e.target.value))/100;
      setVolume(volumeValue);
      player.current!.volume = volumeValue;
    }
  }

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
          <h1>{playing ? 'Playing' : 'Paused'}</h1>
          <h1 className="volumetext" style={{ textAlign: "left", marginTop: "-10px", fontSize: "1em" }}>Vol: {Math.round(volume*100)}%</h1>
        </div>
        <div className="radiobuttoncontainer" style={{ display: "flex", width: "auto" }}>
          <button className="radiobutton" onClick={play}>Play</button> {/* this is a misleading name because it's not a radio button */}
          <button className="radiobutton" onClick={pause}>Pause</button><br></br>
        </div>
        <input type="range" id="slider" className="volumeslider" min="0" max="100" onChange={(e) => changeVolume(e)}></input>
        <div className="stationjumper">
          <input type="text" name="urlbox" id="urlbox" defaultValue="Enter a URL..." onChange={(e) => setRadioURL(e.target.value)} />
        </div>
      </div>
    </>
  )
}