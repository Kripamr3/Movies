( function() {
    function getMovies(){
        var xhr = new XMLHttpRequest,
            method = GET,
            url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=06dcefc4c6268cb53b82f76560368636";

            xhr.open(method,url,true);
            xhr.onreadystatechange = function(){
                if(xhr.status === 200 && XMLHttpRequest.DONE)
                {
                    var rawData = xhr.responseText;
                    var jsonData = JSON.parse(rawData);
                    movieListing(jsonData.results);
                }
            }
    }

    function movieListing(movies)
    {
        var totalMovies = movies.length;
    }
})