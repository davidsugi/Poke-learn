import { ChangeEvent, useRef, useState } from "react";
import useStore from "../services/store";
import { getAsciiVal } from "../utils";

export const useInput = () =>{
      const [pokemonId, setPokemonId] = useState(0); // Initial Pokemon ID
      const [text,setText]=useState("");
        const timer = useRef<NodeJS.Timeout | null>(null)
        const setName = useStore((state) => state.setName);

      const onInputchange = (e:ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
        
        if (timer.current) {
          clearTimeout(timer.current); // Clear the previous timeout if there's one
        }
    
        timer.current = setTimeout(() => {
          setName(e.target.value)
          setPokemonId(getAsciiVal(e.target.value));
          // Update the state after a short delay (throttling)
        }, 1000); // 500ms delay between user inputs
      }

    return {pokemonId, text, onInputchange}


}