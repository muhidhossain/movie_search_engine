import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeHolder from '../assets/images/place_holder.jpg';
import Navbar from '../components/ui/Navbar';
import styles from '../styles/pages/details.module.scss';
import apiRequest from '../utils/apiRequest';

const Details = () => {
  const { details } = useParams();
  const [movie, setMovie] = useState<Movies>();
  const id = parseInt(`${details}`);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const cancelTokenSource = cancelToken.source();

    apiRequest
      .getMovieDetails(id, cancelTokenSource)
      .then((res) => {
        setMovie(res?.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <div className={styles.details}>
      <Navbar isDetails={true} />
      <Container>
        {movie && (
          <div className={styles.details__details}>
            <img
              src={
                movie?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                  : placeHolder
              }
              alt={movie?.title}
            />
            <div className={styles.details__text}>
              <h4 className={styles.details__title}>
                {movie?.title}
                <span> {movie && `(${movie?.vote_average})`}</span>
              </h4>
              <p className={styles.details__info}>
                {movie &&
                  `${new Date(
                    movie.release_date
                  )?.getFullYear()} | ${Math.floor(movie?.runtime / 60)}:${
                    movie?.runtime % 60
                  }m | Director`}
              </p>
              <p className={styles.details__cast}>
                Cast: Actor 1, Actor 2, ...
              </p>
              <p className={styles.details__description}>
                Description:{' '}
                {movie?.overview ? `${movie?.overview}` : 'Upcoming'}
              </p>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Details;
