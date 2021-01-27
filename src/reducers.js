import {
  CHANGE_SEARCHFIELD,
  REQUEST_DOGS_PENDING,
  REQUEST_DOGS_SUCCESS,
  REQUEST_DOGS_FAILED,
} from "./constants";

const initialStateSearch = {
  searchField: "",
};

export const searchDogs = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return { ...state, searchField: action.payload };
    default:
      return state;
  }
};

const initialStateDogs = {
  dogList: [],
  isPending: true,
};

export const requestDogs = (state = initialStateDogs, action = {}) => {
  switch (action.type) {
    case REQUEST_DOGS_PENDING:
      return { ...state, isPending: true };
    case REQUEST_DOGS_SUCCESS:
      return { ...state, dogList: action.payload, isPending: false };
    case REQUEST_DOGS_FAILED:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
