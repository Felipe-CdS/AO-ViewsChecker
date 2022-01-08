/*import  { changeApiCheck, data_array } from "./VideosData";

async function start() {
    await window.gapi.client.init({
        'apiKey': 'AIzaSyAvOO0P_wJDG1PnLtBek1GEf85OQ-MchRs',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
    }).then(function() {
        return window.gapi.client.youtube.videos.list({
            part: 'id, statistics, snippet',
            id: data_array
        });
    }).then(function(response) { 
        for(let i = 0; i < data_array.length; i++){
            window.sessionStorage.setItem(`${data_array[i]}.title`, response.result.items[i].snippet.title);
            window.sessionStorage.setItem(`${data_array[i]}.views`, response.result.items[i].statistics.viewCount);
            window.sessionStorage.setItem(`${data_array[i]}.thumb_src`, response.result.items[i].snippet.thumbnails.standard.url);
        }
    });
    changeApiCheck();
}

async function requestAPI(){
    window.gapi.load('client', start);
}

export default requestAPI;*/