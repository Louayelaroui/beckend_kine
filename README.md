## Authentication Routes

### Sign Up Admin

- **Route**: `POST /auth/signup-admin`
- **Function**: `signUpAdmin`
- **Request Body**:
  - `username`: admin username (String)
  - `password`: admin password (String)
- **Response**:
  - Redirects to `/auth/signin-admin` if successful
  - Status 400 and "Invalid Request" message if there is an error

### Sign In Admin

- **Route**: `POST /auth/signin-admin`
- **Function**: `signInAdmin`
- **Request Body**:
  - `username`: admin username (String)
  - `password`: admin password (String)
- **Response**:
  - Redirects to `/auth/admin-panel` if successful
  - Renders the `pages/admin-login` view with an error message if there is an error

### Sign In Admin View

- **Route**: `GET /auth/signin-admin`
- **Function**: `getSignInView`
- **Response**: Renders the `pages/admin-login` view

### Sign Up Admin View

- **Route**: `GET /auth/signup-admin`
- **Function**: `getSignUpView`
- **Response**: Renders the `pages/admin-signup` view

### Admin Panel

- **Route**: `GET /auth/admin-panel`
- **Function**: `getHomeAdmin`
- **Response**:
  - Redirects to `/auth/signin-admin` if the user is not an admin
  - Renders the `pages/home-admin` view with all users

### Edit User View

- **Route**: `GET /auth/edit-user/:id`
- **Function**: `getEditUserView`
- **Request Params**:
  - `id`: user id (String)
- **Response**:
  - Redirects to `/auth/signin-admin` if the user is not an admin
  - Renders the `pages/admin-edit` view with the user to edit

### Edit User Admin

- **Route**: `POST /auth/edit-user/:id`
- **Function**: `editUserAdmin`
- **Request Params**:
  - `id`: user id (String)
- **Request Body**:
  - `username`: user username (String)
  - `password`: user password (String)
  - `role`: user role (String)
- **Response**:
  - Redirects to `/auth/admin-panel` if successful
  - Redirects to `/auth/edit-user/:id` if there is an error

### Delete User Admin

- **Route**: `GET /auth/delete-user/:id`
- **Function**: `deleteUserAdmin`
- **Request Params**:
  - `id`: user id (String)
- **Response**:
  - Redirects to `/auth/admin-panel` if successful
  - Redirects to `/auth/admin-panel` if there is an error

### Add User View

- **Route**: `GET /auth/add-admin`
- **Function**: `getAddUserView`
- **Response**:
  - Redirects to `/auth/signin-admin` if the user is not an admin
  - Renders the `pages/admin-add` view

### Add User Admin

- **Route**: `POST /auth/add-user`
- **Function**: `addUserAdmin`
- **Request Body**:
  - `username`: user username (String)
  - `password`: user password (String)
  - `role`: user role (String)
- **Response**:
  - Redirects to `/auth/admin-panel` if successful
  - Redirects to `/auth/add-admin` if there is an error
