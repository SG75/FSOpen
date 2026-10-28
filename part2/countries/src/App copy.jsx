import { useState, useEffect } from "react";
import Filter from "./Filter";
import DisplayCountry from "./DisplayCountry";
import axios from "axios";

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [countryDetails, setCountryDetails] = useState({});
  console.log(countryDetails);

  useEffect(() => {
    console.log("effect run, country is now", searchCountry);
    if (searchCountry) {
      console.log("fetching country details ...");
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${searchCountry}`,
        )
        .then((response) => {
          console.log(response.data);
          setCountryDetails(response.data);
        });
    }
  }, [searchCountry]);

  return (
    <>
      <div className="container">
        <h1>Countries</h1>
        <Filter
          searchCountry={searchCountry}
          setSearchCountry={setSearchCountry}
        />
        <DisplayCountry country={countryDetails} />
      </div>
    </>
  );
};

export default App;
