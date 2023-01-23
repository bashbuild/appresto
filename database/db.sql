CREATE DATABASE restoapp;

use restoapp;

CREATE TABLE accounts (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(42) NOT NULL,
    email VARCHAR(42) NOT NULL,
    password VARCHAR(42) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE products (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(11) NOT NULL,
    name VARCHAR(42) NOT NULL,
    price INT(11) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)