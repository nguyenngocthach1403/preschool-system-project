var mysql = require("mysql2");
class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          console.error("Error connecting to MYSQL", err);
          reject(err);
        } else {
          console.log("Connected to MySql database");
          resolve();
        }
      });
    });
  }

  disconnect() {
    this.connection.end((err) => {
      if (err) {
        console.error("Error disconnecting from MySQL:", err);
      } else {
        console.log("Disconnected from MySQL database");
      }
    });
  }

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (err, results) => {
        if (err) {
          console.error("Error executing MySQL query:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  }

  async select(table, columns = "*", where = "") {
    try {
      const sql = `SELECT ${columns} FROM ${table} ${where}`;
      const rows = await this.query(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async selectLimit(table, columns = "*", limit = "", offset = "") {
    try {
      const sql = `SELECT ${columns} FROM ${table} LIMIT ${limit} OFFSET ${offset}`;
      const rows = await this.query(sql);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  async insert(table, data) {
    try {
      const sql = `INSERT INTO ${table} SET ?`;
      const result = await this.query(sql, data);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }
  async update(table, data, where) {
    try {
      const sql = `UPDATE ${table} SET ? ${where ? `WHERE ${where}` : ""}`;
      const result = await this.query(sql, data);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }

  async delete(table, where) {
    try {
      const sql = `UPDATE ${table} SET status = 0 WHERE ${where}`;
      const result = await this.query(sql);
      return result.affectedRows;
    } catch (error) {
      throw error;
    }
  }
}

// module.exports = new Database({
//   host: "localhost",
//   user: "root",
//   password: "congagay08773",
//   database: "preschool_db",
// });
module.exports = new Database({
  host: "localhost",
  user: "root",
  password: "",
  database: "pre_school",
});
