// gifTastic

$(document).ready(function () {

    var topics = ["Arrested Development", "The Matrix", "Sean Bean", "Avengers", "Groot", "Cats", "cardboard boxes", "If I Fits I Sits", "Tobias Funke", "bees?"];

    function displayGifs() {

        var singleTopic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            singleTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                var results = response.data;
                for (var i = 0; i < results.length; i++) {

                    var imgDiv = $("<div class='gif-wrapper card'>");
                    var title = $("<h2>").addClass("card-title").text(results[i].title);

                    var p = $("<p>").addClass("card-text").text("Rating: " + results[i].rating.toUpperCase());
                    imgDiv.append(p);

                    var gifImage = $("<img>").attr({
                        "src": results[i].images.fixed_height_still.url,
                        "class": "gif card-img-top",
                        "data-state": "still",
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url
                    });


                    imgDiv.append(gifImage, title, p);

                    $("#gifs-appear-here").prepend(imgDiv);
                }
                pauseGifs();
            });

    }

    // Function for displaying buttons 
    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("buttons");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons-view").append(a);

        }
    }

    // Function to pause gifs
    function pauseGifs() {

        $(".gif").on("click", function () {
            var state = $(this).attr("data-state");

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    }

    function addButtons() {
        $("#add-buttons").on("click", function (event) {
            event.preventDefault();

            var singleTopic = $("#buttons-input").val().trim();

            if (singleTopic !== "") {
                topics.push(singleTopic);
            }

            renderButtons();
            $("#buttons-input").val("");

        });
    }

    $(document).on("click", ".buttons", displayGifs);

    addButtons();
    renderButtons();
});














