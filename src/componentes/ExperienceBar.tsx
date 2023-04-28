import styles from '../styles/componentes/ExperienceBar.module.css'
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
//função que retorna barra de xp da aplicação../styles/componentes/ExperienceBar.module.css
export function ExperienceBar() {


    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                {currentExperience > 0 && (
                    <span className={styles.currentExperience}
                        style={{ left: `${percentToNextLevel}%` }}>
                        {currentExperience} xp
                    </span>)}
            </div>
            <span>{experienceToNextLevel}</span>
        </header>
    );
}