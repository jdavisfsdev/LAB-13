import pool from '../utils/pool.js';
import jwt from 'jsonwebtoken';

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
            JOIN users ON users.id = posts.user_id
            RETURNING *`,
        [userId, photoUrl, caption, tags]
      );
      return new Post(rows[0]);
    }
}
