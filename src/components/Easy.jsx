import { useNavigate } from "react-router"
import Card from "./Card.jsx"
import styles from "../styles/Game.module.css"
console.log(styles)
function Easy (){
    return (
        <>
            <h1>Easy Level</h1>
            <div className={styles.cardContainer}>
            <div className={styles.cardSection}>
                <Card/>
                <Card/>
                <Card/>
            </div>
            </div>
        </>
    )
}
export default Easy