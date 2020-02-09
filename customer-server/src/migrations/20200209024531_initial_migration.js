// eslint-disable-next-line no-undef
exports.up = function(knex) {
	return knex.raw('CREATE TABLE customer( id uuid NOT NULL, "firstName" character varying(40) COLLATE pg_catalog."default" NOT NULL, "lastName" character varying(40) COLLATE pg_catalog."default" NOT NULL, birthday timestamp with time zone NOT NULL, gender character varying(1) COLLATE pg_catalog."default" NOT NULL, "lastContact" timestamp with time zone NOT NULL, "customerLifeTimeValue" real NOT NULL, CONSTRAINT customer_pkey PRIMARY KEY (id) )')
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
exports.down = function() {} // eslint-disable-line no-undef
