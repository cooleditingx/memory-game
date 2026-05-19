import Card from "./Card.jsx"
import styles from "../styles/Game.module.css"
function Medium (){
    return (
        <>
        <h1>Medium Level</h1>
        <div className={styles.cardSection}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </>
    )
}
export default Medium