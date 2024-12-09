create table users(id PRIMARY KEY SERIAL,name varchar(50),email varchar(50),password varchar(100));
create table passwords(userid int NOT NULL,email VARCHAR(100) NOT NULL,pass VARCHAR(100) NOT NULL,note VARCHAR(100),date DATE NOT NULL DEFAULT CURRENT_DATE);
