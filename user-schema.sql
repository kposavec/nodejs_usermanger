CREATE TABLE `usermanager`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `lastname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `comment` TEXT(500) NULL,
  `status` VARCHAR(45) NULL DEFAULT 'active',
  PRIMARY KEY (`id`));