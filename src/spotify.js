// https://developer.spotify.com/
// document/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/"; 
const clientId = "e8c5019c30fd44a8b3691d24dbdeb260";

 

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
]

export const getTokenFromUrl =  () => {
    return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
        //#accessToken=mySuperSecretkey&name=rahul
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1])
        return initial;
    }, {})
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dailog=true`;