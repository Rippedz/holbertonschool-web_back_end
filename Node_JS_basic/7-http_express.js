const express = require('express');
const { readFile } = require('fs');

const app = express();
const port = 1245;

function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        let output = '';
        const lines = data.toString().split('\n');
        
        // Start at 1 to skip the header
        for (let i = 1; i < lines.length; i += 1) {
          if (lines[i].trim()) {  // Verify if the line is not empty
            length += 1;
            const field = lines[i].toString().split(',');
            
            if (students[field[3]]) {
              students[field[3]].push(field[0]);
            } else {
              students[field[3]] = [field[0]];
            }

            if (fields[field[3]]) {
              fields[field[3]] += 1;
            } else {
              fields[field[3]] = 1;
            }
          }
        }

        const l = length; // Total number of students
        output += `Number of students: ${l}\n`;

        for (const [key, value] of Object.entries(fields)) {
          output += `Number of students in ${key}: ${value}. `;
          output += `List: ${students[key].join(', ')}\n`;
        }

        resolve(output);
      }
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  countStudents(process.argv[2].toString())
    .then((output) => {
      res.send(`This is the list of our students\n${output}`);
    })
    .catch((err) => {
      res.status(500).send(`This is the list of our students\n${err.message}`);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
