import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CountryDetails() {
  const { common } = useParams();
  const [dataCountry, setDataCountry] = useState([]);
  useEffect(() => {
    const fetchCountryByCommonName = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${common}`
      );
      const finalResponse = await response.json();
      setDataCountry(finalResponse);
    };
    fetchCountryByCommonName();
  }, [common]);

  return (
    <>
      {dataCountry.map((count) => (
        <div key={count.ccn3} className="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8">
            
          <div className="py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
            <div className="text-left">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
                {count.name.official}
              </h2>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
               Capital: {count.capital}
              </p>
              <p className="max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
               Region: {count.region}
              </p>
              <p className="max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
               Subregion: {count.subregion}
              </p>
              <div className="mt-5">
                <a
                  href="/"
                  className="inline-block w-full px-5 py-3 text-base font-medium text-center text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-5"
                >
                  Back to home
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
            <div className="relative w-full p-3 rounded  md:p-8">
              <div className="rounded-lg bg-white text-black w-full">
                <img src={count.flags.png} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
