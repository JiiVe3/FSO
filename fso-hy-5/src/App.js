import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = (props) => {
  return (
    <div>find countries <input value={props.search} onChange={props.onSearchChange} /></div>
  );
}

const Country = (props) => {
  const country = props.countries[0];
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="512"></img>
    </div>
  );
}

const ListedCountry = (props) => {
  return (
    <li>{props.name}<button onClick={() => props.clickShow(props.name)}>show</button></li>
  );
}

const List = (props) => {
  return (
    <ul>
      {props.countries.map(country => <ListedCountry key={country.name} name={country.name} clickShow={props.clickShow} />)}
    </ul>
  );
}

const Info = (props) => {
  if(props.countries.length === 1) {
    return (
      <Country countries={props.countries} />
    );
  } else if (props.countries.length <= 10) {
    return (
      <List countries={props.countries} clickShow={props.clickShow} />
    );
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    );
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  useEffect(() => {
    setSelectedCountries(countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())));
  }, [search]);

  const clickShow = (name) => {
    setSearch(name);
  }

  return (
    <>
    <Search search={search} onSearchChange={handleSearchChange} />
    <Info countries={selectedCountries} clickShow={clickShow} />
    </>
  );
}

export default App;
