import { useState } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [city, setCity] = useState("");
  const [weathers, setWeathers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}&q=${city}&appid=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();
      setWeathers([...weathers, data]);
      setCity("");
    } catch (error) {
      console.error("error", error);
      throw new Error("Error fetching weather data:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-gray-100 py-20 overflow-x-hidden">
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
        >
          Search
        </button>
      </form>
      <div className="flex w-3/4 overflow-x-scroll space-x-4">
        {weathers.map((data, index) => (
          <WeatherCard key={index} data={data} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default App;
