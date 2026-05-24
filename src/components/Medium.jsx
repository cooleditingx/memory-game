import { useState, useEffect, useRef } from "react";
import Card from "./Card.jsx";
import styles from "../styles/Game.module.css";
import Homepage from "./Homepage.jsx";
import { Navigate, useNavigate } from "react-router";

function Medium() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedcarddeck,setselectedcarddeck] = useState([]);
  const [clickedcards,setclickedcards] = useState([])
  const [gameover,setgameover] = useState(false)
  const [score,setscore] = useState(0)
  const [bestscore, setbestscore] = useState(0)
  const navigate = useNavigate()
  const dialogref = useRef(null)
  const [message,setmessage] = useState("")
  useEffect(() => {
     if (gameover && dialogref.current) {
       dialogref.current.showModal()
     }
   }, [gameover])
  useEffect(() => {
    let ifmounted = true;
    const fetchAndShuffle = async () => {
      try {
        setLoading(true)
        const data = await fetch('https://hp-api.onrender.com/api/characters')
          .then(r => r.json());
        
        let characterarr = [];
        for (let x = 0; x < data.length; x++) {
          if (data[x].image !== "") {
            characterarr.push({
              name: data[x].name,
              id: data[x].id,
              image: data[x].image
            });
          }
        }
        let selectedcarddeck = [];
        let selecteddeckid = [];
        while (selectedcarddeck.length<12) {
          let rand = Math.floor(Math.random() * characterarr.length);
          let character = characterarr[rand];
          if (!selecteddeckid.includes(character.id)){
            selectedcarddeck.push(character)
            selecteddeckid.push(character.id)
          }
        }
        setselectedcarddeck(selectedcarddeck)
        console.log(selectedcarddeck)
        let selectedcards = [];
        let selectedid = [];
        while (selectedcards.length<4) {
          let rand = Math.floor(Math.random() * selectedcarddeck.length);
          let character = selectedcarddeck[rand];
          if (!selectedid.includes(character.id)){
            selectedcards.push(character)
            selectedid.push(character.id)
          }
        }
        console.log(selectedcards)
        let shuffled = selectedcards.sort(() => Math.random() - 0.5);
        const cardsWithUniqueId = shuffled.map((card, index) => ({
          ...card,
          uniqueId: `${card.id}-${index}-${Date.now()}`
        }));
        const preloadImages = cardsWithUniqueId.map(card => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve;
            img.src = card.image;
          });
        });
        await Promise.all(preloadImages);
        if (ifmounted){
        setCards(cardsWithUniqueId);
        setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchAndShuffle();
    return ()=> {
        ifmounted = false
    }
  }, []);
    const shufflecards = ()=> {
      let selectedcards = [];
      let selectedid = [];
      while (selectedcards.length < 4) {
        let rand = Math.floor(Math.random() * selectedcarddeck.length);
        let character = selectedcarddeck[rand];
        if (!selectedid.includes(character.id)){
          selectedcards.push(character);
          selectedid.push(character.id);
        }
      }
      let shuffled = selectedcards.sort(() => Math.random() - 0.5);
      const cardsWithUniqueId = shuffled.map((card, index) => ({
        ...card,
        uniqueId: `${card.id}-${index}-${Date.now()}`
      }));

      const preloadImages = cardsWithUniqueId.map(card => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = card.image;
        });
      });
      setCards(cardsWithUniqueId);
      console.log("flipped")
  };
    const handlecardclick = (cardid)=> {
        console.log(score)
        if(score ==10){
            setgameover(true);
            setmessage("You Win!")
            toggledialog();
            resetgame();
        }
        if (clickedcards.includes(cardid)){
            setgameover(true)
            setmessage("You Lose, try again!")
            toggledialog()
            if (score > bestscore){
                setbestscore(score)
            }
            return
        }

            setclickedcards([...clickedcards,cardid])
            setscore(score + 1)
            shufflecards()  
    };
    const resetgame = ()=> {
        setgameover(false)
        setscore(0)
        setclickedcards([])
        shufflecards()
    }
  if (loading || cards.length ==0) {
    return (
      <>
        <div id={styles.loading}>
        <div aria-live="assertive" role="alert" className={styles.loader}></div>
        </div>
      </>
    );
}
  return (
    <>
    <div className={styles.header}>
      <h1>Medium Level</h1>
      <div className={styles.scores}>
      <h3>Score:{score}</h3>
      <h3>Best Score: {bestscore}</h3>
      <dialog ref={dialogref}>
        <h1>{message}</h1>
        <button onClick={()=> navigate(-1)}>Home</button>
      </dialog>
      </div>
    </div>
      <div className={styles.cardContainer}>
        <div id={styles.Medium} className={styles.cardSection}>
          {cards.map(card => (
            <Card key={card.id} card={card} oncardclick={()=> handlecardclick(card.id)} gameover={gameover}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default Medium;