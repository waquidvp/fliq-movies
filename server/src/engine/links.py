import pandas as pd

def load_links():
  # import the links.csv file and convert to a dataframe so the corresponding tmdb id can be aquired with movie id
  return pd.read_csv('data/links.csv', header=0, names=['movie_id', 'imdb_id', 'tmdb_id'])

def get_tmdb_id(movie_id):
  links_df = load_links()

  tmdb_id = links_df[links_df.movie_id == movie_id]['tmdb_id']

  return int(tmdb_id)

def get_movie_id(tmdb_id):
  links_df = load_links()

  movie_id = links_df[links_df.tmdb_id == tmdb_id][movie_id]

  return int(movie_id)
