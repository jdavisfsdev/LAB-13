import pool from '../utils/pool.js';

export default class Post  {
    id;
    userId;
    photoUrl;
    caption;
    tags;

    constructor(row) {
      this.id = row.id;
      this.userId = row.user_id;
      this.photoUrl = row.photo_url;
      this.caption = row.caption;
      this.tags = row.tags;

    }

    static async insert({ userId, photoUrl, caption, tags }) {
      const { rows } = await pool.query(
        `INSERT INTO posts (user_id, photo_url, caption, tags)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
        [userId, photoUrl, caption, tags]
      );
      return new Post(rows[0]);
    }

    static async findAllPosts() {
      const { rows } = await pool.query(
        'SELECT * FROM posts'
      );
      return rows.map(post => new Post(post));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT *
       FROM posts
       WHERE id = $1`,
        [id]
      );
      return new Post(rows[0]);
    }
    
    static async updateItem(id, userId, { caption }) {
      const { rows } = await pool.query(
        `UPDATE posts
            SET caption = $1
            WHERE id = $2  AND user_id = $3
            RETURNING *`,
        [caption, id, userId]
      );
      return new Post(rows[0]);
    }

    static async deleteItem(id) {
      const { rows } = await pool.query(
        `DELETE FROM posts
            WHERE id = $1
            RETURNING *`,
        [id]
      );
      return new Post(rows[0]);
    }
}
