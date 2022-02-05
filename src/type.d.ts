interface Movies {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  runtime: number;
}

interface SearchType {
  movies: Movies[];
  query: string;
}

interface NavbarProps {
  isDetails: boolean;
}
