import {createContext, useState, ReactNode, useEffect} from 'react';

import challenges from '../../challenges.json';

//interface para amazenar quais sao os dados que temos nos desafios
interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

//Dados do contexto de dasafios
interface ChallangesContextData {
    level: number;//nivel
    currentExperience: number;//experiencia atual
    experienceToNextLevel: number;// experiência para o próximo nível:
    challengesCompleted: number;//desafios completos
    activeChallenge: Challenge | null;//desafio ativo
    levelUp: () => void; //subir de nível
    startNewChallenge: () => void; //iniciar o Novo Desafio
    resetChallenge: () => void; //redefinir desafio
    completeChallange: () => void; //Desafio completo
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallangesContextData);

//
export function ChallengesProvider({children} : ChallengesProviderProps){
    //estado que armazena a informação do level
  const [level, setLevel] = useState(0);

  //estado que armazena a experincia do usuario
  const [currentExperience, setCurrentExperience] = useState(0);
  
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  
//estado para armazenar o desafio
 const [activeChallenge, setActiveChallenge]  = useState<Challenge | null>(null) // ajuste de tipo

 //variavel para calcular o level
 const experienceToNextLevel = Math.pow((level + 1) * 4, 2)
 
 useEffect(() => {
     Notification.requestPermission();
 }, [])

    function levelUp(){
    setLevel(level + 1);
    }
    
    function startNewChallenge(){

        //para pegar desafios aleatorios
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)

        //
        const challenge = challenges[randomChallengeIndex] as Challenge; // ajuste de tipo

        setActiveChallenge(challenge)

        if (Notification.permission === 'granted'){
            new Notification('Novo desafio', {
                body:`Valendo ${challenge.amount}xp`
            } )
        }

    }  
    
    function resetChallenge(){
        setActiveChallenge(null);
    }

    //funçao para quando completa desafio
    function completeChallange() {
        if (!activeChallenge) {
            return;
        }
        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

        return (
        //o Provider faz com que todos elemntos dentro do provider
        // tenham acesso a todos os dados armazenado no contexto
        // atraves do value enviamos um objeto
  <ChallengesContext.Provider 
  value={{
            level,
            currentExperience,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            experienceToNextLevel,
            completeChallange,
               }}>
      {children}
  </ChallengesContext.Provider>
    );
}