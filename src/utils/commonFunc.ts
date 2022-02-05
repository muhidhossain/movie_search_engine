export const shortByDate = (arrayOfMovies: Movies[]) => {
  const sort = arrayOfMovies?.sort((a: Movies, b: Movies) => {
    return (
      new Date(b?.release_date)?.getTime() -
      new Date(a?.release_date)?.getTime()
    );
  });

  return sort;
};
