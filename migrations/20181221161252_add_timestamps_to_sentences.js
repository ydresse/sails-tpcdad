
exports.up = function(knex, Promise) {
  return knex.schema.table("sentences", function(table) {
    table.bigInteger('createdAt')
    table.bigInteger('updatedAt')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table("sentences", function(table) {
    table.dropColumns(['createdAt', 'updatedAt']);
  })
};
