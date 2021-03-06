const pool = require('../utils/pool');

class Car {
  id;
  name;
  manufacturer;
  origin;
  price;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.manufacturer = row.manufacturer;
    this.origin = row.origin;
    this.price = row.price;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cars');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    return rows[0];
  }

  static async insert({ name, manufacturer, origin, price }) {
    const { rows } = await pool.query('INSERT INTO cars (name, manufacturer, origin, price) VALUES ($1, $2, $3, $4) RETURNING *', [name, manufacturer, origin, price]);
    return new Car(rows[0]);
  }

  static async updateById(id, attrs) {
    const car = await Car.getById(id);
    if (!car) return null;
    const { name, manufacturer, origin, price } = { ...car, ...attrs };
    const { rows } = await pool.query('UPDATE cars SET name=$2, manufacturer=$3, origin=$4, price=$5 WHERE id=$1 RETURNING *', [id, name, manufacturer, origin, price]);
    return new Car(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
    return new Car(rows[0]);
  }
}

module.exports = { Car };
