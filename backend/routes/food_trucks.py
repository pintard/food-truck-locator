from flask import Blueprint, jsonify
from utils.database import db

food_trucks_bp = Blueprint('food_trucks', __name__)


@food_trucks_bp.route('/foodtrucks', methods=['GET'])
def get_foodtrucks():
    foodtrucks = list(db.foodtrucks.find({}))
    for truck in foodtrucks:
        truck['_id'] = str(truck['_id'])
    return jsonify(foodtrucks)
