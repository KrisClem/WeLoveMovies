const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addMovies = mapProperties({
  movie_id: "movies.movie_id",
  title: "movies.title",
  runtime_in_minutes: "movies.runtime_in_minutes",
  rating: "movies.rating",
  description: "movies.description",
  image_url: "movies.image_url",
  is_showing: "movies.is_showing",
})

function readMoviesByTheaterId(theater_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .distinct("m.*")
    .where({ "mt.theater_id": theater_id })
}

function list() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .distinct("t.*")
}

module.exports = {
  readMoviesByTheaterId,
  list,
}