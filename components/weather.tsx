type WeatherProps = {
  temperature: number;
  weather: string;
  location: string;
};

export const Weather = ({ temperature, weather, location }: WeatherProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Current Weather for {location}
      </h2>
      <div className="space-y-2">
        <p className="text-gray-600 flex items-center">
          <span className="font-medium mr-2">Condition:</span>
          {weather}
        </p>
        <p className="text-gray-600 flex items-center">
          <span className="font-medium mr-2">Temperature:</span>
          <span className="text-lg">{temperature}°C</span>
        </p>
      </div>
    </div>
  );
};
