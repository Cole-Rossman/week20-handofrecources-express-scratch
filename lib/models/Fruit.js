const pool = require('../utils/pool');

class Fruit {
  id;
  name;
  origin;
  benefits;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.origin = row.origin;
    this.benefits = row.benefits;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM fruits');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM fruits WHERE id = $1', [id]);
    return rows[0];
  }

  static async insert({ name, origin, benefits }) {
    const { rows } = await pool.query('INSERT INTO fruits (name, origin, benefits) VALUES ($1, $2, $3) RETURNING *', [name, origin, benefits]);
    return new Fruit(rows[0]);
  }

  static async updateById(id, attrs) {
    const fruit = await Fruit.getById(id);
    if (!fruit) return null;
    const { name, origin, benefits } = { ...fruit, ...attrs };
    const { rows } = await pool.query('UPDATE fruits SET name=$2, origin=$3, benefits=$4 WHERE id=$1 RETURNING *', [id, name, origin, benefits]);
    return new Fruit(rows[0]);
  }
}

module.exports = { Fruit };
