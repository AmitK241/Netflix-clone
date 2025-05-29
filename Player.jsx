import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams } from 'react-router-dom'; // Assuming you are using react-router-dom for routing
import { useNavigate } from 'react-router-dom'; // Import useNavigate if you want to navigate back


const Player = () => {

  const {id} = useParams(); // Assuming you are using react-router-dom to get the movie ID from the URL
  const navigate = useNavigate(); // Import useNavigate if you want to navigate back
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZmNjOGEzOTY1NDExZjMzNGRmNjc0NzMzYWJhN2M0OCIsIm5iZiI6MTc0ODMyNDE0NS4yNjEsInN1YiI6IjY4MzU0ZjMxZDliMDNiYjI3MTA1NWE0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4X2vGKxIVB0ZCTlhuNU4boqp05bEF6nj196_iSH95rs'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="Back" onClick={()=>{navigate(-2)}}/>
      {apiData.key && (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;


















