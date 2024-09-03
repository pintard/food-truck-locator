import pytest
from flask import Flask
from flask.testing import FlaskClient
from utils.database import db
from routes.food_trucks import food_trucks_bp
from routes.favorites import favorites_bp
import mongomock
from bson.objectid import ObjectId


@pytest.fixture
def app():
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.register_blueprint(food_trucks_bp, url_prefix='/api')
    app.register_blueprint(favorites_bp, url_prefix='/api')

    with app.app_context():
        db.client = mongomock.MongoClient()
        db.foodtrucks = db.client.foodtrucks
        db.favorites = db.client.favorites
        yield app


@pytest.fixture
def client(app):
    return app.test_client()


def test_get_all_foodtrucks(client: FlaskClient):
    db.foodtrucks.insert_one({
        "_id": ObjectId("507f191e810c19729de860ea"),
        "Applicant": "Test Truck",
        "FacilityType": "Truck",
        "Address": "123 Test St",
        "FoodItems": "Pizza: Burgers",
        "Latitude": 37.7749,
        "Longitude": -122.4194
    })

    response = client.get('/api/foodtrucks')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]['Applicant'] == "Test Truck"


def test_add_to_favorites(client: FlaskClient):
    truck_id = db.foodtrucks.insert_one({
        "_id": ObjectId("507f191e810c19729de860ea"),
        "Applicant": "Test Truck",
        "FacilityType": "Truck",
        "Address": "123 Test St",
        "FoodItems": "Pizza: Burgers",
        "Latitude": 37.7749,
        "Longitude": -122.4194
    }).inserted_id

    response = client.post('/api/favorites', json={"truckId": str(truck_id)})
    assert response.status_code == 201
    assert response.get_json()['message'] == "Food truck added to favorites"

    assert db.favorites.count_documents({}) == 1


def test_remove_from_favorites(client: FlaskClient):
    truck_id = db.favorites.insert_one({
        "_id": ObjectId("507f191e810c19729de860ea"),
        "Applicant": "Test Truck",
        "FacilityType": "Truck",
        "Address": "123 Test St",
        "FoodItems": "Pizza: Burgers",
        "Latitude": 37.7749,
        "Longitude": -122.4194
    }).inserted_id

    response = client.delete(f'/api/favorites/{truck_id}')
    assert response.status_code == 200
    assert response.get_json(
    )['message'] == "Food truck removed from favorites"

    assert db.favorites.count_documents({}) == 0


def test_get_all_favorites(client: FlaskClient):
    db.favorites.insert_one({
        "_id": ObjectId("507f191e810c19729de860ea"),
        "Applicant": "Test Truck",
        "FacilityType": "Truck",
        "Address": "123 Test St",
        "FoodItems": "Pizza: Burgers",
        "Latitude": 37.7749,
        "Longitude": -122.4194
    })

    response = client.get('/api/favorites')
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 1
    assert data[0]['Applicant'] == "Test Truck"
