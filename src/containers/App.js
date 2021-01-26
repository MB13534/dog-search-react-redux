import React, { Component } from "react";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import dogs from "../API/dogs";
import "./App.css";

//how many dog elements to fetch
//some of these elements will be discarded because of lacking info
const numberOfDogsToFetch = 100;

class App extends Component {
  //initialize state
  state = {
    dogList: null,
    searchField: "",
  };

  //fetches dog list when app component mounts
  componentDidMount() {
    this.fetchDogs(numberOfDogsToFetch);
  }

  fetchDogs = async (numberOfDogsToFetch) => {
    //runs axios from /API/dogs.js
    const response = await dogs.get(`/search?limit=${numberOfDogsToFetch}`);
    //deconstruct data from response and set name to dogList
    const { data: dogList } = response;

    //some of the dogs in the API do not have breed or breed_group so we must remove them from the list
    this.filterOriginalDogList(dogList);
  };

  //removes items that are missing info from the original list
  filterOriginalDogList = (dogList) => {
    const filteredDogList = dogList.filter((dog) => {
      if (dog.breeds[0]) {
        if (dog.breeds[0].breed_group) {
          return dog;
        }
      }
      return null;
    });
    //set state with new list with all complete elements
    this.setState({ dogList: filteredDogList });
  };

  //helper function that gets passed to the search component to update the searchField
  onSearchChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  //narrows down filter results to those in breed_group or name or temperament
  filterSearch = () => {
    return this.state.dogList.filter((dog) => {
      return (
        dog.breeds[0].breed_group
          .toLowerCase()
          .includes(this.state.searchField.toLowerCase()) ||
        dog.breeds[0].name
          .toLowerCase()
          .includes(this.state.searchField.toLowerCase()) ||
        dog.breeds[0].temperament
          .toLowerCase()
          .includes(this.state.searchField.toLowerCase())
      );
    });
  };

  render() {
    //this is so there is no return during innitilization
    if (!this.state.dogList) {
      return null;
    }

    //narrows down render to items searched by user
    const filteredSearch = this.filterSearch();

    return (
      <>
        <h1>So Many Dogs!!</h1>
        <SearchBox
          onSearchChange={this.onSearchChange}
          placeholder="Search the Dogs"
        />

        <Scroll>
          <ErrorBoundary>
            <CardList data={filteredSearch} />
          </ErrorBoundary>
        </Scroll>
      </>
    );
  }
}

export default App;
