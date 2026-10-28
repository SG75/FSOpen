const Filter = ({ searchCountry, setSearchCountry, setSelectedCountry }) => {
  const handleReset = () => {
    setSearchCountry("");
    setSelectedCountry(null);
  };
  return (
    <>
      <label className="countryLabel" htmlFor="country">
        find countries{" "}
      </label>
      <input
        id="country"
        value={searchCountry}
        onChange={(e) => setSearchCountry(e.target.value)}
        placeholder="enter country name"
        className="input"
      />
      <button className="resetBtn showBtn" onClick={handleReset}>
        Reset Search
      </button>
    </>
  );
};
export default Filter;
