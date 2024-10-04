$(document).ready(function () {
    // Load all countries when the page loads
    loadAllCountries();

    // Search button click handler
    $('#searchButton').on('click', function () {
        performSearch();
    });

    // Enter key press handler for input field
    $('#searchInput').on('keypress', function (e) {
        if (e.which === 13) {
            performSearch();
        }
    });

    function loadAllCountries() {
        // Show loading indicator
        $('.loading').show();
        $('#results').empty();

        // Fetch all countries from the backend
        $.ajax({
            url: `http://localhost:8091/countries`,  // Updated to include full URL
            method: 'GET',
            success: function (data) {
                $('.loading').hide();
                if (data.length === 0) {
                    $('#results').append('<p>No countries found.</p>');
                } else {
                    data.forEach(function (country) {
                        $('#results').append(`
                            <div class="country-result">
                                <p>${country.name}</p>
                            </div>
                        `);
                    });
                }
            },
            error: function () {
                $('.loading').hide();
                $('#results').append('<p>Something went wrong, please try again.</p>');
            }
        });
    }

    function performSearch() {
        const searchQuery = $('#searchInput').val().trim();
        if (searchQuery === "") return;

        // Show loading indicator and clear previous results
        $('.loading').show();
        $('#results').empty();
        $('#searchButton').attr('disabled', true);

        // Fetch data from the backend for the search query
        $.ajax({
            url: `http://localhost:8091/search?name=${searchQuery}`,  // Updated to include full URL
            method: 'GET',
            success: function (data) {
                $('.loading').hide();
                $('#searchButton').attr('disabled', false);

                if (data.length === 0) {
                    $('#results').append('<p>No countries found.</p>');
                } else {
                    data.forEach(function (country) {
                        $('#results').append(`
                            <div class="country-result">
                                <p>${country.name}</p>
                            </div>
                        `);
                    });
                }
            },
            error: function () {
                $('.loading').hide();
                $('#searchButton').attr('disabled', false);
                $('#results').append('<p>Something went wrong, please try again.</p>');
            }
        });
    }
});
