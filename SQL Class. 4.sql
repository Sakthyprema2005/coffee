-- table 1. employees demographics (personal details)
CREATE TABLE demographics (
  id INT NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  age INT,
  gender VARCHAR(10),
  birth_date DATE,
  PRIMARY KEY (id)
  );
  
  select * from demographics;
  
  -- table 2. employees salary (job & pay details)
  CREATE TABLE salary (
    id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50)  NOT NULL,
    occupation VARCHAR(50),
    salary INT,
	dept_id INT
  );
  
  
  -- table 3. department in the city
  CREATE TABLE city_department (
     department_id INT  AUTO_INCREMENT,
     department_name VARCHAR(50) NOT NULL,
     PRIMARY KEY (department_id)
  );
  
  select * from city_department;
  
  -- insert employees
  INSERT INTO demographics (id, first_name, last_name, age, gender, birth_date) VALUES
  (1, 'arjun', 'sharma', 44, 'male', '1979-08-15'),
  (2, 'rohit', 'kumar', 48, 'male', '1975-06-10'),
  (3, 'priya', 'iyer', 36, 'female', '1987-05-22'),
  (4, 'ravi', 'menon', 29, 'male', '1994-10-10'),
  (5, 'lakshmi', 'nair', 61, 'female', '1962-12-19'),
  (6, 'vikiram', 'reddy', 46, 'male', '1977-03-09'),
  (7, 'neha', 'patel', 35, 'female', '1988-11-05'),
  (8, 'karan', 'kapoor', 43, 'male', '1980-07-14'),
  (9, 'meera', 'sinha', 38, 'female', '1985-09-30'),
  (10, 'rahul', 'joshi', 34, 'male', '1989-01-18'),
  (11, 'sneha', 'deshmukh', 40, 'female','1983-04-02'),
  (12, 'amit', 'verma', 37, 'male', '1986-06-25');
  select * from demographics;
  
  -- select a specific column
  select first_name, age
  from demographics;
  
  -- select multiple columns (separate them with commas)
  select first_name, last_name
  from demographics;
  
  -- column order in select deos not have to match  table order
  select last_name, first_name, gender, age
  from demographics;
  
  -- A cleaner format (often used in Sql for readability)
  SELECT
    last_name,
    first_name,
    gender,
    age
FROM demographics;

-- Demographics mathematical operations in sql
-- Sql follows PEMDAS (parentheses, exponent, multiplication, division, addition, subtraction)

-- example 1. adding 100 to salary
select first_name,
 last_name,
 salary,
 salary + 100 as salary_plus_100
from salary;
-- or
select salary, salary + 100 as salary_100 from salary;
select salary, salary * 1.10  as salary_10 from salary;
select *, salary * 1.10  as salary_10 from salary;

-- example 2. additing 100 to salary and then multiplying by 10
SELECT 
   first_name,
   last_name,
   salary,
   (salary + 100) * 10 as adjusted_salary
from salary;

-- select id from salary 
SELECT id
from salary;

-- select distinct id (to remove duplicates)
select distinct id
from salary;


-- ===============================
-- WHERE Clause & LIKE statement
-- ===============================
# Filtering rows with numerical conditions:

-- select all employees with salary greater than 50000
SELECT *
FROM salary  
WHERE salary > 50000;

-- select all employees with salary gretaer than or equal to 50000
select *
from salary
where salary >= 50000;

# filtering rows with equality conditions

-- select only female employees
select *
from demographics
where gender = 'female';

-- select all employees who are not female
select *
from demographics
where gender != 'female';

#filtering rows with date values

-- select emplopyees born after january 1, 1985
select *  
from demographics
where birth_date > '1985-01-01';

-- ==================================================?m
-- 3.1. LIKE Statemennt
-- the LIKE operator is used for pattern matching.
-- it works with two wildcards:
-- % -> matches zero or more characters
-- _ -> matches exactly one character
-- ====================================================

-- names that start with 'a'
select *
from demographics
where first_name LIKE 'a%'; 

-- names where 'a' is not followed by exactly two characters
select *
from demographics 
where first_name LIKE 'a__'; #aavin #aamir  #salmaan

-- names where 'a' is  followed by at least three characters
select *
from demographics
where first_name  LIKE 'a__%'; 








  
  

  
    