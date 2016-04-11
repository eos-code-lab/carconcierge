CREATE DATABASE carconcierge;
USE carconcierge;
DROP TABLE IF EXISTS contact;
CREATE TABLE contact(
	id							INT UNSIGNED NOT NULL auto_increment,
	name						VARCHAR(120) NOT NULL,
	email						VARCHAR(120) NOT NULL,
	phone						VARCHAR(120) NOT NULL DEFAULT "",
	message					VARCHAR(300) NOT NULL,
	added_date			TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary key(id)
)type=innodb DEFAULT CHARACTER SET utf8	COLLATE utf8_general_ci;
