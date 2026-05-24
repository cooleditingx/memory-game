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
    </div>
    </>
  )
}

export default Homepage