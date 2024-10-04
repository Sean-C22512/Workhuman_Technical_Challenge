import mysql.connector

# Set up the database connection
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",       # Your MySQL username
    password="Bqqjtfrs!",   # Your MySQL password
    database="countrydb"  # Your database name
)

cursor = db_connection.cursor()

# Create the table if it doesn't already exist
cursor.execute("""
    CREATE TABLE IF NOT EXISTS countries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    )
""")

# List of countries to insert
countries = [
    "Albania", "Andorra", "Australia", "Brazil", "Belgium",
    "Canada", "China", "France", "Germany", "India", "Indonesia",
    "Ireland", "Italy", "Japan", "Kenya", "Luxembourg", "Mexico",
    "New Zealand", "Nigeria", "Portugal", "Russia", "South Africa",
    "South Korea", "Spain", "Sweden", "Thailand", "Ukraine",
    "United Kingdom", "United States of America", "Vietnam", "Zambia"
]

# Insert the countries into the table
for country in countries:
    cursor.execute("INSERT INTO countries (name) VALUES (%s)", (country,))

# Commit the transaction
db_connection.commit()

# Close the connection
cursor.close()
db_connection.close()

print("Countries inserted successfully.")
