const WeatherCard = ({ data }) => {
  const weather = data.weather[0].main;
  let backgroundImageClass;

  if (weather === "Rain" || weather === "Thunderstorm") {
    backgroundImageClass = "bg-rainy";
  } else if (weather === "Clouds") {
    backgroundImageClass = "bg-cloudy";
  } else {
    backgroundImageClass = "bg-sunny";
  }

  return (
    <div
      className={`flex-none w-80 h-80 bg-white bg-center bg-cover bg-no-repeat rounded-lg shadow-md overflow-hidden ${backgroundImageClass}`}
    >
      <div className="p-4">
        <h2
          className={`font-bold text-xl ${
            weather === "Rain" || weather === "Thunderstorm"
              ? "text-white"
              : "text-black"
          } mb-2`}
        >
          {data.name}
        </h2>
        <p
          className={`
              ${
                weather === "Rain" || weather === "Thunderstorm"
                  ? "text-white"
                  : "text-grey-700"
              } text-base`}
        >
          Temperature: {data.main.temp}°C
        </p>
        <p
          className={`
              ${
                weather === "Rain" || weather === "Thunderstorm"
                  ? "text-white"
                  : "text-grey-700"
              } text-base`}
        >
          Description: {data.weather[0].description}
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;
