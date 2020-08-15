$("#searchbtn").on("click", function () {
    clear();
    var citySearch = $("#citySearchInput").val();
    var apiKey = "5fc8342540b36c6541d1d1659b328759";
    var queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + apiKey;
    var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=" + apiKey;

    $.ajax({
        url: queryURLCurrent,
        method: "GET"
    })
        .then(function (response) {

            var mainCard = $("<div>").attr("class", "card bg-light");
            $("#forecasts").append(mainCard);

            var mainCardInside = $("<div>").attr("class", "row ml-4");
            mainCard.append(mainCardInside);

            var city = $("<h3>" + citySearch + "<br>" + moment().format("LL") + "<h3>");
            city.attr("class", "col-md-12 mt-4");
            mainCardInside.append(city);

            var icon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            var img = $("<img>").attr("class", "col-md-4").attr("src", icon);
            mainCardInside.append(img);

            var statsDiv = $("<div>").attr("class", "col-md-8")
            var cardBody = $("<div>").attr("class", "card-body");
            statsDiv.append(cardBody);

            cardBody.append($("<p>").attr("class", "card-text").text("Temperature: " + response.main.temp + "\u00B0 F"));
            cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
            cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));


            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var queryURLUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

            $.ajax({
                url: queryURLUv,
                method: "GET"
            })
                .then(function (response2) {

                    var uv = parseFloat(response2.value);
                    var showUV = $("<p>").attr("class", "card-text").text("UV: ");

                    if (uv >= 0 && uv <= 2) {
                        var uvColor = 'green';
                        showUV.append($("<span>").attr("class", "uv").attr("style", "background-color:" + uvColor).text(uv));
                    }
                    else if (uv >= 3 && uv <= 5) {
                        var uvColor = 'yellow';
                        showUV.append($("<span>").attr("class", "uv").attr("style", "background-color:" + uvColor).text(uv));
                    }
                    else if (uv >= 6 && uv <= 8) {
                        var uvColor = 'orange';
                        showUV.append($("<span>").attr("class", "uv").attr("style", "background-color:" + uvColor).text(uv));
                    }
                    else if (uv >= 9 && uv <= 10) {
                        var uvColor = 'red';
                        showUV.append($("<span>").attr("class", "uv").attr("style", "background-color:" + uvColor).css({ 'color': 'white' }).text(uv));
                    }
                    else if (uv > 10) {
                        var uvColor = 'violet';
                        showUV.append($("<span>").attr("class", "uv").attr("style", "background-color:" + uvColor).text(uv));
                    }

                    cardBody.append(showUV);
                })

            mainCardInside.append(statsDiv);



        });
    $.ajax({
        url: queryURLForecast,
        method: "GET"
    })
        .then(function (response3) {
            console.log(response3);
        })

});

function clear() {
    $("#forecasts").empty();
}


