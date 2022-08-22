
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score").unsigned();
    table.integer("critic_id");
    table
        .foreign('critic_id')
        .references('critic_id')
        .inTable('critics')
        .onDelete("cascade");
    table.timestamps(true, true);
    table.integer("movie_id");
    table
        .foreign('movie_id')
        .references('movie_id')
        .inTable('movies')
        .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews");
};