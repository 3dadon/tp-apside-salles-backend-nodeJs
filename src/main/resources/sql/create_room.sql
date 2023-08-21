CREATE table t_room (
   id SERIAL primary key not null,
   capacity INT NOT null default 0,
   accessibility BOOLEAN not null default TRUE,
   address VARCHAR(500) not null,
   telephone VARCHAR(15) not null
);

insert into t_room values (1, 10, true, '10 rue des peupliers, 37000 Tours', '0607080910', clock_timestamp(), clock_timestamp());