USE employees_db;

INSERT INTO department (name)
VALUES 
('Information Technology'),
('Finance'),
('Legal'),
('Human Resources'),
('Security'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Web Developer', 100000, 1),
('Accountant', 50000, 2),
('Paralegal', 40000, 3),
('Manager', 130000, 4),
('Engineer', 90000, 5),
('Sales Rep', 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Ansab', 'Sidiki', 4, NULL),
('Durdana', 'Sidiki', 4, NULL),
('Wardah', 'Mujahid', 3, 1),
('Sabeen', 'Sidiki', 3, 2),
('Bassam', 'Sidiki', 5, 2),
('Moiz', 'Hasan', 6, 1);