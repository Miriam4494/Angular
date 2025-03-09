module.exports = (db) => {
    return {
      create: (title, content, courseId, callback) => {
        const sql = 'INSERT INTO lessons (title, content, courseId) VALUES (?, ?, ?)';
        db.run(sql, [title, content, courseId], function(err) {
          callback(err, this.lastID);
        });
      },
      findById: (id, callback) => {
        const sql = 'SELECT * FROM lessons WHERE id = ?';
        db.get(sql, [id], callback);
      },
      findAllByCourseId: (courseId, callback) => {
        const sql = 'SELECT * FROM lessons WHERE courseId = ?';
        db.all(sql, [courseId], callback);
      },
      updateById: (id, updates, callback) => {
        const { title, content, courseId } = updates;
        const sql = 'UPDATE lessons SET title = ?, content = ?, courseId = ? WHERE id = ?';
        db.run(sql, [title, content, courseId, id], callback);
      },
      deleteById: (id, callback) => {
        const sql = 'DELETE FROM lessons WHERE id = ?';
        db.run(sql, [id], callback);
      }
    };
  };