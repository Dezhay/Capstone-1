const TWITTER_END = 'https://www.twitter.com/search';
const YOUTUBE_END = 'https://www.googleapis.com/youtube/v3/search'

function listenForSubmit(){
		$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getTwitterApiData(query, displayTweetResults);
		getYoutubeApiData(query, displayTubeResults);
	})

}

function getTwitterApiData(){

}

function getYoutubeApiData(){

}

function renderResults(){

}

function displayTweetResults(){

}

function displayTubeResults(){
	
}

$(listenForSubmit);