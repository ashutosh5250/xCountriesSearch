import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
      setFilteredCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <div className="input">
        <input
          type="text"
          placeholder="Search for countries"
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      <div className="container">
        {filteredCountries.map((country, index) => (
          <div key={index} className="countryCard">
            <img src={country.flags.svg} alt="Flag not available" />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
