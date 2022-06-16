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
}

module.exports = { Fruit };
