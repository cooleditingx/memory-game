import { useState, useEffect } from "react";
import Card from "./Card.jsx";
import styles from "../styles/Game.module.css";

function Easy() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

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
        let selectedcards = [];
        let selectedid = [];
        while (selectedcards.length<3) {
          let rand = Math.floor(Math.random() * characterarr.length);
          let character = characterarr[rand];
          if (!selectedid.includes(character.id)){
            selectedcards.push(character)
            selectedid.push(character.id)
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

  if (loading || cards.length ==0) {
    return (
      <>
        <div id={styles.loading}>
        <div aria-live="assertive" role="alert" className={styles.loader}></div>
        </div>
      </>
    );
  }
  let score = 0
  let bestscore = 0
  return (
    <>
    <div className={styles.header}>
      <h1>Easy Level</h1>
      <div className={styles.scores}>
      <h3>Score:{score}</h3>
      <h3>Best Score: {bestscore}</h3>
      </div>
    </div>
      <div className={styles.cardContainer}>
        <div className={styles.cardSection}>
          {cards.map(card => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Easy;