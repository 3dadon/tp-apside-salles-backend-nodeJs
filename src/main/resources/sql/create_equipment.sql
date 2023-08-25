create table t_equipment (
	id SERIAL not null PRIMARY KEY,
	name VARCHAR not null,
	iconName VARCHAR not null
);

insert into t_equipment (id, name, iconname) values(999990, 'table', 'desk');
insert into t_equipment (id, name, iconname) values(999991, 'visio', 'connected_tv');