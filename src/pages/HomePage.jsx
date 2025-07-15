import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [dataCountry, setDataCountry] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [region, setRegion] = useState("")
  useEffect(() => {
    const fetchCountries = async () => {
        const urlCountries = region ?
            `https://restcountries.com/v3.1/region/${region}?fields=name,flags,region,capital,population`
            :`https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population`
      const responseData = await fetch(
        urlCountries
      );
      const getAllInformation = await responseData.json();
      setDataCountry(getAllInformation);
    };
    fetchCountries();
  }, [region]);

  const filterCountry = dataCountry.filter((count) =>
    count.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-6 max-w-md mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
        <input
            type="text"
            placeholder="Search your country"
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          />
          <select
             value={region}
             onChange={(e)=> setRegion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mt-2"
          >
            <option value="">Search by region</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
          </select>
          
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center min-h-screen bg-gray-100 gap-6">
        {filterCountry.map((con) => (
          <div key={con.name.common} className="max-w-xs bg-white border-gray-200 rounded-lg shadow-sm">
        
            <img src={con.flags.png} alt="" className="rounded-t-lg w-full" />
            <div className="p-5 mb-4">
              <h5 className="mb-2 text-xl font-bold">{con.name.common}</h5>
              <h2 className="text-gray-700">{con.region}</h2>
              <h3 className="text-gray-700 mb-4">{con.name.official}</h3>
              
              <Link
                to={`/country/${con.name.common}`}
                className=" px-4 py-2 bg-blue-500 text-white rounded mt-3"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
