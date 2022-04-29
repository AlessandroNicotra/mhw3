const form = document.querySelector('form')
form.addEventListener('submit', search)
const iscr_b = document.querySelector('button.iscriviti')
iscr_b.addEventListener('click', authenticate)
const iscr_t = document.querySelector('a#iscritto')

let ch_id

function search(event){
    event.preventDefault()
    const titolo = document.querySelector('#titolo')
    const anno = document.querySelector('#anno')
    const plot = document.querySelector('#plot')
    const image = document.querySelector('#locandina')
    const input = document.querySelector('#t')
    const iframe = document.querySelector('iframe')
    if(input.value === ''){
        titolo.textContent = 'Inserisci un titolo'
    }
    else{
        let rest_url = 'http://www.omdbapi.com/?apikey=870862df&t=' + input.value


        fetch(rest_url).then((result)=>{
            return result.json();
        }).then((data)=>{
            if(data.Response === 'True'){
                titolo.textContent = data.Title
                anno.textContent = data.Year
                plot.textContent = data.Plot
                image.style.display = 'block'
                image.src = data.Poster

                iscr_b.style.display = 'block'

                let y_url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + data.Title + '%20' + data.Year +'%20trailer&key=AIzaSyCoQz4twkrUHk-o6SAJQk87XlHpkg3A6K8'

                fetch(y_url).then((y_result)=>{
                    return y_result.json();
                }).then((y_data)=>{
                    iframe.src = 'https://www.youtube-nocookie.com/embed/' + y_data.items[0].id.videoId
                    ch_id = y_data.items[0].snippet.channelId
                })
            }
            else if (data.Response === 'False'){
                titolo.textContent = data.Error
                iframe.src = ''
                anno.textContent = ''
                plot.textContent = ''
                image.style.display = 'none'
                image.src = ''

                iscr_b.style.display = 'none'
            }
        })
    }
}

function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
        .then(function() {
            loadClient()
            },
            function(err) { console.error("Error signing in", err); });
}
function loadClient() {
    gapi.client.setApiKey("AIzaSyCoQz4twkrUHk-o6SAJQk87XlHpkg3A6K8");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() {
            execute()
            },
            function(err) { console.error("Error loading GAPI client for API", err); });
}

function execute() {
    return gapi.client.youtube.subscriptions.insert({
        "part": [
            "snippet"
        ],
        "resource": {
            "snippet": {
                "resourceId": {
                    "kind": "youtube#channel",
                    "channelId": ch_id
                }
            }
        }
    })
        .then(function(response) {

                iscr_t.textContent = 'ISCRITTO'

            },
            function(err) {
                console.error("Execute error", err);
                iscr_t.textContent = 'ERRORE\n' + err.result.error.message
            });
}
gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "648101982055-l0ft4m88n7pu7b83o7e401mb0r4i5pm5"});
});
