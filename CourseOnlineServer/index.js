const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const lessonRoutes = require('./routes/lessons');

const app = express();
const db = new sqlite3.Database('./database.sqlite');

// Middleware
app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Initialize database schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student'
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      teacherId INTEGER NOT NULL,
      FOREIGN KEY (teacherId) REFERENCES users(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating courses table:', err);
    } else {
      console.log('Courses table created or already exists.');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      courseId INTEGER NOT NULL,
      FOREIGN KEY (courseId) REFERENCES courses(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating lessons table:', err);
    } else {
      console.log('Lessons table created or already exists.');
    }
  });

  db.run(`
    CREATE TABLE IF NOT EXISTS student_courses (
      userId INTEGER NOT NULL,
      courseId INTEGER NOT NULL,
      PRIMARY KEY (userId, courseId),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (courseId) REFERENCES courses(id)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating student_courses table:', err);
    } else {
      console.log('Student_courses table created or already exists.');
    }
  });
});

// Routes
app.use('/api/auth', authRoutes(db));
app.use('/api/users', userRoutes(db));
app.use('/api/courses', courseRoutes(db));
app.use('/api/courses/:courseId/lessons', lessonRoutes(db));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});