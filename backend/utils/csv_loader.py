import csv


def load_csv_data():
    data = []
    with open('data/Mobile_Food_Facility_Permit.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            data.append(row)
    return data
