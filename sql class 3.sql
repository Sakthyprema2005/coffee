CREATE DATABASE comp_db;

USE comp_db;
CREATE TABLE employees(
  emp_id INT PRIMARY KEY,
  emp_first_name VARCHAR(50),
  emp_last_name VARCHAR(50),
  emp_gender VARCHAR(50),
  emp_salary DECIMAL(10,2),
  emp_department VARCHAR(50),
  emp_experience VARCHAR(50)
  );
  
  INSERT INTO employees VALUES
  (5, 'Priya', 'Sharma', 'Female', 45000, 'IT', '2 years'),
  (6, 'Rahul', 'Patel', 'Male', 65000, 'Sales', '5 years'),
  (7, 'Nisha', 'Gupta', 'Female', 55000, 'Marketing', '4 years'),
  (8, 'Vikram','Singh', 'Male', 75000, 'Finance', '7 years'),
  (9, 'Aarti', 'Desai', 'Female', 50000, 'IT', '3 years');
  
  select * from employees;
  
  UPDATE Employees 
  SET emp_salary = emp_salary * 1.10
  WHERE emp_first_name = 'Priya';
  
  select * from Employees;
  
  UPDATE Employees
  SET emp_department = 'Marketing'
  WHERE emp_id = 7;
  
  DELETE FROM Employees
  WHERE emp_first_name =  'Priya';
  
  DELETE FROM Employees
  WHERE emp_department = 'Marketing';
  
  select * from employees;
  
  SELECT emp_first_name, emp_last_name, emp_salary FROM Employees;
  
  select * from Employees
  WHERE emp_salary > 50000;
  
  select * from Employees
  ORDER BY emp_salary DESC;
  
  UPDATE Employees
  SET emp_first_name = 'Sri', emp_last_name = 'Prema'
  WHERE emp_id = 6;
  
  select * from employees;
  
  INSERT INTO Employees
  VALUES 
  (10, 'Ilakiya', 'Selvi', 'Female', 85000, 'Analytics', '4 years');
  
  select * from employees
  WHERE emp_department = 'Analytics';
  
  SELECT emp_first_name, emp_department, emp_salary from employees;
  
  select * from Employees
  ORDER BY emp_salary;
  
  select avg(emp_salary) as average_emp_salary
  from employees;
  
  select sum(emp_salary) as sum_emp_salary
  from employees;
  
  select max(emp_salary) as max_emp_salary
  from employees;
  
  select emp_salary * 1.05 as increased_emp_salary
  from employees;
  
  select emp_id, emp_first_name, emp_last_name, emp_salary + 2500 as increased_emp_salary
  from employees;
  
  select emp_id, emp_first_name, emp_last_name, emp_salary * 12 as Annual_emp_salary
  from employees;
  
  SELECT emp_department, count(*) as dept_count
  from employees
  group by emp_department;

