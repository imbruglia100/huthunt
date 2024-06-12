import { csrfFetch } from './csrf';

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_USER_SPOTS = "session/setUserSpots"
const REMOVE_USER_SPOT = "session/removeUserSpot"

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const setUserSpots = (spots) => {
  return {
    type: SET_USER_SPOTS,
    payload: spots
  }
}

const removeUserSpot = (id) => {
  return {
    type: REMOVE_USER_SPOT,
    payload: id
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password
      })
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

  export const getSpotsFromCurrent = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`)

    if(response.ok){
        const currSpots = await response.json()
        const newState = {}
        currSpots.Spots.length > 0 && currSpots.Spots.forEach(spot => {

          newState[spot.id] = spot
        })


        dispatch(setUserSpots(newState))
        return newState
    }

    return {error: "Unable to retrieve details."}
  }

  export const deleteUserSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
      method: 'DELETE'
    });
    dispatch(removeUserSpot(id));
    return response;
  };

  export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE'
    });
    dispatch(removeUser());
    return response;
  };

const initialState = { user: null, isLoaded: false, userSpots: {spots: null, isLoaded:false} };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USER_SPOTS:
      return {...state, userSpots: {spots: {...action.payload}, isLoaded: true}}
    case REMOVE_USER_SPOT:
      return {...state, userSpots: {...state.userSpots, spots: {[action.payload]: null}, isLoaded: true}}
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
