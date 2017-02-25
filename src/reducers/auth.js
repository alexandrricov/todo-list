import Firebase from '../Firebase';

const defaultState = {
  user: null,
  token: null,
};

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

export default(state = defaultState, payload) => {
  switch (payload.type) {
    case SIGN_IN:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };

    case SIGN_OUT:
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export const signIn = () => {
  return dispatch => {
    Firebase.signIn().then(result => {
      dispatch({
        type: SIGN_IN,
        token: result.token,
        user: result.user,
      });
    });
  }
};

export const signOut = () => {
  return dispatch => {
    Firebase.signOut().then(() => {
      dispatch({ type: SIGN_OUT });
    });
  }
};
