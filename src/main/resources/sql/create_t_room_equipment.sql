create table t_room_equipment (
    id serial not null primary key, 
	room_id serial not null,
	CONSTRAINT fk_t_room foreign key(room_id) references t_room(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "EquipmentId" serial not null,
	CONSTRAINT fk_t_equipment foreign key("EquipmentId") references t_equipment(id)
);

insert into t_room_equipment (id, room_id, EquipmentId) values (1, 2, 999990);
insert into t_room_equipment (id, room_id, EquipmentId) values (1, 3, 999990);