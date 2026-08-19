-- Create a new database
CREATE DATABASE School_db;

-- swith to the created database
USE School_db;

-- Create  a students table
CREATE TABLE Students (
  student_id INT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  age INT,
  course VARCHAR(50)
);

select * from Students;

INSERT INTO Students VALUES
(1,'hari', 'balaji', 21, 'data analytics'),
(2,'priya', 'sharma', 22, 'computer science'),
(3, 'ravi', 'kumar', 20, 'electronics'),
(4,'anita', 'nair', 23, 'mathematics'),
(5,'kiran','raj',21,'physics');

select * from Students;

-- Add a new column for Email
# Syntax
# ALTER TABLE TABLE_NAME
# ADD COLUMN-NAME DATATYPE(200)

ALTER TABLE Students
ADD email VARCHAR(100);
select * from Students;

-- Update
-- Syntax: UPDATE table name SET email = 'xyh@gmail.com' WHERE first_name = 'hari'

UPDATE Students SET email = 'hari@gmail.com' WHERE student_id =  1;
UPDATE Students SET email = 'priya@gamil.com' WHERE student_id = 2;

-------------------------------------------------------------------------

# DML COMMANDS:
-- 1. INSERT
-- 2. UPDATE
-- 3. DELETE
-- 4. SELECT
-- 5. MERGE

CREATE TABLE Employees(
   emp_id  INT PRIMARY KEY,
   first_name VARCHAR(50),
   last_name VARCHAR(50),
   department VARCHAR(50),
   salary DECIMAL(10,2)
);

-- INSERT sample records
INSERT INTO Employees VALUES
(101,'Hari', 'Balaji', 'Analytics', 55000),
(102,'Priya', 'Sharma', 'HR', 40000),
(103, 'Ravi', 'Kumar', 'Finance', 60000),
(104,'Anita', 'Nair', 'IT', 65000),
(105,'Kiran','Raj', 'Sales', 45000);
select * from Employees;
SET SQL_SAFE_UPDATES = 0;
--  Increase salary of Ravi by 10%
UPDATE Employees 
SET salary = salary * 1.10
WHERE first_name = 'Ravi';

-- Change department of Kiran to 'Marketing'
UPDATE Employees
SET department = 'Marketing'
WHERE emp_id = 105;

-- DELETE Employee Priya
DELETE FROM Employees
WHERE first_name =  'Priya';

-- Delete all employees in marketing
DELETE FROM Employees
WHERE department = 'Marketing';

-- Select all employees
select * from Employees;

-- select only names and salaries
SELECT first_name, last_name, salary FROM Employees;

-- Employees with salary greater than 50,000
select * from Employees
WHERE salary > 50000;

-- Employees ordered by salary (high to low)
select * from Employees
ORDER BY salary DESC;
------------------------------------------------------

-- UPDATING Employees name
UPDATE Employees
SET first_name = 'prema', last_name = 'sri'
WHERE emp_id = 101;
select * from employees;

-- UPDATING new row EMployee details
INSERT INTO Employees
VALUES 
(106, 'Ilakiya', 'Selvi', 'Analytics', 85000);

-- display employees of analytics department
select * from employees
WHERE department = 'Analytics';

-- show particular column data
SELECT first_name, department, salary from employees;

-- arrange salary lowest to highest
select * from Employees
ORDER BY salary;

select avg(salary) as average_salary
from employees;

select sum(salary) as sum_salary
from employees;

select max(salary) as max_salary
from employees;

select * from employees;

select salary * 1.05 as increased_salary
from employees


-- increase all  employees salary with 2500 with RS
select emp_id, first_name, last_name, salary + 2500 as increased_salary
from employees;


select emp_id, first_name, last_name, salary * 12 as Annual_salary
from employees;

-- no.of employees in each department
SELECT department, count(*) as dept_count
from employees
group by department;

-- concepts seen so far:
-- 1.DDL, DML COMMANDS
-- 2. creation of database, value insertion, drop table,
-- 3.AGGREGATE FUNCTION - SUM, MAX, MIN, COUNT
-- 4.update, delete, alter table, where, order by, group by 
