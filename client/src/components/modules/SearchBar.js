import React, { useState, useEffect } from "react";
import { Router, useNavigate } from "@reach/router";
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import { useNavigate } from "@reach/router";

import "./SearchBar.css";
import Search from "../pages/Search";

import { get, post } from "../../utilities";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");
  const DEFAULT_TEXT = "";

  // mount search bar w/ empty field
  useEffect(() => {
    setQuery(DEFAULT_TEXT);

    // dismount/cleanup callback
    return () => {
      setQuery(DEFAULT_TEXT);
    };
  }, []);

  const history = useHistory();
  const routeChange = () => {
    console.log("entered");
    history.push("/search/");
    console.log("switched pages");
  };

  // const navigate = useNavigate();
  // const routeChange = () => {
  //   navigate("/search/");
  // };

  // called when user types in search box
  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  // called when user hits "search"
  const handleSearch = (event) => {
    event.preventDefault();
    console.log("hit submit");

    // save to user's recent searches
    const body = { id: props.id, searchQuery: query };
    console.log(body);

    post("/api/search", body).then((search) => {
      console.log("posted search query");
    });

    setQuery(DEFAULT_TEXT);

    // navigate to search results component
    routeChange();
  };

  return (
    <div className="u-flex">
      <input
        type="text"
        placeholder={query}
        value={query}
        onChange={handleInput}
        className="search-input"
      />
      <button
        type="submit"
        className="search-button u-pointer"
        value="Submit"
        onClick={handleSearch}
      >
        search
      </button>
    </div>
  );
};

export default SearchBar;