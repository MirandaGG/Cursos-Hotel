create database Hotel_Cursos;

use database Hotel_Cursos;

-- tabla de usuarios
create table users(
    id int(11) not null,
    username varchar(16) not null,
    password varchar(60) not null,
    fullname varchar(100) not null,
    typeAccount varchar(16) not null
);

alter table users
 ADD PRIMARY KEY (id);

 alter table users
 modify id int (11) not null auto_increment;

 describe users;

 -- tabla de cursos
 create table cursos(
      id int(11) not null,
      title varchar(150) not null,
      category varchar(60) not null,
      description text,
      user_id int(11),
      course_status varchar(11) not null,
      created_at timestamp not null default current_timestamp,
      constraint fk_user foreign KEY (user_id) references users(id)

 );

 alter table cursos
 add PRIMARY KEY (id);

alter table cursos
 modify id int (11) not null auto_increment;