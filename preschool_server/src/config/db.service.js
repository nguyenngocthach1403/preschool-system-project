const dbPool = require("../config/dbPool");

module.exports = { select, selectLimit, insert, deleteRow, update };

async function select(table, columns = "*", where = "") {
  try {
    const sql = `SELECT ${columns} FROM ${table} ${where}`;
    const [rows, fields] = await dbPool.query(sql);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function selectLimit(
  table,
  columns = "*",
  where = "",
  limit = "",
  offset = ""
) {
  try {
    const sql = `SELECT ${columns} FROM ${table} ${where} ${limit} ${offset}`;
    const [rows, fields] = await dbPool.query(sql);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function insert(table, data) {
  try {
    const sql = `INSERT INTO ${table} SET ?`;
    const [result] = await dbPool.query(sql, data);
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
}

async function deleteRow(table, where) {
  try {
    const sql = `DELETE FROM ${table} ${where}`;

    const result = await dbPool.query(sql);

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
}

async function update(table, updates, where) {
  try {
    const setClause = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");

    const whereClause =
      where && Object.keys(where).length > 0
        ? `WHERE ${Object.keys(where)
            .map((key) => `${key} = ?`)
            .join(" AND ")}`
        : "";

    const sql = `UPDATE ${table} SET ${setClause} ${whereClause}`;

    const values = [
      ...Object.values(updates),
      ...(where ? Object.values(where) : []),
    ];

    const [result] = await dbPool.query(sql, values);

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
}
