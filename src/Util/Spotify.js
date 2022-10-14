let accessToken;
const id = "<insert clientid here>"
const redirect_uri = 'http://localhost:3000/'

const Spotify = {
    getAccessToken() {
        if (accessToken) { return accessToken }


        let accessTokenPattern = window.location.href.match(/access_token=([^&]*)/)
        let expirationPattern = window.location.href.match(/expires_in=([^&]*)/)

        if (accessTokenPattern && expirationPattern) {
            window.setTimeout(() => accessTokenPattern[1] = '', expirationPattern[1] * 1000)
            window.history.pushState('Access Token', null, '/')
            accessToken = accessTokenPattern[1]
            return accessToken
        } else {
            let scope = 'playlist-modify-public';
            let url = 'https://accounts.spotify.com/authorize';
            url += '?response_type=token';
            url += '&client_id=' + encodeURIComponent(id);
            url += '&scope=' + encodeURIComponent(scope);
            url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

            window.location = url
        }
    },
    search(term) {

        const url = `https://api.spotify.com/v1/search?type=track&q=${term}`
        let token = this.getAccessToken()
        return fetch(url, { headers: { Authorization: `Bearer ${token}`, 'Content-type': 'application/json' } })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error(`Search Request failed! >log< ${JSON.stringify(response)}`);
            }, networkError => {
                console.log(networkError.message)
            }).then(json => {

                if (!json.tracks) {
                    return []
                }

                const { tracks } = json

                return tracks
            }).then(tracks => tracks.items.map(track => {

                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            }))
    },
    async savePlaylist(name, trackURIs) {




        let userid;
        let playlistId;

        if (!name && !trackURIs) {
            return playlistId;
        }


        let token = this.getAccessToken()
        let headers = { Authorization: `Bearer ${token}` }
        const userUrl = `https://api.spotify.com/v1/me`


        try {

            let response = await fetch(userUrl, { headers })
            if (response.ok) {
                userid = await response.json().then(json => {
                    const { id } = json

                    return id
                })
            } else {
                throw new Error('Create Userid Request Failed')
            }
        } catch (error) {
            console.log(error.message)
        }





        const playlistUrl = `https://api.spotify.com/v1/users/${userid}/playlists`

        try {

            let response = await fetch(playlistUrl, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    public: true
                })
            })

            if (response.ok) {
                playlistId = await response.json().then(json => {
                    const { id } = json
                    return id
                })
            } else {
                throw new Error('Create Playlist Request Failed')
            }

        } catch (error) {
            console.log(error)
        }



        const updatePlaylistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

        try {


            let response = await fetch(updatePlaylistUrl, { headers, method: 'POST', body: JSON.stringify(trackURIs) })

            if (response.ok) {
                playlistId = await response.json().then(json => {
                    const { id } = json

                    return id
                })
            } else {
                throw new Error('Update Playlist Request Failed!')

            }

        } catch (error) {
            console.error(error.message)
        }

        return playlistId


    }


}





export default Spotify

// function generateRandomString(length) {
//     let text = '';
//     let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//     for (var i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }