-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema roostIt
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema roostIt
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `roostIt` DEFAULT CHARACTER SET utf8 ;
USE `roostIt` ;

-- -----------------------------------------------------
-- Table `roostIt`.`residence`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`residence` (
  `idresidence` INT NOT NULL AUTO_INCREMENT,
  `photo` LONGTEXT NOT NULL,
  `name` VARCHAR(45) NULL,
  `adresse` VARCHAR(255) NULL,
  `phoneNumber` INT NULL,
  `longitude` VARCHAR(255) NULL,
  `latidue` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  `city` VARCHAR(85) NOT NULL,
  PRIMARY KEY (`idresidence`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`university`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`university` (
  `iduniversity` INT NOT NULL AUTO_INCREMENT,
  `universityName` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `adresse` VARCHAR(255) NOT NULL,
  `longitude` VARCHAR(255) NULL,
  `latiude` VARCHAR(255) NULL,
  PRIMARY KEY (`iduniversity`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`homeOwner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`homeOwner` (
  `idhomeOwner` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `dateOfBirth` VARCHAR(45) NULL,
  `phoneNumber` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `cin` VARCHAR(45) NOT NULL,
  `photo` LONGTEXT NULL,
  `cookie` LONGTEXT NULL,
  `activationCode` VARCHAR(255) NULL,
  PRIMARY KEY (`idhomeOwner`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `CIN_UNIQUE` (`CIN` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`house` (
  `idhouse` INT NOT NULL,
  `photo` LONGTEXT NOT NULL,
  `description` VARCHAR(255) NULL,
  `price` INT NULL,
  `latiude` VARCHAR(255) NULL,
  `longitude` VARCHAR(255) NULL,
  `adress` VARCHAR(255) NULL,
  `city` VARCHAR(45) NULL,
  `rate` VARCHAR(45) NULL,
  `homeOwner_idhomeOwner` INT NULL,
  PRIMARY KEY (`idhouse`),
  INDEX `fk_house_homeOwner_idx` (`homeOwner_idhomeOwner` ASC) VISIBLE,
  CONSTRAINT `fk_house_homeOwner`
    FOREIGN KEY (`homeOwner_idhomeOwner`)
    REFERENCES `roostIt`.`homeOwner` (`idhomeOwner`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`students` (
  `idstudents` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(255) NULL,
  `dateOfBirth` VARCHAR(60) NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` LONGTEXT NOT NULL,
  `gender` VARCHAR(45) NULL,
  `phoneNumber` INT NULL,
  `cin` VARCHAR(255) NOT NULL,
  `lookingFor` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `rentePeriode` VARCHAR(85) NULL,
  `photo` LONGTEXT NOT NULL,
  `cookie` LONGTEXT NULL,
  `residence_idresidence` INT NULL,
  `university_iduniversity` INT NULL,
  `house_idhouse` INT NULL,
  PRIMARY KEY (`idstudents`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `CIN_UNIQUE` (`CIN` ASC) VISIBLE,
  INDEX `fk_students_residence1_idx` (`residence_idresidence` ASC) VISIBLE,
  INDEX `fk_students_university1_idx` (`university_iduniversity` ASC) VISIBLE,
  INDEX `fk_students_house1_idx` (`house_idhouse` ASC) VISIBLE,
  CONSTRAINT `fk_students_residence1`
    FOREIGN KEY (`residence_idresidence`)
    REFERENCES `roostIt`.`residence` (`idresidence`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_students_university1`
    FOREIGN KEY (`university_iduniversity`)
    REFERENCES `roostIt`.`university` (`iduniversity`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_students_house1`
    FOREIGN KEY (`house_idhouse`)
    REFERENCES `roostIt`.`house` (`idhouse`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`studentsPosts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`studentsPosts` (
  `idposts` INT NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `students_idstudents` INT NULL,
  PRIMARY KEY (`idposts`),
  INDEX `fk_studentsPosts_students1_idx` (`students_idstudents` ASC) VISIBLE,
  CONSTRAINT `fk_studentsPosts_students1`
    FOREIGN KEY (`students_idstudents`)
    REFERENCES `roostIt`.`students` (`idstudents`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`homeOwnerPosts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`homeOwnerPosts` (
  `idhomeOwnerPosts` INT NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `homeOwner_idhomeOwner` INT NULL,
  PRIMARY KEY (`idhomeOwnerPosts`),
  INDEX `fk_homeOwnerPosts_homeOwner1_idx` (`homeOwner_idhomeOwner` ASC) VISIBLE,
  CONSTRAINT `fk_homeOwnerPosts_homeOwner1`
    FOREIGN KEY (`homeOwner_idhomeOwner`)
    REFERENCES `roostIt`.`homeOwner` (`idhomeOwner`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`comments` (
  `idcomments` INT NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `homeOwner_idhomeOwner` INT NULL,
  `students_idstudents` INT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `fk_comments_homeOwner1_idx` (`homeOwner_idhomeOwner` ASC) VISIBLE,
  INDEX `fk_comments_students1_idx` (`students_idstudents` ASC) VISIBLE,
  CONSTRAINT `fk_comments_homeOwner1`
    FOREIGN KEY (`homeOwner_idhomeOwner`)
    REFERENCES `roostIt`.`homeOwner` (`idhomeOwner`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_students1`
    FOREIGN KEY (`students_idstudents`)
    REFERENCES `roostIt`.`students` (`idstudents`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
