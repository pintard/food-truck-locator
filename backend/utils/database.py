from pymongo import MongoClient
from config import config
from logger import Logger

logger = Logger().get_logger()

client = MongoClient(config.MONGO_URI)
db = client.foodtrucks


def initialize_database():
    try:
        client.server_info()
        logger.info("Successfully connected to MongoDB.")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise e

    collection = db.foodtrucks
    if collection.count_documents({}) == 0:
        from utils.csv_loader import load_csv_data
        data = load_csv_data()
        collection.insert_many(data)
        print("Data loaded into MongoDB")
    else:
        print("Data already exists in MongoDB")
