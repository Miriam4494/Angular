module.exports = (db) => {
    return {
      create: (title, description, teacherId, callback) => {
        const sql = 'INSERT INTO courses (title, description, teacherId) VALUES (?, ?, ?)';
        db.run(sql, [title, description, teacherId], function(err) {
          callback(err, this.lastID);
        });
      },
      findById: (id, callback) => {
        const sql = 'SELECT * FROM courses WHERE id = ?';
        db.get(sql, [id], callback);
      },
      findAll: (callback) => {
        const sql = 'SELECT * FROM courses';
        db.all(sql, callback);
      },
      updateById: (id, updates, callback) => {
        const { title, description, teacherId } = updates;
        const sql = 'UPDATE courses SET title = ?, description = ?, teacherId = ? WHERE id = ?';
        db.run(sql, [title, description, teacherId, id], callback);
      },
      deleteById: (id, callback) => {
        const sql = 'DELETE FROM courses WHERE id = ?';
        db.run(sql, [id], callback);
      }
    };
  };