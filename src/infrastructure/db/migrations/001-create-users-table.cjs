exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "serial", primaryKey: true },
    email: { type: "varchar(255)", notNull: true },
    name: { type: "varchar(255)", notNull: true },
    password: { type: "text", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users");
};
