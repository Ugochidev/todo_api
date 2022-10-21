-- DATABASE --
CREATE DATABASE todo_api;

-- USER TABLE --
CREATE TYPE stats AS ENUM ('Pending', 'Completed');
CREATE TABLE todos
(
	id VARCHAR(36) UNIQUE PRIMARY KEY,
	user_id VARCHAR(36),
	title VARCHAR(50) NOT NULL,
	description VARCHAR(100) NOT NULL,
	status stats DEFAULT 'Pending',
	due_date TIMESTAMP NOT NULL,
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- DEMO --
INSERT INTO todos
	(id, task, due_date, created_at, updated_at)
VALUES
	(uuid(), 'Todo Api Project', '2022-10-21', '2022-10-18', '2022-10-18');