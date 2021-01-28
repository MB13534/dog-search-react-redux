import dogs from "./API/dogs";

import {
  CHANGE_SEARCHFIELD,
  REQUEST_DOGS_PENDING,
  REQUEST_DOGS_SUCCESS,
  REQUEST_DOGS_FAILED,
} from "./constants";

//helper function to filter out results that dont have full data
const filterOriginalDogList = (dogList) => {
  const filteredDogList = dogList.filter((dog) => {
    if (dog.breeds[0]) {
      if (dog.breeds[0].breed_group) {
        return dog;
      }
    }
    return null;
  });
  //set state with new list with all complete elements
  return filteredDogList;
};

//ACTION CREATOR TO UPDATE THE STATE OF THE LIST OF DOGS
//this only runs once
export const fetchDogs = (numberOfDogsToFetch) => async (dispatch) => {
  dispatch({ type: REQUEST_DOGS_PENDING });

  try {
    //runs axios from /API/dogs.js
    const response = await dogs.get(`/search?limit=${numberOfDogsToFetch}`);
    //deconstruct data from response and set name to dogList
    const { data: dogList } = response;
    //some of the dogs in the API do not have breed or breed_group so we must remove them from the list
    const filteredDogList = filterOriginalDogList(dogList);
    dispatch({ type: REQUEST_DOGS_SUCCESS, payload: filteredDogList });
  } catch (error) {
    dispatch({ type: REQUEST_DOGS_FAILED, payload: error });
  }
};

//ACTION CREATOR TO UPDATE THE CURRENT STATE OF THE SEARCH FIELD
export const setSearchField = (text) => ({
  type: CHANGE_SEARCHFIELD,
  payload: text,
});
