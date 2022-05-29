DROP DATABASE IF EXISTS employee_crm_db;
CREATE DATABASE employee_crm_db;

USE employee_crm_db;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    name VARCHAR(30)
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_name VARCHAR(30),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id),
    salary INT,
    FOREIGN KEY (salary) REFERENCES departments(department_id),
    manager_name VARCHAR(30),
    id INT,
    FOREIGN KEY (id) REFERENCES employees(id)
);
