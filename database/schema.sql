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
  `photo` VARCHAR(255) NULL,
  `name` VARCHAR(45) NULL,
  `adresse` VARCHAR(255) NULL,
  `phonenumber` REAL NULL,
  `location` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`idresidence`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`homeOwner`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`homeOwner` (
  `idhomeOwner` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NOT NULL,
  `dateofBirth` VARCHAR(45) NULL,
  `phoneNumber` REAL NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `CIN` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idhomeOwner`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `CIN_UNIQUE` (`CIN` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`house` (
  `idhouse` INT NOT NULL AUTO_INCREMENT,
  `photo` VARCHAR(255) NULL,
  `description` VARCHAR(255) NULL,
  `price` INT NOT NULL,
  `location` VARCHAR(255) NULL,
  `adress` VARCHAR(255) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `rate` VARCHAR(45) NULL,
  `homeOwner_idhomeOwner` INT NOT NULL,
  PRIMARY KEY (`idhouse`, `homeOwner_idhomeOwner`),
  INDEX `fk_house_homeOwner_idx` (`homeOwner_idhomeOwner` ASC) VISIBLE,
  CONSTRAINT `fk_house_homeOwner`
    FOREIGN KEY (`homeOwner_idhomeOwner`)
    REFERENCES `roostIt`.`homeOwner` (`idhomeOwner`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`university`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`university` (
  `iduniversity` INT NOT NULL AUTO_INCREMENT,
  `universityname` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NULL,
  `adresse` VARCHAR(255) NULL,
  PRIMARY KEY (`iduniversity`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`students`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`students` (
  `idstudents` INT NOT NULL AUTO_INCREMENT,
  `fullName` VARCHAR(45) NOT NULL,
  `dataofBirth` VARCHAR(60) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NOT NULL,
  `gender` VARCHAR(45) NULL,
  `phonenumber` REAL NOT NULL,
  `lookingFor` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `rentPeriode` VARCHAR(45) NULL,
  `photo` VARCHAR(220) NULL,
  `maxbudget` INT NOT NULL DEFAULT 300,
  `blocked` VARCHAR(255) NULL DEFAULT 'false',
  `residence_idresidence` INT NULL,
  `house_idhouse` INT NULL,
  `house_homeOwner_idhomeOwner` INT NULL,
  `university_iduniversity` INT NULL,
  PRIMARY KEY (`idstudents`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_students_residence1_idx` (`residence_idresidence` ASC) VISIBLE,
  INDEX `fk_students_house1_idx` (`house_idhouse` ASC, `house_homeOwner_idhomeOwner` ASC) VISIBLE,
  INDEX `fk_students_university1_idx` (`university_iduniversity` ASC) VISIBLE,
  CONSTRAINT `fk_students_residence1`
    FOREIGN KEY (`residence_idresidence`)
    REFERENCES `roostIt`.`residence` (`idresidence`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_house1`
    FOREIGN KEY (`house_idhouse` , `house_homeOwner_idhomeOwner`)
    REFERENCES `roostIt`.`house` (`idhouse` , `homeOwner_idhomeOwner`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_university1`
    FOREIGN KEY (`university_iduniversity`)
    REFERENCES `roostIt`.`university` (`iduniversity`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`studentsPosts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`studentsPosts` (
  `idposts` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NULL,
  `content` VARCHAR(255) NULL,
  `students_idstudents` INT NULL,
  PRIMARY KEY (`idposts`),
  INDEX `fk_studentsPosts_students1_idx` (`students_idstudents` ASC) VISIBLE,
  CONSTRAINT `fk_studentsPosts_students1`
    FOREIGN KEY (`students_idstudents`)
    REFERENCES `roostIt`.`students` (`idstudents`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`homeOwnerPosts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`homeOwnerPosts` (
  `idhomeOwnerPosts` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NULL,
  `content` VARCHAR(255) NULL,
  `homeOwner_idhomeOwner` INT NULL,
  PRIMARY KEY (`idhomeOwnerPosts`),
  INDEX `fk_homeOwnerPosts_homeOwner1_idx` (`homeOwner_idhomeOwner` ASC) VISIBLE,
  CONSTRAINT `fk_homeOwnerPosts_homeOwner1`
    FOREIGN KEY (`homeOwner_idhomeOwner`)
    REFERENCES `roostIt`.`homeOwner` (`idhomeOwner`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `roostIt`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `roostIt`.`comments` (
  `idcomments` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NULL,
  `username` VARCHAR(45) NULL,
  `homeOwner_idhomeOwner` INT NULL,
  `students_idstudents` INT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `fk_comments_homeOwner1_idx` (`homeOwner_idhomeOwner` ASC) VISIBLE,
  INDEX `fk_comments_students1_idx` (`students_idstudents` ASC) VISIBLE,
  CONSTRAINT `fk_comments_homeOwner1`
    FOREIGN KEY (`homeOwner_idhomeOwner`)
    REFERENCES `roostIt`.`homeOwner` (`idhomeOwner`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_students1`
    FOREIGN KEY (`students_idstudents`)
    REFERENCES `roostIt`.`students` (`idstudents`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;