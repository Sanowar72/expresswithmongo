# Student Management API

## API Endpoints

Below are the endpoints available in the Student Management API.

### Home

- **Method:** GET
- **URL:** /
- **Description:** Returns a welcome message.
- **Response:** "Hello, Express!"

### Add Student Data

- **Method:** POST
- **URL:** /api/users
- **Request Body:** Student object
- **Description:** Adds a new student.
- **Response:** JSON object with success status, message, and newly added student data.

### Read Student Data

- **Method:** GET
- **URL:** /api/users
- **Description:** Retrieves all student data with pagination support.
- **Query Parameters:**
  - `page`: (Optional) Page number for pagination (Default: 1)
- **Response:** JSON object with success status, current page number, total pages, total data count, and student data.

### Search Students by Name

- **Method:** GET
- **URL:** /api/users/search
- **Request Body:** Object containing `first_name` and/or `last_name`
- **Description:** Searches students by first name and/or last name.
- **Response:** JSON object with success status, current page number, total pages, total results count, and student data matching the search criteria.

### Filter Students

- **Method:** GET
- **URL:** /api/users/filter
- **Request Body:** Object containing filtering parameters (`domain`, `gender`, `availability`)
- **Description:** Filters students by domain, gender, and availability.
- **Response:** JSON object with success status, current page number, total pages, total results count, and filtered student data.

### Get Student by ID

- **Method:** GET
- **URL:** /api/users/:id
- **Path Variables:** id (Student ID)
- **Description:** Retrieves a student by ID.
- **Response:** JSON object with success status and student data matching the provided ID.

### Update Student by ID

- **Method:** PUT
- **URL:** /api/users/:id
- **Path Variables:** id (Student ID)
- **Request Body:** Updated student object
- **Description:** Updates a student's details by ID.
- **Response:** JSON object with success status and updated student data.

### Delete Student by ID

- **Method:** DELETE
- **URL:** /api/users/:id
- **Path Variables:** id (Student ID)
- **Description:** Deletes a student by ID.
- **Response:** JSON object with success status and message indicating the deletion status.

Please ensure to replace placeholders such as `Student object` with the actual request and response data structures used in your application. The request and response data structures might differ based on your specific implementation.
