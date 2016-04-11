CREATE DATABASE carconcierge;
USE carconcierge;
DROP TABLE IF EXISTS contacts;
CREATE TABLE contacts(
	id					INT UNSIGNED NOT NULL auto_increment,
	name				VARCHAR(120) NOT NULL,
	email				VARCHAR(120) NOT NULL,
	phone				VARCHAR(120) NOT NULL DEFAULT "",
	message				VARCHAR(300) NOT NULL,
	added_date			TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	primary key(id)
);
