# Employee Tracker

## Description 
A CLI content management system for managing a company's employees using node, inquirer, and MySQL.

* [Video Walkthrough](https://drive.google.com/file/d/1zE8-Ja5ZUahdSSBxfDgq4u1L-SgIzn-E/view)

## Installation 
Open your terminal and change into the corresponding directory. Run "node app.js" and you will be prompted with options.

## Database

The database contains three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee

## Author
Ansab Sidiki - https://github.com/asidiki