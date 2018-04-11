require('dotenv').config();
const fs = require('fs');
const parse = require('csv-parse');

const knex = require('../knex.js');

const arrayUnique = (array, prop) => {
  const values = {};

  array.forEach((el) => {
    values[el[prop]] = values[el[prop]] || el;
  });

  return Object.values(values);
};

knex('variants').del()
  .then(() => knex('genes').del())
  .then(() => {
    const readStream = fs.createReadStream(process.env.DB_FILE_PATH)
      .pipe(parse({
        delimiter: '\t',
        relax_column_count: true,
        relax: true,
        from: 2,
      }));

    let rows = [];
    const geneIds = {};
    let counter = 0;

    const insertIntoDB = () => {
      const newGenes = arrayUnique(rows.map(row => row.gene)
        .filter(gene => !geneIds[gene.name]), 'name');
      return knex.batchInsert('genes', newGenes, 100)
        .returning('id')
        .then((ids) => {
          newGenes.forEach((gene, i) => {
            geneIds[gene.name] = ids[i];
          });

          for (let i = 0; i < rows.length; i++) {
            rows[i].variant.geneId = geneIds[rows[i].gene.name];
          }

          return knex.batchInsert('variants', rows.map(row => row.variant));
        });
    };

    readStream
      .on('data', (csvRow) => {
        const gene = { name: csvRow[0] };

        if (gene.name) {
          const variant = {
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

          const row = { gene, variant };
          rows.push(row);

          if (rows.length % 1000 === 0) {
            readStream.pause();
            insertIntoDB()
              .then(() => {
                rows = [];
                readStream.resume();
                console.log(`Inserted ${counter += 1000} variants`);
              });
          }
        }
      })
      .on('end', () => {
        insertIntoDB();
        console.log('Done!');
        process.exit();
      });
  });
