const db = require('../config/db');

exports.fetchEquipments = async () => {
  const [rows] = await db.promise().query("SELECT * FROM equipments");
  return rows;
};

exports.createEquipment = async ({ eq_name, amount, price, status }) => {
  const insertQuery = "INSERT INTO equipments (eq_name, amount, price, status) VALUES(?, ?, ?, ?)";
  const [result] = await db.promise().query(insertQuery, [eq_name, amount, price, status]);
  return result;
};

exports.deleteEquipment = async (id) => {
  const deleteQuery = "DELETE FROM equipments WHERE id = ?";
  await db.promise().query(deleteQuery, [id])
}

exports.updateEquipment = async ({ id, eq_name, amount, price, status }) => {
  const updateQuery = `
    UPDATE equipments
    SET eq_name = ?, amount = ?, price = ?, status = ?
    WHERE id = ?
  `;
  const [result] = await db.promise().query(updateQuery, [eq_name, amount, price, status, id]);
  return result; 
};

