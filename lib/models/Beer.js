const pool = require('../utils/pool');

class Beer {
  id;
  type;
  color;
  abv;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.color = row.color;
    this.abv = row.abv;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM beers');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM beers WHERE id = $1', [id]);
    return rows[0];
  }

  static async insert({ type, color, abv }) {
    const { rows } = await pool.query('INSERT INTO beers (type, color, abv) VALUES ($1, $2, $3) RETURNING *', [type, color, abv]);
    return new Beer(rows[0]);
  }

  static async updateById(id, attrs) {
    const beer = await Beer.getById(id);
    if (!beer) return null;
    const { type, color, abv } = { ...beer, ...attrs };
    const { rows } = await pool.query('UPDATE beers SET type=$2, color=$3, abv=$4 WHERE id=$1 RETURNING *', [id, type, color, abv]);
    return new Beer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM beers WHERE id = $1 RETURNING *', [id]);
    return new Beer(rows[0]);
  }
}

module.exports = { Beer };
