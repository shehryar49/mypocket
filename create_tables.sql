create table users(id SERIAL PRIMARY KEY,name varchar(50),email varchar(50),password varchar(100),active_sessions int DEFAULT 0,tfa boolean default false,email_notifications boolean default false);
create table passwords(id SERIAL PRIMARY KEY,userid int NOT NULL,email VARCHAR(100) NOT NULL,pass VARCHAR(100) NOT NULL,note VARCHAR(100),date DATE NOT NULL DEFAULT CURRENT_DATE,UNIQUE(userid,email,pass,note));

--rtype is 0 for file and 1 for folder
--parentid is -1 for root folder
create table filesystem(id SERIAL PRIMARY KEY,userid int,rname VARCHAR(255),rtype int,parentid int);

create table acl(id SERIAL PRIMARY KEY,sharedBy int,ownername VARCHAR(50),sharedTo int,resourceid int,boolean write_access);

create table otp(userid INT NOT NULL,code int,expires DATETIME);

create table encrypting(id INT NOT NULL,name VARCHAR(255),done boolean);
create table decrypting(id INT NOT NULL,name VARCHAR(255),done boolean);

create table encryption_keys(id INT NOT NULL,X int,Y int,n0 int,sum NUMERIC);
