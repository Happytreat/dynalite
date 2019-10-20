DROP TABLE IF EXISTS coap_post CASCADE;

CREATE TABLE coap_post (
    s_id SERIAL PRIMARY KEY,
	type  varchar(24) NOT NULL,
	id    integer NOT NULL,
	payload varchar(1024) NOT NULL
);

INSERT INTO coap_post (type, id, payload) 
VALUES ('Confirmable(0)', '57602', 'Dummy message'), ('Reset(3)', '54475', 'Dummy message');