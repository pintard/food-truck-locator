from flask import Flask
from flask_cors import CORS
from logger import Logger
from utils.database import initialize_database
from routes.food_trucks import food_trucks_bp
from routes.favorites import favorites_bp

logger = Logger().get_logger()

app = Flask(__name__)
CORS(app)

app.register_blueprint(food_trucks_bp, url_prefix='/api')
app.register_blueprint(favorites_bp, url_prefix='/api')

if __name__ == '__main__':
    port = 5000
    logger.info(f"Starting Flask application on port {port}...")
    initialize_database()
    app.run(host='0.0.0.0', port=port, debug=True, use_reloader=True)
