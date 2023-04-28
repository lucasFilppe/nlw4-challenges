//caixa de desafio
import styles from '../styles/componentes/ChallengeBox.module.css';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContex } from '../contexts/CountdownContext';

export function ChallengeBox() {
    /*variavel que indica se temos um desafio ou não*/
     //const hasActiveChallenge = true;

     //usamos do contexto de desafios, a variavel que armazena o desafio ativo
     //usamos do contexto de desafios, a função que redefine o desafio
     //usamos do contexto de desafios, a função de desafio completo
     const {activeChallenge, resetChallenge, completeChallange} = useContext(ChallengesContext);
     
     //usamos o contexto de contagem regressiva, a função que redefine a contagem
     const {resetContdown}  = useContext(CountdownContex);
     
     //função para lidar com o desafio bem-sucedido
     function handleChallengeSucessed () {
         completeChallange();
         resetContdown();
     }

     //
     function handleChallengeFailed () {
        resetChallenge();
        resetContdown();
    }

    console.log(activeChallenge)
    return(
       <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className = {styles.challengeActive}>
                    
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}
                        >
                             Falhei
                        </button>
                        
                        <button 
                        type="button"
                        className={styles.challengeSucceededButton}
                        onChangeCapture={completeChallange}
                        onClick={handleChallengeSucessed}
                        >
                            Completei
                        </button>
                    
                    </footer>
                </div>
            ) : (

             /*elemtos de quando nao estiver ativo*/
            <div className={styles.challengeNotActive}>
            <strong>Finalize a meditação miníma de pensamentos positivos para receber um desafio</strong>
            <p>
                <b>Icone level up</b>
                <img src="icons/level-up.svg" alt="Level Up"/>
                Avance de levél completando desafios
            </p>
            </div>
            )}
       </div> 
    )
}