# Keep Note Integration With NodeJS

## Context

Keep Note is a website that helps users capture their minds and allows them to add notes and lists. It also allows adding a reminder to make sure that the user never misses a thing. It is possible to add labels to notes to quickly organize and get on with it.  ​

Keep Note application allows only the registered users to add notes and access them. To persist user details and notes information, it must be stored in a database that should be highly secure and reliable. ​

Due to its growing popularity, the number of users accessing the application has increased multifold. For a seamless user experience, choosing the right database which performs well and provides data faster is the need of the hour. ​

MySQL database server is open-source database software that is faster, secured,  reliable and cheaper because of its unique storage engine architecture. ​

The backend development team is now responsible for persisting the application data in the MySQL database which ensures durability. ​

## Problem Statement

Keep Note application is used to​

- Take notes​
- Add notes to labels/categories​
- Set reminders for a note.​

In the previous exercise, the necessary DB schema in the MySQL database including tables, relationships is created, and sample data are added to each table using SQL queries. ​

As a continuation to the previous exercise, create a Node.js application to behave like middleware which should establish a connection with the MySQL database. The application should enable to add notes, label them by adding categories to it and set reminders for a note.​

You as a backend developer have been assigned the responsibility to design REST APIs and integrate with the MySQL. ​​

### Tasks: Keep Note- User Stories

Following are the user stories for the note service, category service, and reminder service of the Keep Note app ​

- As a user, I should be able to add a new note ​
- As a user, I should be able to assign a category to a particular note​
- As a user, I should be able to set a reminder for a note​
- As a user, I should be able to view all notes by category​
- As a user, I should be able to view all categories and all reminders​
- As a user, I should be able to update an existing note, category, or reminder​
- As a user, I should be able to delete an existing note, category, or reminder 

### User APIs

- `get` api/note/
- `get` api/note/:id
- `post` api/note/
- `put` api/note/:id
- `delete` api/note/:id
- `delete` api/note/
- `get` api/reminder?name=""
- `get` api/reminder/:id
- `post` api/reminder/
- `put` api/reminder/:id
- `delete` api/reminder/:id
- `delete` api/reminder/
- `get` api/category?name=""
- `get` api/category/:id
- `post` api/category/
- `put` api/category/:id
- `delete` api/category/:id
- `delete` api/category/


### Instructions

1. Download and unzip the boilerplate code.  
2. Run the command `npm install` in the terminal to install the dependencies. 
3. Open the boilerplate code in VSCode to develop the assignment solution.
4. Design and implement the APIs to work on the below listed entities: 
    1. Note
    2. Category
    3. Reminder
5. Create the required tables in MySQL database using the instructions provided in the `notedb.sql` file.
6. Use mysql module to establish connectivity with MySQL database.
7. The solution to establish connectivity using mysql module should be provided in `db.js` file.
8. Edit `db.config.js` file to store the configuration details for MySQL connection.
9. The solution code needs to be provided in `.controller.js`,`.service.js` and `.dao.js`  for each of the APIs in their respecitive folders.
    - The `.dao.js` file should contain the code for performing CRUD operations.
12. Test the solution locally to check the correctness and completeness for stated `dao`, `service` and `controller` requirements.
13. Refactor the solution to ensure all test cases are passing.
14. Zip the solution code with the same name as the assignment name.  
15. Upload the zipped solution for submission.  

### Run Code

1. Run the command `node app.js` to execute the Node.js APIs.
2. Use VSCode Extension Thunder Client or Postman or any other GUI tool to test the APIs.

### Test Code

1. Test the solution locally by running the command `npm run test`.
