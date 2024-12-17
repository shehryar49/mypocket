create table users(id SERIAL PRIMARY KEY,name varchar(50),email varchar(50),password varchar(100),contact varchar(20));
create table passwords(id SERIAL PRIMARY KEY,userid int NOT NULL,email VARCHAR(100) NOT NULL,pass VARCHAR(100) NOT NULL,note VARCHAR(100),date DATE NOT NULL DEFAULT CURRENT_DATE,UNIQUE(userid,email,pass,note,data));
create table notifications(id SERIAL PRIMARY KEY,msg VARCHAR(100));

create table shared_files(id SERIAL PRIMARY KEY,filePath VARCHAR(255),sharedBy int,sharedTo int);