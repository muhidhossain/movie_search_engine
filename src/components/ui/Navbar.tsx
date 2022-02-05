import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchAction } from '../../redux/actions';
import styles from '../../styles/components/navbar.module.scss';
import apiRequest from '../../utils/apiRequest';
import { shortByDate } from '../../utils/commonFunc';

const Navbar = ({ isDetails }: NavbarProps) => {
  const dispatch = useDispatch();
  const searchData = useSelector(
    (state: RootStateOrAny) => state?.searchReducer
  );
  const [query, setQuery] = useState(searchData?.query);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const cancelTokenSource = cancelToken.source();

    const timeout = setTimeout(() => {
      if (query !== '') {
        apiRequest
          .search({ page: 1, query: query }, cancelTokenSource)
          .then(async (res) => {
            if (res?.data?.results[0]) {
              const sorted: Movies[] = await shortByDate(res?.data?.results);
              dispatch(
                searchAction({
                  movies: sorted,
                  query: query,
                })
              );
            }
          })
          .catch((err) => {
            console.error(err.message);
          });
      } else {
        dispatch(searchAction({ movies: [], query: '' }));
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className={styles.navbar}>
      {isDetails ? (
        <h4>Movie Details</h4>
      ) : (
        <>
          <SearchIcon className={styles.navbar__searchIcon} />
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search"
            value={query}
          />
        </>
      )}

      <Link to="/list">
        <HomeIcon />
      </Link>
    </div>
  );
};

export default Navbar;
