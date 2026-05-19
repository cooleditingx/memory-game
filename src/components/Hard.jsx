import Card from "./Card.jsx"
import styles from "../styles/Game.module.css"

function Hard (){
    return (
        <>
        <h1>Hard Level</h1>
        <div className={styles.cardContainer}>
        <div className={styles.cardSection}>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
        </div>
        </>
    )
}
export default Hard