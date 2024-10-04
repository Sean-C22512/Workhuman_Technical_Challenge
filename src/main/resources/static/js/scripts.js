$(document).ready(function () {
    // Load all countries when the page loads
    loadAllCountries();

    // Add focus and blur animations for the search box to provide visual feedback
    $("#searchInput").focus(function () {
        $(".search-box").addClass("border-searching");
        $(".search-icon").addClass("si-rotate");
    });

    // Remove animations when focus is lost from the search box
    $("#searchInput").blur(function () {
        $(".search-box").removeClass("border-searching");
        $(".search-icon").removeClass("si-rotate");
    });

    // Handle input changes and update the go-icon based on whether text is present
    $("#searchInput").keyup(function () {
        if ($(this).val().length > 0) {
            $(".go-icon").addClass("go-in");
        } else {
            $(".go-icon").removeClass("go-in");
        }
    });

    // Click handler for the search button icon
    $('.go-icon').on('click', function () {
        performSearch();
    });

    // Debounce function to control frequency of input processing to improve efficiency
    function debounce(func, delay) {
        let debounceTimer;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Keyup event handler for dynamic search with debounce to avoid excess backend calls
    $('#searchInput').on('keyup', debounce(function () {
        performSearch();
    }, 300));

    /**
     * Function to load all countries from the backend when the page loads.
     */
    function loadAllCountries() {
        // Show loading indicator for initial load
        $('.loading').show();
        $('#results').empty();

        // Perform AJAX request to get all countries
        $.ajax({
            url: `http://localhost:8091/countries`,  // Backend endpoint for fetching all countries
            method: 'GET',
            success: function (data) {
                $('.loading').hide();  // Hide loading indicator when request is successful
                if (data.length === 0) {
                    $('#results').append('<p>No countries found.</p>');
                } else {
                    renderCountries(data);
                }
            },
            error: function () {
                $('.loading').hide();  // Hide loading indicator in case of error
                $('#results').append('<p>Something went wrong, please try again.</p>');
            }
        });
    }

    /**
     * Function to perform the search for countries based on the user's input.
     */
    function performSearch() {
        const searchQuery = $('#searchInput').val().trim().toLowerCase();
        if (searchQuery === "") {
            loadAllCountries();  // Reload all countries if the search query is empty
            return;
        }

        // Clear previous results without showing the loading spinner immediately
        $('#results').empty();

        // Set a timer to show the loading spinner only if the request takes longer than expected
        let loadingTimer = setTimeout(() => {
            $('.loading').show();
        }, 300);  // Loading spinner delay set to 300ms

        // Perform AJAX request to get countries matching the search query
        $.ajax({
            url: `http://localhost:8091/search?name=${searchQuery}`,  // Backend endpoint for searching countries
            method: 'GET',
            success: function (data) {
                clearTimeout(loadingTimer);  // Clear loading timer on success
                $('.loading').hide();  // Hide loading spinner

                if (data.length === 0) {
                    $('#results').append('<p>No countries found.</p>');
                } else {
                    renderCountries(data, searchQuery);  // Render the countries found
                }
            },
            error: function () {
                clearTimeout(loadingTimer);  // Clear loading timer on error
                $('.loading').hide();  // Hide loading spinner
                $('#results').append('<p>Something went wrong, please try again.</p>');
            }
        });
    }

    /**
     * Function to render countries using Bootstrap cards, with flags and highlighting of search text.
     *
     * @param {Array} data - Array of country data from the backend.
     * @param {string} [highlight=""] - The search term to highlight in country names.
     */
    function renderCountries(data, highlight = "") {
        $('#results').empty();  // Clear existing results

        data.forEach(function (country, index) {
            // Highlight the search term in the country name if applicable
            const highlightedName = highlightText(country.name, highlight);

            // Get country code for flag image using a mapping function
            const countryCode = getCountryCode(country.name.toLowerCase());
            const flagImageUrl = `https://flagcdn.com/${countryCode}.svg`;

            // Create the country card element with an image and country name
            const countryElement = $(`
                <div class="card mb-3 country-result" data-country="${country.name}">
                    <div class="card-body" style="position: relative;">
                        <img src="${flagImageUrl}" alt="${country.name} Flag" class="country-flag">
                        <h5 class="card-title country-name">${highlightedName}</h5>
                    </div>
                </div>
            `);

            // Append the country element to the results container
            $('#results').append(countryElement);

            // Add a delay for each card's visibility for a staggered animation effect
            setTimeout(() => {
                countryElement.addClass('visible');
            }, 100 * index);
        });
    }

    /**
     * Function to highlight the search text within the country name.
     *
     * @param {string} text - The country name.
     * @param {string} highlight - The text to be highlighted.
     * @return {string} - The country name with highlighted text.
     */
    function highlightText(text, highlight) {
        if (!highlight) return text;
        const regex = new RegExp(`(${highlight})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    /**
     * Function to get the country code (ISO-2) for a given country name.
     *
     * @param {string} countryName - The name of the country in lowercase.
     * @return {string} - The ISO-2 country code used for flag images.
     */
    function getCountryCode(countryName) {
        const countryCodes = {
            "albania": "al",
            "andorra": "ad",
            "australia": "au",
            "brazil": "br",
            "belgium": "be",
            "canada": "ca",
            "china": "cn",
            "france": "fr",
            "germany": "de",
            "india": "in",
            "indonesia": "id",
            "ireland": "ie",
            "italy": "it",
            "japan": "jp",
            "kenya": "ke",
            "luxembourg": "lu",
            "mexico": "mx",
            "new zealand": "nz",
            "nigeria": "ng",
            "portugal": "pt",
            "russia": "ru",
            "south africa": "za",
            "south korea": "kr",
            "spain": "es",
            "sweden": "se",
            "thailand": "th",
            "ukraine": "ua",
            "united kingdom": "gb",
            "united states of america": "us",
            "vietnam": "vn",
            "zambia": "zm"
        };
        return countryCodes[countryName] || "unknown";  // Default to "unknown" if the country code is not found
    }
});
