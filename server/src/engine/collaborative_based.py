import pandas as pd
import numpy as np

# import ratings.csv and convert into a dataframe
ratings_df = pd.read_csv('data/ratings.csv', header=0, names=['user_id', 'movie_id', 'rating', 'timestamp', ])

# import the movie.csv file and convert to a dataframe so we can use it
# movies_df = pd.read_csv('data/movies.csv', header=0, names=['movie_id', 'movie_title', 'movie_genre'])

del ratings_df['timestamp']

# add movie_title to ratings dataframe for ease of reading
# ratings_df = pd.merge(ratings_df, movies_df, on='movie_id')[['user_id', 'movie_title', 'movie_id','rating']]

print(ratings_df.head())

ratings_mtx_df = ratings_df.pivot_table(values='rating', index='user_id', columns='movie_id').fillna(0)

movie_index = ratings_mtx_df.columns

print(ratings_mtx_df.head())
