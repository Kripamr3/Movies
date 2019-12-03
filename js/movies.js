(function ()
{
   function SearchResults(){
       
}

SearchResults.prototype.loadSearchResults=function(){
var filteredMoviesRaw= localStorage.getItem('filtered-movies');
console.log(filteredMoviesRaw);
if(filteredMoviesRaw){
    var filteredMovies = JSON.parse(filteredMoviesRaw);
    if(filteredMovies.length>0){
        this.movieListing(filteredMovies);
    }
    else{
        document.getElementById('renderArea').innerHTML = "";
    }
    
}
}
SearchResults.prototype.movieListing=function(movies){
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

var SearchResultsInstance = new SearchResults();
SearchResultsInstance.loadSearchResults();

})();