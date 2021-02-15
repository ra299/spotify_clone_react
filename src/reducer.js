export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    //we have to remove after finish code
    // token: "BQAFWmEqVMlzxMw_zLEbW7HXjBOTvuUwdCgjnqINlA0fNkqViOCKcWJABFHLcoy7vcTjS-7Zna7xZJWopNXFdYVA4YdlKXA5JWpY1V41n_lMGCMoYS_gvqADBpGQcQ9RZWG3-PJ5a-TxggMoQXUR9GeJHvHsu13Qiq_Ku6aWvSpvXL2FVYRB"
}

const reducer = (state, action) => {

    switch(action.type){
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        
        case "SET_TOKEN":
            return{
                ...state,
                token: action.token
            }

        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists,
            };

        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            }
            
        default:
            return state;
    }
}

export default reducer;

// reducer call in index.js