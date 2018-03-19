import pandas as pd
import numpy as np

#load movie.csv and format correctly
def load_movies():
  # import the movie.csv file and convert to a dataframe so we can use it
  movies_df = pd.read_csv('data/movies.csv', header=0, names=['movie_id', 'movie_title', 'movie_genre'])

  # create dummy variables
  movies_df = pd.concat([movies_df, movies_df.movie_genre.str.get_dummies(sep='|')], axis=1)

  #add movie year to dataframe
  movie_year = movies_df['movie_title'].str.extract('[(](\d{4})[)]')
  movies_df.insert(loc=2, column='movie_year', value=movie_year)

  return movies_df

# to calculate the dot product of two vectors
def dot_product(vector_1, vector_2):
  return sum([ i*j for i,j in zip(vector_1, vector_2)])

# calculate the dot product of a movies genres and a users genre preferences
def get_movie_score(movie_features, user_preferences):
  return dot_product(movie_features, user_preferences.values())

# main function to get list of movie recommendations using content based method
def get_movie_recommendations_from_genre(user_preferences, num_of_recommendations):
  movies_df = load_movies()
  
  # set movie_categories from the movie categories in the dataset
  movie_categories = movies_df.columns[4:] 

  # run the movie score function on each movie
  movies_df['score'] = movies_df[movie_categories].apply(get_movie_score, args=([user_preferences]), axis=1)

  top_movies_df = movies_df.sort_values(by=['score'], ascending=False)[:num_of_recommendations]
  
  return top_movies_df.sort_values(by=['movie_year'], ascending=False)