const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
})

function read(id) {
  return knex("reviews").select("*").where({ review_id: id })
}

function readAndAppend(id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ review_id: id })
    .first()
    .then(addCritic)
}

function update(updatedReview, id) {
  return knex("reviews")
    .select("*")
    .where({ review_id: id })
    .update(updatedReview)
}

function destroy(id) {
  return knex("reviews").where({ review_id: id }).del()
}

module.exports = {
  read,
  readAndAppend,
  update,
  delete: destroy,
}