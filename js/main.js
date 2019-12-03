(function () {

    function Movies() {
        var searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input',function(event) {
            console.log("search key pressed")
            var searchText = event.target.value;
            var availableMoviesRaw = localStorage.getItem('popular-movies');
            console.log(availableMovies)
            if (availableMoviesRaw) {
                var availableMovies = JSON.parse(availableMoviesRaw).results;
                var filteredMovies = availableMovies.filter(function(_movie){
                    return(_movie.title.toLowerCase().indexOf(searchText.toLowerCase()) >-1);
                });
                if (filteredMovies.length > 0) {
                    var searchResults=JSON.stringify(filteredMovies);
                    localStorage.setItem('filtered-movies', searchResults);
                }
            }
        }.bind(this))
    }

    
    Movies.prototype.loadPopularMovies = function() {
        // var flag = 0;
        // var url;
        // if (flag == 1){
        //      url = "https://api.themoviedb.org/3/movie/top_rated?api_key=06dcefc4c6268cb53b82f76560368636&language=en-US&page=1";
        // }
        // else{
        //      url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=06dcefc4c6268cb53b82f76560368636";
        // }
        const xhr = new XMLHttpRequest(),
            method = "GET",
            url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=06dcefc4c6268cb53b82f76560368636";
            
            
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            // debugger;
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                 //console.log(xhr.responseText);
                var rawResponseData = xhr.responseText;
                console.log(rawResponseData);
                localStorage.clear();
                localStorage.setItem('popular-movies',rawResponseData);
               // console.log(xhr.responseText);
                var jsonData = JSON.parse(rawResponseData);
                this.movieListing(jsonData.results);
            }
        }.bind(this);
        xhr.send();
    }

    Movies.prototype.movieListing = function(movies){
        console.log("MOVED TO MOVIELISTING");
        var totalMovies = movies.length;
        var renderArea = document.getElementById('renderArea');
        var row = document.createElement('div');
        row.className = "row";
        var mytest =  `<h2>${totalMovies}</h2>`;

        for(var i=0; i<totalMovies; i++){
            // console.log('movies --> ', movies);
            renderArea.innerHTML = "";
            var movieContainer = document.createElement('div');
            movieContainer.className = "card col-md-4";
            movieContainer.style.width = "18rem";

            var cardBody = document.createElement('div');

            var cardTitle = document.createElement('h5');
            cardTitle.innerText = movies[i]["title"];

            var cardText = document.createElement('p');
            cardText.innerText = movies[i]["overview"];

            var imgTag = document.createElement('img')
            imgTag.src = "https://image.tmdb.org/t/p/w500/" + movies[i]["poster_path"];
            imgTag.width = '100';
            imgTag.height = '100';

            
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(imgTag);
            cardBody.appendChild(cardText);

            movieContainer.appendChild(cardBody)
            row.appendChild(movieContainer);
            // movieContainer.innerText = movies[i]["title"];
            renderArea.appendChild(row);
        }
    }
    var movieInstance = new Movies();
    movieInstance.loadPopularMovies();
    
    // var favMovies = document.getElementById("favMovies");
    // favMovies.addEventListener("click", function(){

    //     flag = 1;
    //     movieInstance.loadPopularMovies();      
    // });

    // var home = document.getElementById("homeMovies");
    // home.addEventListener("click", function(){
    //    // console.log("CLICKED ON HOME PAGE")
    //     flag = 0;
    //     movieInstance.loadPopularMovies();
    // });
})();
