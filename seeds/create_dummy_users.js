/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // await knex("users").del();
  await knex("users").insert([
    {
      first_name: "jeff",
      last_name: "salvador",
      address: "bulacan",
      post_code: "3020",
      contact_no: "09991234567",
      email: "test@gmail.com",
      username: "username",
      password: "password",
    },
  ]);
};

// exports.seed = function (knex) {
//   return knex("users")
//     .del()
//     .then(function () {
//       // Inserts seed entries
//       return knex("users").insert([
//         { username: "John Doe", email: "johndoe@example.com" },
//         { username: "Jane Doe", email: "janedoe@example.com" },
//       ]);
//     });
// };
