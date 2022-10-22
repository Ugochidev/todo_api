-- DATABASE --
CREATE DATABASE todo_api;

-- USER TABLE --
CREATE TABLE users
(
	id VARCHAR(36) UNIQUE PRIMARY KEY,
	name VARCHAR(100),
	email VARCHAR(100),
	password VARCHAR(100)
);

-- DEMO --
INSERT INTO users
	(id, name, email, password)
VALUES
	(uuid(), 'john doe', 'johndoe@gmail.com', 'password123');