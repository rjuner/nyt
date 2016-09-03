// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Geocoder API
var nytAPI = "cc71d22e5bab4df6b94afdb29fe8b737";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	// This function serves our purpose of running the query to geolocate. 
	runQuery: function(location){

		console.log(location);

		//Figure out the geolocation
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + location + "&begin_date=" + 2015 + "0101&end_date=" + 2016 + "0101";

		// var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(response){

				console.log(response);

				// console.log("DATE ARTICLE WAS PUBLISHED:  ")
				// console.log(response.data.response.docs[0].pub_date);

				// console.log("ARTICLE SNIPPET:  ")
				//  console.log(response.data.response.docs[0].lead_paragraph);

				var articlesfromNYT = [];

				for(var i = 0; i < 5; i++){

					var oneArticle = {title:response.data.response.docs[i].headline.main, date:response.data.response.docs[i].pub_date, url: response.data.response.docs[i].web_url};

					// oneArticle.push(response.data.response.docs[i].headline.main);
					// oneArticle.push(response.data.response.docs[i].pub_date);
					// oneArticle.push(response.data.response.docs[i].web_url);

					articlesfromNYT.push(oneArticle);
				}

				return articlesfromNYT;
		})

	},

	// This function hits our own server to retrieve the record of query results
	getHistory: function(){

		return axios.get('/api')
			.then(function(response){

				console.log(response);
				return response;
			});
	},

	// This function posts new searches to our database.
	postHistory: function(location){

		return axios.post('/api', {location: location})
			.then(function(results){

				console.log("Posted to MongoDB");

				console.log("THIS IS FROM RESULTS: ")
				console.log(results);
				return(results);
			})
	}

}


// We export the helpers function 
module.exports = helpers;