const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function readMoviesByTheaterId(req, res) {
  const theater_id = req.params.theaterId
  const data = await service.readMoviesByTheaterId(theater_id)
  res.json({ data })
}

async function list(req, res) {
  const theaters = await service.list()
  const data = await Promise.all(
    theaters.map(async (theater) => {
      const movies = await service.readMoviesByTheaterId(theater.theater_id)
      theater.movies = movies
      return theater
    })
  )

  res.json({ data })
}

module.exports = {
  list: asyncErrorBoundary(list),
  readMoviesByTheaterId: asyncErrorBoundary(readMoviesByTheaterId),
}