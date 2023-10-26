from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
import datetime

import requests
import json

db = SQLAlchemy()

app = Flask(__name__)
cors = CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///test.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

class MovieCrud(db.Model):
    imdbkey = db.Column(db.String(20), unique=True, primary_key=True)
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    date=db.Column(db.Text)
    caption=db.Column(db.Text)
    titleType=db.Column(db.Text)
    position=db.Column(db.Integer)
    image = db.Column(db.Text)
    rating = db.Column(db.String(5))
    reviews = db.Column(db.String(10))
    watched = db.Column(db.Boolean)

with app.app_context():
    db.create_all()


@app.route('/movies/<movie_list>', methods=['GET'])
@cross_origin()
def movie_fetch(movie_list):

    url = "https://moviesdatabase.p.rapidapi.com/titles/random"

    querystring = {"list":movie_list}

    headers = {
        "X-RapidAPI-Key": "aa4fe226c4msh65c6633f9efd71fp10db06jsn9c914d0765c5",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }

    dump = requests.get(
        url, 
        headers=headers, 
        params=querystring
    ).json()['results']

    response = app.response_class(
        response=json.dumps(dump, default=str),
        status=200,
        mimetype='application/json'
    )

    return response

@app.route('/more_info/<movie_id>', methods=['GET'])
@cross_origin()
def more_info_fetch(movie_id):

    info_url = f"https://moviesdatabase.p.rapidapi.com/titles/{movie_id}"

    info_querystring = {"info":"base_info"}

    info_headers = {
        "X-RapidAPI-Key": "aa4fe226c4msh65c6633f9efd71fp10db06jsn9c914d0765c5",
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
    }

    dump = requests.get(
        url=info_url, 
        headers=info_headers, 
        params=info_querystring
    ).json()['results']

    response = app.response_class(
        response=json.dumps(dump, default=str),
        status=200,
        mimetype='application/json'
    )

    return response

@app.route('/ToWatch/add', methods=['POST'])
@cross_origin()
def add_movie():
    try:
        data = request.get_json()
        imdbkey = data.get('imdbkey')

        # Check if a movie with the same IMDb key already exists
        existing_movie = MovieCrud.query.filter_by(imdbkey=imdbkey).first()

        if existing_movie:
            # Movie with the same IMDb key already exists
            return jsonify({"message": "Movie with IMDb key already exists in the database"})
        else:
            # Movie with the IMDb key doesn't exist, so add it to the database
            movieAdd = MovieCrud(
                imdbkey=imdbkey,
                title=data.get('title'),
                description=data.get('description'),
                date=data.get('date'),
                caption=data.get('caption'),
                titleType=data.get('titleType'),
                position=data.get('position'),
                image=data.get('image'),
                rating=data.get('rating'),
                reviews=data.get('reviews'),
                watched=False
            )
            db.session.add(movieAdd)
            db.session.commit()
            return jsonify({"message": "Movie added to the database"})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/ToWatch/Read', methods=['GET'])
@cross_origin()
def read_movies():
    crud_list = MovieCrud.query.all()

    movies_list = [{'imdbkey': movie.imdbkey, 'title': movie.title, 'description': movie.description, 'date': movie.date,
                    'image_link': movie.image, 'caption': movie.caption, 'titleType': movie.titleType, 'position':movie.position,
                    'rating': movie.rating, 'vote_count': movie.reviews, 'watched': movie.watched} for movie in crud_list]

    return jsonify(movies_list)

@app.route('/ToWatch/<string:imdbkey>/Update/Watched', methods=['GET', 'POST'])
@cross_origin()
def update_movie_watched(imdbkey):
    watched_movie = MovieCrud.query.filter_by(imdbkey=imdbkey).first()

    watched_movie.watched = True
    db.session.commit()
    return jsonify({"message": "Movie updated to 'watched' status"})

@app.route('/ToWatch/<string:imdbkey>/update_to_unwatched', methods=['GET', 'POST'])
@cross_origin()
def update_movie_unwatched(imdbkey):
    unwatched_movie = MovieCrud.query.filter_by(imdbkey=imdbkey).first()

    unwatched_movie.watched = False
    db.session.commit()
    return jsonify({"message": "Movie updated to 'unwatched' status"})

@app.route("/ToWatch/<string:imdbkey>/Delete", methods=["GET", "POST"])
@cross_origin()
def delete_movie(imdbkey):
    toBeDeleted = MovieCrud.query.filter_by(imdbkey=imdbkey).first()

    if toBeDeleted is not None:
        if request.method == "POST":
            db.session.delete(toBeDeleted)
            db.session.commit()
            # return redirect(url_for("user_list"))
            return jsonify({"message": "Movie deleted successfully"})



if __name__ == "__main__":
    app.run(debug=True)