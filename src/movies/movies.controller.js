const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movieList = await service.read(req.params.movieId);
  const movie = movieList[0];
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

async function list(req, res) {
  const isShowing = req.query.is_showing;
  const data = isShowing ? await service.listIsShowing() : await service.list();
  res.json({ data });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data: data });
}

async function readTheatersByMovieId(req, res) {
  const id = req.params.movieId;
  const theatersData = await service.readTheatersByMovieId(id);

  const now = new Date().toISOString();
  const timestamp = { created_at: now, updated_at: now };

  const data = theatersData.map((theater) => {
    return { ...theater, ...timestamp };
  });

  res.json({ data });
}

async function readReviewsByMovieId(req, res) {
  const id = req.params.movieId;
  const reviewsData = await service.readReviewsByMovieId(id);
  const critics = await service.listCritics();

  const now = new Date().toISOString();
  const timestamp = { created_at: now, updated_at: now };

  const data = reviewsData.map((review) => {
    const foundCritic = {
      critic: critics.find((critic) => critic.critic_id === review.critic_id),
    };
    return { ...review, ...timestamp, ...foundCritic };
  });

  res.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  readTheatersByMovieId: [asyncErrorBoundary(readTheatersByMovieId)],
  readReviewsByMovieId: [asyncErrorBoundary(readReviewsByMovieId)],
};