import axios from 'axios'

// constantes
const dataInicial = {
    auth: ""
}

const AG_URL = process.env.API_GATEWAY_URL || 'http://34.173.4.99:4000/'
const headers = {
  "content-type": "application/json",
  "apollo-require-preflight": "true"
};

// types
const GET_POKE_SUCCESS = 'GET_POKE_SUCCESS'
const LOGIN = 'LOGIN'

// reducer
export default function authReducer(state = dataInicial, action){
    switch(action.type){
        case LOGIN:
            return {...state, auth: action.payload}
        case GET_POKE_SUCCESS:
            return {...state, array: action.payload}
        default:
            return state
    }
}
// actions

export const Login = (email, password) => async (dispatch, getState) =>  {
    console.log(email)
    console.log(password)
    const loginQuery = {
        "query": `query Login($password: String!, $email: String!) {
            login(password: $password, email: $email) {
              token
              id
              exp
            }
        }`,
        "variables": {
            "email": email,
            "password": password
        }
    };
    const response = await axios({
        url: AG_URL,
        method: 'post',
        headers: headers,
        data: loginQuery
    }).then((response) => {
        console.log(response.data.data.login)
        dispatch({
            type: LOGIN,
            payload: response.data.data.login
        })
    }).catch((error) => {
        console.log(error);
        dispatch({
            type: LOGIN,
            payload: "Login failed"
        })
        // throw "Login failed";
    });
    return response;
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