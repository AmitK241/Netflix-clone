import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmNjOGEzOTY1NDExZjMzNGRmNjc0NzMzYWJhN2M0OCIsIm5iZiI6MTc0ODMyNDE0NS4yNjEsInN1YiI6IjY4MzU0ZjMxZDliMDNiYjI3MTA1NWE0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4X2vGKxIVB0ZCTlhuNU4boqp05bEF6nj196_iSH95rs'
    }
  };

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
        event.preventDefault();
        cards.scrollLeft += event.deltaY;
      }
    };

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || []))
      .catch(err => console.error(err));

    cards.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cards.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={
                card.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                  : 'https://via.placeholder.com/500x281?text=No+Image'
              }
              alt={card.title || 'Untitled'}
            />
            <p>{card.title || card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;





