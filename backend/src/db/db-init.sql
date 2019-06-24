create database perssonified;
use perssonified;

create table users(
    id int auto_increment primary key,
    email VARCHAR(45) not null,
    password VARCHAR(45) not null,
    createdAt datetime,
    updatedAt datetime
);