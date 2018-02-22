create database  languageUsers_db;

USE languageUsers_db;

CREATE TABLE userTable
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    language varchar(255) NOT NULL,
	level varchar(255) NOT NULL,
    
	PRIMARY KEY (id)
);