package org.TechnicalChallenge.workhuman;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * RestController for managing country-related operations such as
 * fetching all countries, checking database connectivity, and searching for countries.
 */
@RestController
public class CountryController {

    // Inject JdbcTemplate to interact with the database.
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Endpoint to check if the database connection is successful.
     *
     * @return A success message if the connection is established, or an error message if it fails.
     */
    @GetMapping("/db-check")
    public String checkDatabaseConnection() {
        try {
            // Execute a simple query to verify the database connection.
            String sql = "SELECT 1";
            jdbcTemplate.execute(sql);
            return "Database connection is successful!";
        } catch (Exception e) {
            // Return the error message in case of a failure.
            return "Error connecting to the database: " + e.getMessage();
        }
    }

    /**
     * Endpoint to fetch the list of all countries from the database.
     *
     * @return A list of maps where each map represents a country and its details.
     */
    @GetMapping("/countries")
    public List<Map<String, Object>> getAllCountries() {
        // Query to select all countries from the "countries" table.
        String sql = "SELECT * FROM countries";
        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Endpoint to search for countries based on the provided name or part of the name.
     *
     * @param name The name or partial name of the country to search for.
     * @return A list of maps where each map represents a country matching the search criteria.
     */
    @GetMapping("/search")
    public List<Map<String, Object>> searchCountries(@RequestParam("name") String name) {
        // Query to search for countries whose name contains the given input (case-insensitive).
        String sql = "SELECT * FROM countries WHERE name LIKE ?";
        String searchPattern = "%" + name + "%";
        return jdbcTemplate.queryForList(sql, new Object[]{searchPattern});
    }
}
