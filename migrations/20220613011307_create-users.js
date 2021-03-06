/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.string("first_name", 30);
    table.string("last_name", 30);
    table.string("address", 50);
    table.string("post_code", 20);
    table.string("contact_no");
    table.string("email");
    table.string("username");
    table.string("password");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
