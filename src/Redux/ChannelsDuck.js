import axios from 'axios'

// constantes
const dataInicial = {
    channels: []
}

const AG_URL = 'http://34.173.4.99:4000/';
const headers = {
  "content-type": "application/json",
  "apollo-require-preflight": "true"
};

const File = {
    id: " ",
    userId: " ",
    fileName: " ",
    fileType: " ",
    fileURL: " ",
    channelIds: [],
    date: " ",
};

const Message = {
    _id: " ",
    userId: " ",
    content : " ",
    edited: 0,
    channelId: " ",
    thread : " ",
    visible: 0,
    replies : [],
    reactions : " ",
    files : [],
    updated_at: Date,
    created_at: Date,
};

const Channel = {
    id: " ",
    name : " ",
    description : " ",
    members : [],
    admins : [],
    messages : [],
    files : [],
};

const User = {
    ID: " ",
    Names : " ",
    LastNames : " ",
    EMail : " ",
    PhoneNumber : " ",
    PhotoId : 0,
    Status : 0,
    Status : 0,
};


// types
const GET_CHANNELS = 'GET_CHANNELS'
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'

// reducer
export default function channelsReducer(state = dataInicial, action){
    switch(action.type){
        case GET_CHANNELS:
            return {...state, channels: action.payload}
        case GET_POKE_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
// actions

export const getChannels = () => async (dispatch, getState) => {
    const channelsQuery = {
        "query": `query Channels {
            channels {
                id
                name
                description
                members
                admins
                messages
                files
            }
        }`,
        "variables": {}
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: headers,
        data: channelsQuery
    }).then((response) => {
        dispatch({
            type: GET_CHANNELS,
            payload: response.data.data.channels
        })
        // return response.data.data.channels;
    }).catch((error) => {
        console.log(error);
    });
    // return response;
}

export const obtenerPokemonsAction = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon offset=0&limit=20')
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}