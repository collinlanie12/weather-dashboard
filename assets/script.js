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

            var city = $("<h3>" + citySearch + "<br>" + moment().format("LL") + "</h3>");
            city.attr("class", "col-md-12 mt-4");
            mainCardInside.append(city);

            var imgIcon = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
            var img = $("<img>").attr("class", "col-md-4").attr("src", imgIcon);
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
            var divForCards = $("<div>").attr("class", "row five-days mt-4");
            $("#forecasts").append(divForCards);

            var dayTag = $("<h3>5-Day Forecast:</h3>");
            dayTag.attr("class", "col-md-12");
            divForCards.append(dayTag);

            for (var i = 0; i < response3.list.length; i++) {
                if (response3.list[i].dt_txt.indexOf("09:00:00") !== -1) {
                    console.log(response3.list[i]);
                    var newCards = $("<div>").attr("class", "col-md-2 ml-3 mt-3 card bg-primary text-white")
                    var cardBody2 = $("<div>").attr("class", "card-body");
                    var imgIcon = "http://openweathermap.org/img/w/" + response3.list[i].weather[0].icon + ".png";
                    var img = $("<img>").attr("src", imgIcon);

                    cardBody2.append($("<p>" + moment.unix(response3.list[i].dt).format("LL") + "</p>").css({ 'font-size': '15px' }));
                    cardBody2.append(img);

                    cardBody2.append($("<p>").attr("class", "card-text").text("Temp: " + response3.list[i].main.temp + "\u00B0 F"));
                    cardBody2.append($("<p>").attr("class", "card-text").text("Humidity: " + response3.list[i].main.humidity + "%").css({ 'font-size': '15px' }));
                    newCards.append(cardBody2);
                    divForCards.append(newCards);
                }
            }


        })

});

function clear() {
    $("#forecasts").empty();
}


