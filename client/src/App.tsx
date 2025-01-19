import { useRef, useState } from "react";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import i18n from "./i18n";
import RadioButton from "./components/RadioButton";
import { RadioButtonOptionsType, WeatherAPIType } from "./Types";
import CustomButton from "./components/CustomButton";

function App() {
  const [language, setLanguage] = useState<string>("en");
  const [unit, setUnit] = useState<string>("metric");
  const languages = [
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
  ];
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherAPIType>(); // Storing weather API data
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const unitMetricRef = useRef<HTMLInputElement>(null);
  const unitImperialRef = useRef<HTMLInputElement>(null);
  const options: Array<RadioButtonOptionsType> = [
    {
      id: "unit-metric",
      value: "metric",
      checked: unit === "metric",
      ref: unitMetricRef,
    },
    {
      id: "unit-imperial",
      value: "imperial",
      checked: unit === "imperial",
      ref: unitImperialRef,
    },
  ];

  // Handler for changing openweathermap API language and website language
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  // Handler for changing openWeatherMap API unit (°F, °C)
  const handleChangeUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };

  // Fetch weather information by city name, unit, and language
  const getWeatherData = async () => {
    setLoading(true);
    const name = inputRef?.current?.value ?? "";
    const response = await fetch(
      `http://localhost:7000/api/weather/name?q=${name}&unit=${unit}&lang=${language}`
    );
    if (response.status === 200) {
      const data = await response.json();
      setError(null);
      setWeather(data);
      localStorage.setItem("cityName", data.name);
    } else {
      setError("Wrong city name was entered");
    }
    setLoading(false);
  };

  return (
    <div>
      <form>
        <div className="grid gap-5 mb-6">
          <TextInput
            label="City Name"
            id="city_name"
            ref={inputRef}
            placeHolder="Enter City Name"
          />
          <SelectInput
            ref={selectRef}
            id="language"
            label="Language"
            value={language}
            items={languages}
            placeHolder="Select Language"
            onChange={handleChangeLanguage}
          />
          <RadioButton
            items={options}
            label="unit"
            onChange={handleChangeUnit}
          />
          <CustomButton
            text="Submit"
            ref={buttonRef}
            label="Submit Form"
            onClick={getWeatherData}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
