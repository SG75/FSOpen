const DisplayCountry = ({ country }) => {
  if (!country.name) {
    return null;
  }
  return (
    <>
      <h1 className="countryName">{country.name.common}</h1>
      <div className="capital">
        <p>Capital - {country.capital}</p>
        <p>Area - {country.area}</p>
      </div>
      <div className="languages">
        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>
      <div className="flag">
        <img
          src={country.flags.png}
          alt={`Flag picture of  ${country.name.common} `}
        />
      </div>
    </>
  );
};
export default DisplayCountry;
