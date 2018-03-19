from flask import Flask
from flask import request
from flask import jsonify
import content_based
from links import get_tmdb_id

# Initialize the web server
app = Flask(__name__)

@app.route("/")
def hello():
  return "Engine API for Fliq"

# content based recommendation endpoint
@app.route("/recommendations/initial", methods=['POST'])
def initial_recommendation():
  if request.method == 'POST':

    # get the user preferences from the request body
    user_preferences = request.get_json()

    user_preferences['(no genres listed)'] = 0

    # get recommendations
    recommendations_df = content_based.get_movie_recommendations_from_genre(user_preferences, 60)

    # get a list of tmdb id's for the recommended movies
    recommendations_tmdb_ids_df = recommendations_df['movie_id'].apply(get_tmdb_id)

    # turn the dataframe to an array
    recommendations_tmdb_ids_list = recommendations_tmdb_ids_df.values.tolist()

    response = {
      'recommendations': recommendations_tmdb_ids_list
    }

    # the recommendations are sent
    return jsonify(response)

# runs the web server
app.run()