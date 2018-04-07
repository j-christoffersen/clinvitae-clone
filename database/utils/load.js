require('dotenv').config();
const fs = require('fs');
const parse = require('csv-parse');

const knex = require('../knex.js');

const readStream = fs.createReadStream(process.env.DB_FILE_PATH)
  .pipe(parse({
    delimiter: '\t',
    relax_column_count: true,
    relax: true,
  }));

let headers;
let counter = 0;

readStream
  .on('data', (csvRow) => {
    readStream.pause();

    if (!headers) {
      headers = csvRow;
      readStream.resume();
    } else {
      const gene = { name: csvRow[0] };

      if (gene.name) {
        knex.insert(gene).returning('id').into('genes')
          .then(ids => ids[0])
          .catch((err) => {
            // if gene already exists in db
            if (err.code === '23505') {
              return knex('genes').where(gene)
                .then(genes => genes[0].id);
            }

            throw err;
          })
          .then((geneId) => {
            const variant = {
              geneId,
              nucleotideChanges: csvRow[1].split(',')
                .concat(csvRow[3].split(','))
                .filter(string => string),
              proteinChange: csvRow[2],
              alias: csvRow[4],
              region: csvRow[6],
              reportedClassification: csvRow[7],
              source: csvRow[9],
              lastEvaluated: csvRow[11] || null,
              lastUpdated: csvRow[10] || null,
              url: csvRow[12],
            };

            return knex('variants').insert(variant);
          })
          .then(() => {
            if (counter++ % 25 === 0) {
              console.log(`inserted ${counter} records`);
            }
            readStream.resume();
          });
      } else {
        readStream.resume();
      }
    }
  })
  .on('end', () => {
    console.log('done!');
  });

