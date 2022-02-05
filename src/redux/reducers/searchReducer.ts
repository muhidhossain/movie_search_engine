import { AnyAction } from 'redux';

const searchReducer = (
  state: SearchType = { movies: [], query: '' },
  action: AnyAction
) => {
  const search = action?.search;
  switch (action.type) {
    case 'ADD_SEARCH':
      return {
        movies: search.movies,
        query: search.query,
      };
    default:
      return state;
  }
};

export default searchReducer;
