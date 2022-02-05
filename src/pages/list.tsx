import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import placeHolder from '../assets/images/place_holder.jpg';
import Navbar from '../components/ui/Navbar';
import { moviesAction, searchAction } from '../redux/actions';
import styles from '../styles/pages/list.module.scss';
import apiRequest from '../utils/apiRequest';
import { shortByDate } from '../utils/commonFunc';

const List = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState<Movies[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const moviesData = useSelector(
    (state: RootStateOrAny) => state?.moviesReducer
  );
  const searchData = useSelector(
    (state: RootStateOrAny) => state?.searchReducer
  );

  useEffect(() => {
    if (searchData?.query) {
      setMovies(searchData?.movies);
    } else {
      setMovies(moviesData);
    }
  }, [moviesData, searchData.movies]);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const cancelTokenSource = cancelToken.source();

    apiRequest
      .getMovies(1, cancelTokenSource)
      .then((res) => {
        if (
          res?.data?.results[0] &&
          !res?.data?.results?.some(
            (movie: Movies) => movie?.id === moviesData[0]?.id
          )
        ) {
          const sorted = shortByDate(res?.data?.results);
          dispatch(moviesAction(sorted));
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const loadFunc = () => {
    const cancelToken = axios.CancelToken;
    const cancelTokenSource = cancelToken.source();
    if (searchData.query !== '' && movies[0]) {
      apiRequest
        .search(
          {
            page: searchData?.movies?.length / 20 + 1,
            query: searchData?.query,
          },
          cancelTokenSource
        )
        .then((res) => {
          if (res?.data?.results[0]) {
            const sorted: Movies[] = shortByDate(res?.data?.results);
            dispatch(
              searchAction({
                movies: [...searchData.movies, ...sorted],
                query: searchData.query,
              })
            );
          } else {
            setHasMore(false);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } else if (movies[0]) {
      apiRequest
        .getMovies(moviesData?.length / 20 + 1, cancelTokenSource)
        .then((res) => {
          if (res?.data?.results[0]) {
            const sorted = shortByDate(res?.data?.results);
            dispatch(moviesAction(sorted));
          } else {
            setHasMore(false);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  return (
    <div>
      <Navbar isDetails={false} />
      <Container>
        <InfiniteScroll
          pageStart={0}
          className={styles.list__infiniteScroll}
          loadMore={() => loadFunc()}
          hasMore={hasMore}
          loader={<div key={0}>Loading ...</div>}
        >
          <div className={styles.list}>
            {movies?.map((movie: Movies) => (
              <Link key={movie.id} to={`/${movie.id}`}>
                <div className={styles.list__card}>
                  <img
                    src={
                      movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                        : placeHolder
                    }
                    alt={movie?.title}
                  />
                  <div className={styles.list__details}>
                    <div className={styles.list__title}>
                      <h4>{movie?.title}</h4>
                      <p>{movie?.vote_average}</p>
                    </div>
                  </div>
                  <p>
                    {movie?.overview
                      ? `${movie?.overview?.slice(0, 45)}...`
                      : 'Upcoming...'}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default List;
