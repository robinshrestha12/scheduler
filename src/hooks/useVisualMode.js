import { useState } from "react";

export default function useVisualMode(initial) {
  //useState
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 
 
  //transition function
    function transition(modeState, replace = false){
      if(replace) {
        setHistory(prev => prev.slice(0, -1));
        setHistory(prev => [...prev, modeState]);
      } else {
        setHistory(prev => [...prev, modeState]);
      }
      

      setMode(modeState);
    }
    //back function
    function back(){
      if(history.length > 1) {
        setHistory(history.slice(0 , -1));
        setMode(history[history.length-2]);
      }
    }
      
  return { mode, transition, back };
}