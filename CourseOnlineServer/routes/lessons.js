module.exports = (db) => {
const express = require('express');
const { checkAuth, checkTeacher } = require('../middlewares/auth')(db);
const Lesson = require('../models/Lesson');

  const router = express.Router({ mergeParams: true });
  const lessonModel = Lesson(db);

  // Get all lessons in a course
  router.get('/', checkAuth, async (req, res) => {
    const { courseId } = req.params;
    lessonModel.findAllByCourseId(courseId, (err, lessons) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching lessons' });
      }
      res.status(200).json(lessons);
    });
  });

  // Get lesson by ID
  router.get('/:id', checkAuth, async (req, res) => {
    const { courseId, id } = req.params;
    lessonModel.findById(id, (err, lesson) => {
      if (err || !lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.status(200).json(lesson);
    });
  });

  // Create new lesson (Teacher only)
  router.post('/', checkAuth, checkTeacher, async (req, res) => {
    const { courseId } = req.params;
    const { title, content } = req.body;
    lessonModel.create(title, content, courseId, (err, lessonId) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating lesson' });
      }
      res.status(201).json({ message: 'Lesson created successfully', lessonId });
    });
  });

  // Update lesson by ID (Teacher only)
  router.put('/:id', checkAuth, checkTeacher, async (req, res) => {
    const { courseId, id } = req.params;
    const updates = req.body;
    lessonModel.updateById(id, updates, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error updating lesson' });
      }
      res.status(200).json({ message: 'Lesson updated successfully' });
    });
  });

  // Delete lesson by ID (Teacher only)
  router.delete('/:id', checkAuth, checkTeacher, async (req, res) => {
    const { courseId, id } = req.params;
    lessonModel.deleteById(id, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting lesson' });
      }
      res.status(200).json({ message: 'Lesson deleted successfully' });
    });
  });

  return router;
};