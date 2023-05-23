import axios from 'axios'

// constantes
const dataInicial = {
    messages: [],
    status: ""
}

const AG_URL = process.env.API_GATEWAY_URL || 'http://34.173.4.99:4000/'
const headers = {
  "content-type": "application/json",
  "apollo-require-preflight": "true"
};

// types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const GET_MESSAGES = 'GET_MESSAGES'
const CREATE_MESSAGE = 'CREATE_MESSAGE'

// reducer
export default function messagesReducer(state = dataInicial, action){
    switch(action.type){
        case CREATE_MESSAGE:
            return {...state, status: action.payload}
        case GET_MESSAGES:
            return {...state, messages: action.payload}
        case GET_POKE_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
// actions

export const getMessages = (channelId, limit) => async (dispatch, getState) => {
    console.log("gettingMessages")
    console.log(channelId)
    const lastMessagesQuery = {
        "query": `query ChannelLastMessages($channelId: String!, $limit: String) {
            channelLastMessages(channelId: $channelId, limit: $limit) {
                _id
                userId
                content
                edited
                channelId
                thread
                visible
                replies
                reactions
                files {
                    id
                    userId
                    fileName
                    fileType
                    fileURL
                    channelIds
                    date
                }
                updated_at
                created_at
            }
        }`,
        "variables": {
            "channelId": channelId,
            "limit": limit.toString()
        }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: headers,
        data: lastMessagesQuery
    }).then((response) => {
        console.log(response.data.data)
        dispatch({
            type: GET_MESSAGES,
            payload: response.data.data.channelLastMessages
        })
        // return response.data.data.channelLastMessages;
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: GET_MESSAGES,
            payload: []
        })
    });
    return response;
}

export const createMessage = (channelId, userId, message) => async (dispatch, getState) => {
    const createMessageMutation = {
        "query": `mutation createMessage($newMessageData: NewMessageInput!) {
            createMessage(newMessageData: $newMessageData)
        }`,
        "variables": {
            "newMessageData": {
                "channelId": channelId,
                "content": message,
                "userId": userId.toString()
            }
        }
    };
    await axios({
        url: AG_URL,
        method: 'post',
        headers: headers,
        data: createMessageMutation
    }).then((response) => {
        console.log(response.data)
        dispatch({
            type: CREATE_MESSAGE,
            payload: response.data
        })
    }).catch((error) => {
        console.log(error);
    });
}


export const obtenerPokemonsAction = () => async (dispatch, getState) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
        dispatch({
            type: GET_POKE_SUCCESS,
            payload: res.data.results
        })
    } catch (error) {
        console.log(error)
    }
}