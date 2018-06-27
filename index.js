const REDDIT_END = 'https://www.reddit.com/search.json';
const YOUTUBE_END = 'https://www.googleapis.com/youtube/v3/search'

function listenForSubmit(){
	$('.js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getRedditApiData(query, displayRedditResults);
		getYoutubeApiData(query, displayTubeResults);
		$.preloaderDo();

	})

}

$.preloaderDo = function(){
  $('.toSlide').toggleClass('open');
  goBackPls();
}

function goBackPls() {
	$('.toSlide').on('click', 'button', event => {
		$.preloaderDo();
	});
	console.log('goBackPls ran');
}

function getRedditApiData(searchTerm, callback){
	const settings = {
		url: REDDIT_END,
		data: {
			q:`${searchTerm}`,
		},
		//.dataType: 'JSON',
		type: 'GET',
		success: callback
	};
	$.ajax(settings);
	console.log('getRedditApiData ran');
	console.log(searchTerm);

}

function getYoutubeApiData(searchTerm, callback){
	const settings = {
		url: YOUTUBE_END,
		data: {
			q:`${searchTerm}`,
			part: `snippet`,
			key: `AIzaSyDRN8SRnzCVqZ2NQDYMsIMul_rMBPODfGg`,
		},
		dataType: 'JSON',
		type: 'GET',
		success: callback	
	};

	$.ajax(settings);
	console.log('getYoutubeApiData ran');
}

function displayRedditResults(data){
	const results = data.data.children.map((item, index) =>
	renderRedditResults(item)
	);
	$('.reddit-Results').html(results)

	console.log(data);
}

function displayTubeResults(data){
	const results = data.items.map((item, index) =>
		renderTubeResults(item)
	);
	$('.youtube-Results').html(results)
	console.log(data);
	console.log('displayTubeResults ran');
}

function renderRedditResults(result){
	return `
	<p> 
     <a target="_blank" href="https://www.reddit.com/${result.data.permalink}">
     <span class="js-search-data">${result.data.title}</span>
     </a>
     </p> 
     
	`;
}

function renderTubeResults(result){
	return `
	<p> 
    <a target="_blank" href="https://www.youtube.com/watch?v=${result.id.videoId}">
    <span class="js-search-data">${result.snippet.title}</span>
    <img src="${result.snippet.thumbnails.default.url}">
    </a>
    </p> 
  	`;
}



$(listenForSubmit);



