export const moviesAction = (movies: Movies[]) => {
  return {
    type: 'ADD_MOVIES',
    movies,
  };
};

export const searchAction = (search: SearchType) => {
  return {
    type: 'ADD_SEARCH',
    search,
  };
};
