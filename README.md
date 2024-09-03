# Food Truck Locator

This project is a containerized full-stack web application that allows users to locate food trucks in the San Francisco area using a map-based interface. Users can search for food trucks, view details about each truck, and save their favorite trucks for future reference. The application supports light and dark themes.

## Table of Contents

- [Software Features](#software-features)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Accessing MongoDB with Compass](#accessing-mongodb-with-compass)
- [Accessing the Application](#accessing-the-application)
- [Making API Calls](#making-api-calls)
- [Testing](#testing)

## Software Features

### Technical Features

- **Containerization**: The entire application is containerized and composed for quick setup, environment consistency, and quick deployability.
- **Mongodb**: Utilizes MongoDB as the primary database, for quick setup and efficient data storage and retrieval.
- **React, Typescript, and Tailwind**: Implements a responsive and interactive front-end using React with TypeScript for type safety and Tailwind CSS for utility-first styling.
- **Python and Flask**: Data is preloaded into database with python and Mongodb if it doesn't already exist. API is powered by Flask, for its lightweight setup and flexible scalability.

### Non-Technical Features

- **Interactive Map**: Displays food trucks on a map of San Francisco, with options to zoom and pan.
- **Search and Filter**: Users can search for food trucks by name or the food they offer and filter by facility type.
- **Favorites**: Users can save their favorite food trucks and manage their list of favorites.
- **Responsive Design**: The application is responsive and works on various screen sizes.
- **Dark Mode**: Users can toggle between light and dark themes.

![Light Theme](./misc/light_theme.png)
![Dark Theme](./misc/dark_theme.png)

## Installation

### Prerequisites

**Docker**: Make sure Docker and Docker Compose are installed on your machine. You can download it at: <https://www.docker.com/products/docker-desktop/>

### Steps

1. **Clone the Repository**

```bash
git clone https://gitlab.com/pintard/food-truck-locator.git
cd food-truck-locator
```

2. **Build and Start the Docker Containers**

```bash
docker-compose up --build
```

This command will build and start the frontend, backend, and MongoDB containers.

## Running the Application

After running `docker-compose up --build`, your application should be running on the following:

- Frontend (React): <http://localhost:3000>
- Backend (Flask API): <http://localhost:5001>

You can stop the application using:

```bash
docker-compose down --volumes
```

## Accessing MongoDB with Compass

1. Download MongoDB Compass at: <https://downloads.mongodb.com/compass/mongodb-compass-1.43.6-win32-x64.exe>
1. Open MongoDB Compass.
1. Connect to MongoDB using the following connection string: `mongodb://root:password@localhost:27017`.
1. Navigate to `Databases > foodtrucks > foodtrucks` or `Databases > foodtrucks > favorites`.

Here, you can view, edit, and manage the data directly from MongoDB Compass.

## Accessing the Application

- Frontend (React): Visit <http://localhost:3000> in your web browser.
- Backend (Flask API): The API is accessible at <http://localhost:5001>.

## Making API Calls

The base API domain is `http://localhost:5001`

### Foodtrucks

1. **Get All Food Trucks**

- **Endpoint**: `GET /api/foodtrucks`
- **Description**: Fetch all the existing food trucks.
- **Example Request**: `curl http://localhost:5001/api/foodtrucks`

### Favorites

2. **Get All Favorites**

- **Endpoint**: `GET /api/favorites`
- **Description**: Fetch all favorites.
- **Example Request**: `curl http://localhost:5000/api/favorites`

3. **Add Favorite**

- **Endpoint**: `POST /api/favorites`
- **Description**: Add a new favorite
- **Example Request**:

```bash
curl -X POST http://localhost:5000/api/favorite \
  -H "Content-Type: application/json" \
  -d '{"truckId":<TRUCK_ID>}'
```

4. **Remove Favorite**

- **Endpoint**: `DELETE /api/favorite/:id`
- **Description**: Delete a favorite by its ID.
- **Example Request**: `curl -X DELETE http://localhost:5000/api/favorite/<id>`

## Testing

To test the application install the dependencies on your local machine:

### Backend

```bash
cd backend
pip3 install pymongo Flask flask-cors pytest mongomock Flask-Testing
pytest tests/test_app.py
```

### Frontend

```bash
cd frontend
npm i
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
