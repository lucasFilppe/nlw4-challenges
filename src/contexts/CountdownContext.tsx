import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { ChallengesContext } from "./ChallengesContext";

//Dados do contexto de contagem regressiva
interface CountdownContexData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;//terminou
    isactive: boolean;//está ativo
    startCountdown:() => void;//iniciar contagem regressiva
    resetContdown:() => void;//redefinir contagem
}

interface CountdownProviderProps{
    children: ReactNode;
}


export const CountdownContex = createContext({} as CountdownContexData)

//formato do countdown
//Tempo limite de contagem regressiva
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider ( {children}: CountdownProviderProps ) {
    const {startNewChallenge} = useContext(ChallengesContext);

    //criando estado
    const [time, setTime] = useState(1 * 60);

    //estado que armazena se o o countdown esta ativo ou parado
    const [isactive, setIsActive] = useState(false);

    //estado para quando estiver finalizado o contdown
    const [hasFinished, setHasFinished]  = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    //começar contagem regressiva
    function startCountdown(){
        setIsActive(true);
    }

    //redefinir contagem
    function resetContdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(1 * 60);
        setHasFinished(false);
    }

    
    useEffect(()=> 
    {
        if(isactive && time > 0) {
            countdownTimeout = setTimeout(() => {
             setTime(time - 1); 
        }, 1000)
    
        }
        //se o cpntdown estiver ativo e time for igual a 0 
        else if (isactive && time == 0 )
        {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isactive, time])

    return (
        <CountdownContex.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isactive,
            startCountdown,
            resetContdown,

        }}>
            {children}
        </CountdownContex.Provider>
    )
}