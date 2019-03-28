const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig);
const router = express.Router();


//GET - all cohorts from database
router.get('/', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) { res.status(500).json({ error: 'Could not retrieve cohorts.' });
  }
});


// GET - cohort by ID
router.get('/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).json({ error: 'Cohort not found in database.' });
    }
  } catch (error) { res.status(500).json({ error: 'Could not retrieve cohort.' });
  }
});


// POST - create new cohort in database
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: 'Name needed to add cohort.' });
    } else {
      const [id] = await db('cohorts').insert(req.body);

      const created = await db('cohorts')
        .where({ id })
        .first();
      res.status(201).json(created);
    }
  } catch (error) { res.status(500).json({ error: 'Could not create cohort.' });
  }
});


// DELETE - remove cohort by ID from database
router.delete('/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Cohort not found in database.' });
    }
  } catch (error) { res.status(500).json({ error: 'Could not delete cohort.' });
  }
});


// PUT - update cohort by ID
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: 'Name needed to update cohort.' });
    } else {
      const count = await db('cohorts')
        .where({ id: req.params.id })
        .update(req.body);
      if (count > 0) {
        const cohort = await db('cohorts')
          .where({ id: req.params.id })
          .first();
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ error: 'Cohort not found in database.' });
      }
    }
  } catch (error) { res.status(500).json({ error: 'Could not update cohort.' });
  }
});

module.exports = router;