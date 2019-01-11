exports.up = function(knex, Promise) {
  return knex.schema.createTable('sentences', function (table) {
    table.increments();
    table.string('sentence');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sentences');
};

exports.config = { transaction: false };
