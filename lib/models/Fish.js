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

  static async updateById(id, attrs) {
    const fish = await Fish.getById(id);
    if (!fish) return null;
    const { name, origin, lifespan } = { ...fish, ...attrs };
    const { rows } = await pool.query('UPDATE fish SET name=$2, origin=$3, lifespan=$4 WHERE id=$1 RETURNING *', [id, name, origin, lifespan]);
    return new Fish(rows[0]);
  }

//   static async delete(id) {
//     const { rows } = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id]);
//     return new Car(rows[0]);
//   }
}

module.exports = { Fish };
