
-- create a schema called `notesdb`
create database notesdb;

-- Create the tables for Note, Category, Reminder, NoteReminder and NoteCategory

-- Note table fields: note_id, note_title, note_content, note_status, note_creation_date

CREATE TABLE Note (
    note_id INT PRIMARY KEY AUTO_INCREMENT,
    note_title VARCHAR(255) NOT NULL UNIQUE,
    note_content TEXT,
    note_status VARCHAR(50),
    note_creation_date DATE NOT NULL
);
  
-- Category table fields : category_id, category_name, category_descr, category_creation_date

CREATE TABLE Category (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL UNIQUE,
    category_descr TEXT,
    category_creation_date DATE NOT NULL
);

-- Reminder table fields : reminder_id, reminder_name, reminder_descr, reminder_type, reminder_creation_date

CREATE TABLE Reminder (
    reminder_id INT PRIMARY KEY AUTO_INCREMENT,
    reminder_name VARCHAR(255) NOT NULL UNIQUE,
    reminder_descr TEXT,
    reminder_type VARCHAR(50),
    reminder_creation_date DATE NOT NULL
);

-- NoteCategory table fields : notecategory_id, note_id, category_id

CREATE TABLE NoteCategory (
    notecategory_id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (note_id) REFERENCES Note(note_id),
    FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

-- NoteReminder table fields : notereminder_id, note_id, reminder_id

CREATE TABLE NoteReminder (
    notereminder_id INT PRIMARY KEY AUTO_INCREMENT,
    note_id INT NOT NULL,
    reminder_id INT NOT NULL,
    FOREIGN KEY (note_id) REFERENCES Note(note_id),
    FOREIGN KEY (reminder_id) REFERENCES Reminder(reminder_id)
); 
