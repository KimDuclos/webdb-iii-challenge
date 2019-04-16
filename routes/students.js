const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig);
const router = express.Router();


// GET - list of students
router.get('/', async (req, res) => {
  try {
    const students = await db('students');
    res.status(200).json(students);
  } catch (error) { res.status(500).json({ errorMessage: 'Could not retrieve student from database.' });
  }
});


// GET - student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await db('students')
      .join('cohorts', 'students.cohort_id', '=', 'cohorts.id')
      .select('students.id', 'students.name', { cohort: 'cohorts.name' })
      .where({ 'students.id': req.params.id })
      .first();
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ errorMessage: 'No student with this ID exists in the database.' });
    }
  } catch (error) { res.status(500).json({ error: 'Could not retrieve student from database.' });
  }
});


// POST - create new student in database
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: 'Name is needed to add new student.' });
    } else {
      const [id] = await db('students').insert(req.body);
      const created = await db('students')
        .where({ id })
        .first();
      res.status(201).json(created);
    }
  } catch (error) { res.status(500).json({ error: 'Could not create new student.' });
  }
});


// DELETE - remove student by ID
router.delete('/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Student with that ID does not exist in database.' });
    }
  } catch (error) { res.status(500).json({ error: 'Could not delete student from database.' });
  }
});


// PUT - update student in database
router.put('/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .update(req.body);
    if (count > 0) {
      const student = await db('students')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student with that ID does not exist in database.' });
    }
  } catch (error) { res.status(500).json({ error: 'Student could not be updated.' });
  }
});

module.exports = router;