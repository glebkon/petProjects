# Keep Note – Integration with Node.js
A Node.js application which establishes a connection with the MySQL database. The application enables adding notes, labeling them by adding categories and setting reminders for a note.  

Following are the user stories for the note service, category service, and reminder service of the Keep Note app:  
- As a user, I should be able to add a new note.  
- As a user, I should be able to assign a category to a particular note.  
- As a user, I should be able to set a reminder for a note.  
- As a user, I should be able to view all notes by category.  
- As a user, I should be able to view all categories and all reminders.  
- As a user, I should be able to update an existing note, category, or reminder.  
- As a user, I should be able to delete an existing note, category, or reminder.  

User APIs:
- get api/note/  
- get api/note/:id  
- post api/note/  
- put api/note/:id  
- delete api/note/:id  
- delete api/note/  
- get api/reminder?name=""  
- get api/reminder/:id  
- post api/reminder/  
- put api/reminder/:id  
- delete api/reminder/:id  
- delete api/reminder/  
- get api/category?name=""  
- get api/category/:id  
- post api/category/  
- put api/category/:id  
- delete api/category/:id  
- delete api/category/  

