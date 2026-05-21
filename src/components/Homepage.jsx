import { Link, Navigate, useNavigate } from "react-router"
import styles from "../styles/Homepage.module.css"
console.log(styles)
function Homepage ({onSelectDifficulty}){
  const navigate = useNavigate();

  const handleDifficulty = (diff) => {
    if (onSelectDifficulty){
      onSelectDifficulty(diff);
    }
    navigate(diff === 1 ? "/Easy" : diff === 2 ? "/medium" : "/hard");
  };
  return (
    <>
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Harry Potter</h1>
        <h2 className={styles.subtitle}>Memory Game</h2>
        <div  className="buttonContainer">
          <button onClick={()=> handleDifficulty(1)}>Easy</button>
          <button onClick={()=> handleDifficulty(2)}>Medium</button>
          <button onClick={()=> handleDifficulty(3)}>Hard</button>
        </div>
      </div>
      <div className={styles.leftControls}>
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464" />
            <path d="M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615" />
            <path d="M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664" />
            <path d="M3 3l18 18" />
          </svg>
        </button>
      </div>
    </div>
    </>
  )
}

export default Homepage