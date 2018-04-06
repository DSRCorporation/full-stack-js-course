# AMM JS School 2018 SRS

## Project scope

The purpose of the project is to create a digital school diary.
The scope of the project includes creating several items:

1. NodeJS server app
2. ReactJS web app
3. Swagger API spec
4. ERD

## General requirements

Supported operating systems:

1. Ubuntu 17.10
2. Windows 10

Supported browsers:

1. Google Chrome 65+
    1. Desktop mode only
    2. Screen resolution 1024 * 768 px and greater

No internationalization is assumed. All text should be in English.

## Roles and permissions

The system defines 2 different user roles:

1. Student
2. Teacher

Users with the roles described above should have the following permissions:

1. Teacher
    1. Can view a list of students
        1. Only in classes he teaches
    2. Can view a list of marks
        1. Only in classes he teaches
        2. Only for a subject he teaches
    3. Can add new marks
        1. Only in classes he teaches
        2. Only for a subject he teaches
    4. Can edit existing marks
        1. Only in classes he teaches
        2. Only for a subject he teaches
    5. Can not delete existing marks
    6. Can teach many classes
    7. Can teach only one subject
2. Student
    1. Can view a list of students
        1. Only in a class he belongs to
    2. Can view a list of marks
        1. Only ones that belong to him
    3. Can belong to only one class

## Functional requirements

Web application should provide the following major functions:

1. Account management
    1. Login
2. Classes
    1. View a list of classes
3. Students
    1. View a list of students
4. Teachers
    1. View a list of teachers
5. Marks
    1. View a list of marks
    2. Add a new mark
        1. Each mark is a number from 2 to 5
    3. Edit an existing mark
6. Subjects
    1. View a list of subjects

## User interfaces

Common elemetns:

1. The app should have a top menu with a full name of a logged-in user and "Log out" button. The menu should be visible only after a successful login. After clicking "Log out" button the user should be redirected to "Login" screen.

Screens:

1. Common
    1. Login
        1. Should have an input to enter a user name
            1. Full name should be used as a user name
        2. Should have an input to enter a password
2. Teacher
    1. List of classes
        1. A user should be redirected to "List of marks" screen upon clicking a class
    2. List of marks
        1. Should have a table with students as rows and dates as columns
        2. Should have a way to add a new mark
        3. Should have a way to edit an existing mark
        4. Should have a horizontal scroll if there are a lot of columns
            1. List of students should always be visible upon scrolling horizontally
3. Student
    1. List of students in one's class
    2. List of one's marks
        1. Should have a table with subjects as rows and dates as columns
        2. Should have a horizontal scroll if there are a lot of columns
            1. List of subjects should always be visible upon scrolling horizontally

## Non-functional requirements

Techology stack:

1. Server app
    1. NodeJS
    2. ExpressJS
    3. PostgeSQL
2. Web app
    1. ReactJS
    2. Redux
    3. Webpack

Delivery requirements:

1. The server app, the web app and documentation should be stored in one public repo on Github licensed under MIT license
2. The system should start with a single command (bash ./start.sh and etc.). After executing this command an end-user should be able to access the web app at [http://localhost:3001](http://localhost:3001/) and the server app at [http://localhost:3000](http://localhost:3000/)
3. The system should have a pre-defined list of 15 students, 5 subjects, 5 teachers and 3 classes
4. If any one of the apps has system dependencies a list of these dependencies should be specified in README
5. A list with pre-defined user names and passwords should be stored in a format of username:password in credentials.txt in the root of the repo
