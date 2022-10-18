-- DATABASE --
CREATE DATABASE todo_api;

-- USER TABLE --
CREATE TABLE users
(
	id VARCHAR(36) UNIQUE PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	email VARCHAR(100),
	phone_number VARCHAR(15),
	password VARCHAR(100)
);

-- DEMO --
INSERT INTO users
	(id,first_name, last_name, email, phone_number, password)
VALUES
	(uuid(), 'john', 'doe', 'johndoe@gmail.com', '09087654321', 'password123');