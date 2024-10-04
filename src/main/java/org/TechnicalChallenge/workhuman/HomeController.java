package org.TechnicalChallenge.workhuman;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * The HomeController class is responsible for handling HTTP requests
 * that are related to loading the homepage of the application.
 * It serves as a basic controller that directs requests to the appropriate view.
 */
@Controller
public class HomeController {

    /**
     * Handles GET requests for the root URL ("/").
     *
     * @return The name of the HTML template ("index") to be rendered.
     * This maps to an HTML file named "index.html" located in `src/main/resources/templates`.
     */
    @GetMapping("/")
    public String home() {
        return "index";  // This will load index.html from the templates directory.
    }
}
