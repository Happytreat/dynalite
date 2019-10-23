DROP TABLE IF EXISTS coap_post CASCADE;

CREATE TABLE coap_post (
    s_id SERIAL PRIMARY KEY,
	type  varchar(24) NOT NULL,
	id    integer NOT NULL,
	payload jsonb NOT NULL
);

INSERT INTO coap_post (type, id, payload) 
VALUES ('Confirmable(0)', '57602', '{"rpi_id": 1, "timestamp": "2018-12-25 09:27:53", "isOccupied": 1}');