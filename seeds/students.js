exports.seed = function(knex, Promise) {
    // DELETE ALL
    return knex('students')
      .del()
      .then(function() {
        // INSERT SEEDS
        return knex('students').insert([
          { name: 'John S', cohort_id: 1 },
          { name: 'Jane D', cohort_id: 2 },
          { name: 'Kim D', cohort_id: 3 },
          { name: 'Sean D', cohort_id: 4}
        ]);
      });
  };