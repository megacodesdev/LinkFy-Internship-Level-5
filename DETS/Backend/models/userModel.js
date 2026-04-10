const db = require('../config/db');

exports.findUserByEmail = (email, callback) => {
    db.query("SELECT * FROM users WHERE email=?", [email], (err, result) => {
        if(err) return callback(err, null);
        callback(null, result[0]);
    });
};

exports.findUserByEmailOrUsername = (identifier, callback) => {
    db.query("SELECT * FROM users WHERE email=? OR username=?", 
        [identifier, identifier], 
        (err, result) => {
            if(err) return callback(err, null);
            callback(null, result[0]); // Return first match only
        }
    );
};

exports.createUser = (username, email, password, role, phone, callback) => {
    // First insert the user
    const insertQuery = "INSERT INTO users (username, email, password, role, phone) VALUES (?, ?, ?, ?, ?)";
    
    db.query(insertQuery, 
        [username, email, password, role, phone],
        (err, insertResult) => {
            if (err) {
                console.error("MySQL Insert Error:", err);
                return callback(err, null);
            }
            
            // Then fetch the complete user data
            const selectQuery = "SELECT * FROM users WHERE id = ?";
            db.query(selectQuery, 
                [insertResult.insertId], 
                (err, selectResult) => {
                    if (err) {
                        console.error("MySQL Select Error:", err);
                        return callback(err, null);
                    }
                    callback(null, selectResult[0]); // Return the full user object
                }
            );
        }
    );
};

// Add this new method for getting user by ID
exports.findUserById = (id, callback) => {
    db.query("SELECT * FROM users WHERE id=?", [id], (err, result) => {
        if(err) return callback(err, null);
        callback(null, result[0]);
    });
};