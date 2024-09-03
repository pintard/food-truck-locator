from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from utils.database import db

favorites_bp = Blueprint('favorites', __name__)


@favorites_bp.route('/favorites', methods=['GET'])
def get_favorites():
    favorites = list(db.favorites.find({}))
    for fav in favorites:
        fav['_id'] = str(fav['_id'])
    return jsonify(favorites)


@favorites_bp.route('/favorites', methods=['POST'])
def add_to_favorites():
    data = request.get_json()
    truck_id = data.get('truckId')

    if not truck_id:
        return jsonify({"error": "Truck ID is required"}), 400

    try:
        truck_id = ObjectId(truck_id)
    except Exception as e:
        return jsonify({"error": "Invalid Truck ID"}), 400

    existing_favorite = db.favorites.find_one({"_id": truck_id})

    if existing_favorite:
        return jsonify({"error": "Food truck already in favorites"}), 400

    food_truck = db.foodtrucks.find_one({"_id": truck_id})

    if not food_truck:
        return jsonify({"error": "Food truck not found"}), 404

    db.favorites.insert_one(food_truck)
    return jsonify({"message": "Food truck added to favorites", "id": str(food_truck['_id'])}), 201


@favorites_bp.route('/favorites/<id>', methods=['DELETE'])
def remove_from_favorites(id):
    try:
        result = db.favorites.delete_one({"_id": ObjectId(id)})

        if result.deleted_count == 0:
            return jsonify({"error": "Food truck not found in favorites"}), 404

        return jsonify({"message": "Food truck removed from favorites"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
