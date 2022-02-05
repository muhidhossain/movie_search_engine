import { AnyAction } from 'redux';

const moviesReducer = (state: Movies[] = [], action: AnyAction) => {
  const movies = action?.movies;
  switch (action.type) {
    case 'ADD_MOVIES':
      return [...state, ...movies];

    default:
      return state;
  }
};

export default moviesReducer;
