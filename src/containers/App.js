import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDogs, setSearchField } from "../actions";

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import "./App.css";

//how many dog elements to fetch
//some of these elements will be discarded because of lacking info
const numberOfDogsToFetch = 100;

class App extends Component {
  //fetches dog list when app component mounts
  componentDidMount() {
    this.props.onRequestDogs();
  }

  //narrows down filter results to those in breed_group or name or temperament
  filterSearch = () => {
    const { dogList, searchField } = this.props;
    return dogList.filter((dog) => {
      return (
        dog.breeds[0].breed_group
          .toLowerCase()
          .includes(searchField.toLowerCase()) ||
        dog.breeds[0].name.toLowerCase().includes(searchField.toLowerCase()) ||
        dog.breeds[0].temperament
          .toLowerCase()
          .includes(searchField.toLowerCase())
      );
    });
  };

  render() {
    const { onSearchChange, isPending } = this.props;
    // //this is so there is no return during innitilization
    // if (!this.state.dogList) {
    //   return null;
    // }

    //narrows down render to items searched by user
    const filteredSearch = this.filterSearch();

    return (
      <>
        <h1>Search the dog cards</h1>
        <SearchBox
          onSearchChange={onSearchChange}
          placeholder="Search the Dogs"
        />
        <Scroll>
          {isPending ? (
            <h1>Loading....</h1>
          ) : (
            <ErrorBoundary>
              <CardList data={filteredSearch} />
            </ErrorBoundary>
          )}
        </Scroll>
      </>
    );
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (e) => dispatch(setSearchField(e.target.value)),
    onRequestDogs: () => dispatch(fetchDogs(numberOfDogsToFetch)),
  };
};

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    dogList: state.requestDogs.dogList,
    isPending: state.requestDogs.isPending,
    searchField: state.searchDogs.searchField,
  };
};

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
