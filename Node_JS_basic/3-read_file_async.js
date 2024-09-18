const { readFile } = require('fs'); // Import the 'readFile' function from the 'fs' module

function countStudents(fileName) {
  const students = {}; // Initialize an object to store students by their fields
  const fields = {}; // Initialize an object to store the count of students by field
  let length = 0; // Initialize a counter for the total number of lines

  // Return a Promise to handle asynchronous file reading
  return new Promise((resolve, reject) => {
    // Read the file asynchronously
    readFile(fileName, (error, data) => {
      if (error) {
        // If there's an error reading the file, reject the Promise with an error message
        reject(Error('Cannot load the database'));
      } else {
        // If the file is read successfully, process its content
        const lines = data.toString().split('\n'); // Split the file content into lines
        for (let i = 0; i < lines.length; i += 1) {
          // Iterate over each line
          if (lines[i]) {
            // Check if the line is not empty
            length += 1; // Increment the line counter
            const field = lines[i].toString().split(','); // Split the line into fields

            // Check if the field[3] already exists in the 'students' object
            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              // If it exists, add the student (field[0]) to the corresponding field array
              students[field[3]].push(field[0]);
            } else {
              // If it does not exist, create a new array for this field and add the student
              students[field[3]] = [field[0]];
            }

            // Check if the field[3] already exists in the 'fields' object
            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              // If it exists, increment the student count for this field
              fields[field[3]] += 1;
            } else {
              // If it does not exist, initialize the count for this field
              fields[field[3]] = 1;
            }
          }
        }
        const l = length - 1; // Subtract 1 to account for the header row if present
        console.log(`Number of students: ${l}`); // Log the total number of students
        for (const [key, value] of Object.entries(fields)) {
          // Iterate over the fields object
          if (key !== 'field') { // Exclude the 'field' key if it exists
            // Log the number of students and their names for each field
            console.log(`Number of students in ${key}: ${value}. List: ${students[key].join(', ')}`);
          }
        }
        resolve(data); // Resolve the Promise with the file data
      }
    });
  });
}

module.exports = { countStudents }; // Export the countStudents function for use in other modules
