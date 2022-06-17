const pool = require('../utils/pool');

class Fish {
  id;
  name;
  origin;
  lifespan;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.origin = row.origin;
    this.lifespan = row.lifespan;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM fish');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM fish WHERE id = $1', [id]);
    return rows[0];
  }

  static async insert({ name, origin, lifespan }) {
    const { rows } = await pool.query('INSERT INTO fish (name, origin, lifespan) VALUES ($1, $2, $3) RETURNING *', [name, origin, lifespan]);
    return new Fish(rows[0]);
  }

//   static async updateById(id, attrs) {
//     const car = await Car.getById(id);
//     if (!car) return null;
//     const { name, manufacturer, origin, price } = { ...car, ...attrs };
//     const { rows } = await pool.query('UPDATE cars SET name=$2, manufacturer=$3, origin=$4, price=$5 WHERE id=$1 RETURNING *', [id, name, manufacturer, origin, price]);
//     return new Car(rows[0]);
//   }

//   static async delete(id) {
//     const { rows } = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
//     return new Car(rows[0]);
//   }
}

module.exports = { Fish };
