# Project: Country Search Application

![Project Banner](static/img/banner.png)


Welcome to the **Country Search Application** repository! This web-based application allows users to search for countries using a sleek, modern user interface that dynamically displays search results. Built using Spring Boot for the backend and jQuery, HTML, and CSS for the frontend, this project is a perfect example of combining powerful backend capabilities with a dynamic, user-friendly frontend.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Tree Structure](#project-tree-structure)
5. [Screenshots](#screenshots)
6. [Getting Started](#getting-started)
7. [API Endpoints](#api-endpoints)
8. [Contributing](#contributing)
9. [License](#license)

## Project Overview

The **Country Search Application** is designed to allow users to search for countries from a database using dynamic search functionality. Users can type into a search bar, and matching countries will be displayed in real-time. Each country is represented by a card that features a transparent flag of the country and its name. The application focuses on a minimalistic design, providing a great user experience with animations and a visually appealing interface.

## Features

- Dynamic search functionality with real-time display of results.
- Animated, sleek, and interactive UI.
- Transparent flags on each country card to enhance visual appeal.
- Backend implemented in Spring Boot with MySQL integration.
- Debounce feature to limit the frequency of backend queries for an optimal user experience.

## Technologies Used

- **Frontend**: HTML, CSS, jQuery, Bootstrap
- **Backend**: Spring Boot, Java
- **Database**: MySQL
- **Icons and Graphics**: FontAwesome, FlagCDN

## Project Tree Structure

Below is the directory structure of the project:

```
Country-Search-Application/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── org/
│   │   │       └── TechnicalChallenge/
│   │   │           └── workhuman/
│   │   │               ├── CountryController.java
│   │   │               ├── HomeController.java
│   │   │               └── WorkhumanApplication.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   └── styles.css
│   │       │   ├── js/
│   │       │   │   └── scripts.js
│   │       │   └── images/
│   │       └── templates/
│   │           └── index.html
├── build.gradle
└── README.md
```

## Screenshots

Add some visual appeal! Below are a few screenshots showcasing the application in action:

1. **Homepage with Search Box**:
   ![Homepage](insert-screenshot-url-here)

2. **Country Search Results**:
   ![Country Search](insert-screenshot-url-here)

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/your-username/Country-Search-Application.git
   ```

2. **Navigate to Project Directory**:

   ```sh
   cd Country-Search-Application
   ```

3. **Build the Project**:
   Ensure you have Java and Gradle installed, then run:

   ```sh
   ./gradlew build
   ```

4. **Set up the MySQL Database**:
   Create a MySQL database named `countrydb` and update the credentials in `application.properties`.

5. **Run the Application**:

   ```sh
   ./gradlew bootRun
   ```

6. **Access in Browser**:
   Open [http://localhost:8082](http://localhost:8091) in your browser to access the application.

## API Endpoints

- **GET** `/countries` - Retrieve a list of all countries.
- **GET** `/search?name={countryName}` - Search for countries by name.
- **GET** `/db-check` - Check the status of the database connection.

## Contributing

Contributions are welcome! Feel free to submit a Pull Request or raise issues for any bugs or feature suggestions.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgments

- **FlagCDN** for providing country flag images.
- **FontAwesome** for icons used in the search box UI.

---

Feel free to reach out if you have any questions or need further assistance!
