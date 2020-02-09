exports.up = function(knex) {
	return knex.raw('CREATE TABLE postgres.customer( id uuid NOT NULL, "firstName" character varying(40) COLLATE pg_catalog."default" NOT NULL, "lastName" character varying(40) COLLATE pg_catalog."default" NOT NULL, birthday date NOT NULL, gender character varying(1) COLLATE pg_catalog."default" NOT NULL, "lastContact" timestamp without time zone NOT NULL, "customerLifetimeValue" real NOT NULL, CONSTRAINT customer_pkey PRIMARY KEY (id) )')
}

exports.down = function(knex) {}
