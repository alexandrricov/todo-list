import Firebase from '../Firebase';

const defaultState = {
  itemsById: {},
  itemIds: [],
};

const UPDATE_ITEMS = 'UPDATE_ITEMS';

export default(state = defaultState, payload) => {
  switch (payload.type) {
    case UPDATE_ITEMS:
      return {
        ...state,
        itemsById: payload.itemsById,
        itemIds: payload.itemIds,
      };
    default:
      return state;
  }
};

export const listenItems = () => {
  return dispatch => {
    return Firebase.listenItems(response => {
      const itemsById = {};
      const itemIds = [];

      Object.keys(response).forEach(key => {
        const item = response[key];
        itemsById[key] = {
          title: item.title,
          isDone: item.isDone,
          uid: item.uid,
        };

        itemIds.push(key);
      });

      dispatch({
        type: UPDATE_ITEMS,
        itemsById,
        itemIds,
      })
    });
  }
};

export const addItem = (text) => {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    const uid = user && user.uid;

    return Firebase.addItem({ text, uid })
      .then(console.info)
      .catch(console.error);
  }
};

export const removeItem = (id) => {
  return dispatch => {
    return Firebase.removeItem(id)
      .then(console.info)
      .catch(console.error);
  }
};

export const toggleDone = (id, isDone) => {
  return dispatch => {
    return Firebase.updateItem(id, {
      isDone,
    })
      .then(console.info)
      .catch(console.error);
  }
};

export const updateItemTitle = (id, title) => {
  return dispatch => {
    return Firebase.updateItem(id, {
      title,
    })
      .then(console.info)
      .catch(console.error);
  }
};
