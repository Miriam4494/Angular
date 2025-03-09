module.exports = (db) => {
    return {
      create: (name, email, password, role, callback) => {
        const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
        db.run(sql, [name, email, password, role], function(err) {
          callback(err, this.lastID);
        });
      },
      findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        db.get(sql, [email], callback);
      },
      findById: (id, callback) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.get(sql, [id], callback);
      },
      findAll: (callback) => {
        const sql = 'SELECT * FROM users';
        db.all(sql, callback);
      },
      updateById: (id, updates, callback) => {
        const { name, email, password, role } = updates;
        const sql = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
        db.run(sql, [name, email, password, role, id], callback);
      },
      deleteById: (id, callback) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.run(sql, [id], callback);
      }
    };
  };