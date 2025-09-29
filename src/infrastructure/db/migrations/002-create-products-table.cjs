exports.up = (pgm) => {
  pgm.createTable("products", {
    id: { type: "serial", primaryKey: true },
    name: { type: "varchar(255)", notNull: true },
    description: { type: "text", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("products");
};
