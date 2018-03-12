from flask import Flask
from flask import request
from flask import jsonify
import content_based
from links import get_tmdb_id

app = Flask(__name__)

@app.route("/")
def hello():
  return "Engine API for Fliq"

@app.route("/recommendations/initial", methods=['POST'])
def initial_recommendation():
  if request.method == 'POST':
    user_preferences = request.get_json()

    recommendations_df = content_based.get_movie_recommendations_from_genre(user_preferences, 60)

    recommendations_tmdb_ids_df = recommendations_df['movie_id'].apply(get_tmdb_id)

    recommendations_tmdb_ids_list = recommendations_tmdb_ids_df.values.tolist()

    response = {
      'recommendations': recommendations_tmdb_ids_list
    }

    return jsonify(response)


app.run()