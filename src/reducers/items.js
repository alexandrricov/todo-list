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

function mapItems(response) {
  const itemsById = {};
  const itemIds = [];

  Object.keys(response).forEach(key => {
    itemsById[key] = response[key];
    itemIds.push(key);
  });

  return {
    itemsById,
    itemIds,
  };
}

export const listenItems = () => {
  return dispatch => {
    return Firebase.listenItems(response => {
      if (response) {
        dispatch({
          type: UPDATE_ITEMS,
          ...mapItems(response),
        })
      }
    });
  }
};

export const addItem = (title) => {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    const uid = user && user.uid;
    const displayName = user && user.displayName;

    const fields = {
      title,
      uid,
      displayName,
      isDone: false,
      date: (new Date()).toISOString(),
    };

    return Firebase.addItem(fields)
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
