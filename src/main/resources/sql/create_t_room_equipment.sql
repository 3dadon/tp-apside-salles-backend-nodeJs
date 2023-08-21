create table t_room_equipment (
    t_room_id serial,
	CONSTRAINT fk_t_room foreign key(t_room_id) references t_room(id) ,
    t_equipment_id serial,
	CONSTRAINT fk_t_equipment foreign key(t_equipment_id) references t_equipment(id)
);