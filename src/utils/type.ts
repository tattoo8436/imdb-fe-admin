export interface IAccountLogin {
  username: string;
  password: string;
}

export interface IOption {
  label: any;
  value: any;
}

export interface IAccountRegister {
  username: string;
  password: string;
  email: string;
}

export interface IAccount {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface ISearchActor {
  page: number;
  limit: number;
  name?: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IActor {
  id?: number | null;
  image: any[];
  name: string;
  description: string;
  dob: any;
}

export interface ISearchDirector {
  page: number;
  limit: number;
  name?: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IDirector {
  id?: number | null;
  image: any[];
  name: string;
  description: string;
  dob: any;
}

export interface ISearchGenre {
  page: number;
  limit: number;
  name?: string;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IGenre {
  id: number | null;
  name: string;
}

export interface ISearchMovie {
  page: number;
  limit: number;
  name?: string;
  type?: number | null;
  genreId?: number | null;
  score?: number | null;
  numberVote?: number | null;
  releaseDate?: number | string | null;
  language?: string | null;
  sortBy?: string | null;
  orderBy?: string | null;
}

export interface IActorInMovie {
  id: number | null;
  nameInMovie: string;
}
export interface IMovie {
  id: number | null;
  name: string;
  description: string;
  image: any;
  trailer: string;
  releaseDate: any;
  duration: string;
  type: number | null;
  ended: boolean;
  numberSeason: string;
  numberVote: number;
  score: number;
  language: string;
  listGenres?: Array<IGenre>;
  genreIds?: Array<number>;
  movieGenres?: Array<any>;
  listActors?: Array<IActorInMovie>;
  actorIds?: Array<number>;
  movieActors?: Array<any>;
  director?: IDirector;
  directorId?: number | null;
  directorIds?: Array<number>;
  movieDirectors?: Array<any>;
  listEpisode?: Array<any>;
  numberLastVote?: number;
}

export interface IEpisode {
  id: number | null;
  ep: number;
  season: number;
  name: string;
  description: string;
  image: Array<any>;
  releaseDate: any;
  duration: string;
  numberVote: number;
  score: number;
  listMovieActorIds?: number[];
  listMovieActorEpisodes?: any[];
}

export interface IMovieStatistic {
  id: number;
  name: string;
  listNumberVotes: number[] | null;
}

export interface IDataSync {
  loading: boolean;
  data: any;
  error: any;
}
