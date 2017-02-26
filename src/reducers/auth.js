import Firebase from '../Firebase';

const defaultState = {
  user: null,
  token: null,
};

const SET_USER = 'SET_USER';
const REMOVE_USER = 'REMOVE_USER';

export default(state = defaultState, payload) => {
  switch (payload.type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user,
      };

    case REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export const checkLogged = () => {
  return dispatch => {
    const user = Firebase.checkLogged();

    dispatch({
      type: SET_USER,
      user,
    });
  }
};

export const signIn = () => {
  return dispatch => {
    Firebase.signIn().then(user => {
      dispatch({
        type: SET_USER,
        user: user,
      });
    });
  }
};

export const signOut = () => {
  return dispatch => {
    Firebase.signOut().then(() => {
      dispatch({ type: REMOVE_USER });
    });
  }
};
