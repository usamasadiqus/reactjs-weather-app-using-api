import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import LOADER from "./assets/images/puff.svg";

const App = () => {
  const [city, setCity] = useState("");
  const [weathers, setWeathers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) {
      return; // Prevent duplicate requests while one is already in progress
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}&q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      // Check if the city is already in the weathers array
      const isCityExists = weathers.some(
        (weather) => weather.name === data.name
      );
      if (isCityExists) {
        throw new Error(`'${data.name}' already exists!`);
      }

      setWeathers((prevWeathers) => [...prevWeathers, data]);

      setCity("");
      setError(null);
    } catch (error) {
      setError(error.message);

      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col justify-between items-center min-h-screen bg-gray-100 ${
        isLoading ? "p-0" : "py-20"
      } overflow-x-hidden`}
    >
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center">
          <img src={LOADER} alt="Loader" className="w-40 h-40" />
        </div>
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e)} className="mb-6">
            <input
              type="text"
              placeholder="Enter city name"
              className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring focus:border-blue-300"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-r-lg px-4 py-2 focus:outline-none hover:bg-blue-600"
              disabled={!city}
            >
              Search
            </button>
          </form>

          {weathers?.length > 0 ? (
            <div className="flex w-3/4 gap-8 overflow-x-scroll space-x-4">
              {weathers?.map((data, index) => (
                <WeatherCard key={index} data={data} />
              ))}
            </div>
          ) : (
            <p className="text-gray-700 text-lg">No weather data available</p>
          )}

          <div></div>

          {error && (
            <div className="fixed bottom-0 left-0 right-0 bg-red-500 p-4 text-white flex justify-between items-center">
              <p className="text-base text-white">An error occurred: {error}</p>
              <button
                className="text-base text-white"
                onClick={() => setError(null)}
              >
                Close
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
