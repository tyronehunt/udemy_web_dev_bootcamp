from flask import Blueprint, jsonify, request
from api import db
from api.models.models import Movie

main = Blueprint('main', __name__)


@main.route('/add_movie', methods=['POST'])
def add_movie():
    movie_data = request.get_json()

    # Create new movie from the submitted API post json
    new_movie = Movie(title=movie_data['title'], rating=movie_data['rating'])

    # Add data to db
    db.session.add(new_movie)
    # Commit the session
    db.session.commit()

    return 'Done', 201


@main.route('/get_movies')
def movies():

    # SQLAlchemy query object
    movie_list = Movie.query.all()

    # Extract data into array for sending
    movies = []

    for movie in movie_list:
        movies.append({'title': movie.title, 'rating': movie.rating})

    return jsonify({'movies': movies})