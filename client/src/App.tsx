import { useEffect, useRef, useState } from "react";
import TextInput from "./components/TextInput";
import SelectInput from "./components/SelectInput";
import i18n from "./i18n";
import RadioButton from "./components/RadioButton";
import "flowbite";
import {
  RadioButtonOptionsType,
  WeatherAPIType,
  weatherInformationType,
} from "./Types";
import CustomButton from "./components/CustomButton";
import { t } from "i18next";
import PressureIcon from "./Icons/PressureIcon";
import HumidityIcon from "./Icons/HumidityIcon";
import SunriseIcon from "./Icons/SunriseIcon";
import SunsetIcon from "./Icons/SunsetIcon";
import CustomTooltip from "./components/CustomTooltip";
function App() {
  // const API_Url = import.meta.env.VITE_API_URL;
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

  /**
   * Checking the access of browser geolocation
   * Fetch weather information using location coordinates, unit, and language
   * If don't have access to location, checking the localStorage to get last searched city name
   */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const getWeatherDataWithCoordinates = async () => {
            const response = await fetch(
              `http://localhost:10000/api/weather/coord?lat=${latitude}&lon=${longitude}&unit=${unit}&lang=${language}`
            );
            const data = await response.json();
            setWeather(data);
            localStorage.setItem("cityName", data.name);
            if (inputRef.current) {
              inputRef.current.value = data.name;
            }
            setLoading(false);
            setError(null);
          };
          getWeatherDataWithCoordinates();
        },
        (err) => {
          if (err.PERMISSION_DENIED) {
            if (inputRef.current) {
              inputRef.current.value = localStorage.getItem("cityName") || "";
              getWeatherData();
            }
          }
          setError(err.message);
          setLoading(false);
        }
      );
    } else {
      setError(t("geolocation_error"));
      setLoading(false);
    }
  }, []);

  // Fetch weather information by city name, unit, and language
  const getWeatherData = async () => {
    setLoading(true);
    const name = inputRef?.current?.value ?? "";
    const response = await fetch(
      `http://localhost:10000/api/weather/name?q=${name}&unit=${unit}&lang=${language}`
    );
    if (response.status === 200) {
      const data = await response.json();
      setError(null);
      setWeather(data);
      localStorage.setItem("cityName", data.name);
    } else {
      setError(t("wrong_city"));
    }
    setLoading(false);
  };

  // Handler for changing openweathermap API language and website language
  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  // Handler for changing openWeatherMap API unit (°F, °C)
  const handleChangeUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };

  // Keyboard navigation function (Tab only, circular)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const { key, shiftKey } = e;

    // List of focusable elements
    const focusableElements = [
      inputRef.current,
      selectRef.current,
      unitMetricRef.current,
      unitImperialRef.current,
      buttonRef.current,
    ];

    let currentIndex = focusableElements.findIndex(
      (el) => el === document.activeElement
    );

    if (key === "Tab") {
      if (shiftKey) {
        // Shift + Tab: Go backward in the list of focusable elements
        currentIndex =
          (currentIndex - 1 + focusableElements.length) %
          focusableElements.length;
      } else {
        // Tab: Go forward in the list of focusable elements
        currentIndex = (currentIndex + 1) % focusableElements.length;
      }
    } else if (key === "Enter" || key === "Spacebar" || key === " ") {
      console.log("clicked");

      if (
        document.activeElement === unitMetricRef.current &&
        unitMetricRef.current
      ) {
        unitMetricRef.current.checked = true;
        setUnit("metric");
      }
      if (
        document.activeElement === unitImperialRef.current &&
        unitImperialRef.current
      ) {
        unitImperialRef.current.checked = true;
        setUnit("imperial");
      }
    } else {
      return;
    }

    // Focus the next/previous element
    focusableElements[currentIndex]?.focus();
    e.preventDefault(); // Prevent the default tab behavior
  };

  /**
   *  List of weather information shown in screen
   */
  const weatherInformation: Array<weatherInformationType> = [
    {
      label: (
        <div>
          <PressureIcon size={28} fill="#ffffff" tooltip="pressure-tooltip" />
          <CustomTooltip id="pressure-tooltip" text="pressure" />
        </div>
      ),
      value: weather?.main?.pressure ?? "",
      unit: "hPa",
    },
    {
      label: (
        <div>
          <HumidityIcon size={28} fill="#ffffff" tooltip="humidity-tooltip" />
          <CustomTooltip id="humidity-tooltip" text="humidity" />
        </div>
      ),
      value: weather?.main?.humidity ?? "",
      unit: "%",
    },
    {
      label: (
        <div>
          <SunriseIcon size={28} fill="#ffffff" tooltip="sunrise-tooltip" />
          <CustomTooltip id="sunrise-tooltip" text="sunrise" />
        </div>
      ),
      value:
        new Date((weather?.sys?.sunrise ?? 0) * 1000).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }
        ) ?? "",
      unit: "",
    },
    {
      label: (
        <div>
          <SunsetIcon size={28} fill="#ffffff" tooltip="sunset-tooltip" />
          <CustomTooltip id="sunset-tooltip" text="sunset" />
        </div>
      ),
      value:
        new Date((weather?.sys?.sunset ?? 0) * 1000).toLocaleTimeString(
          "en-US",
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }
        ) ?? "",
      unit: "",
    },
    {
      label: t("sea_level"),
      value: weather?.main?.sea_level ?? "",
      unit: "hPa",
    },
    {
      label: t("ground_level"),
      value: weather?.main?.grnd_level ?? "",
      unit: "hPa",
    },
    {
      label: t("visibility"),
      value: weather?.visibility ?? "",
      unit: "m",
    },
    {
      label: t("wind_speed"),
      value: weather?.wind.speed ?? "",
      unit: weather?.unit === "metric" ? "m/s" : "m/h",
    },
    {
      label: t("wind_degree"),
      value: weather?.wind.deg ?? "",
      unit: "deg",
    },
    {
      label: t("wind_gust"),
      value: weather?.wind.gust ?? "",
      unit: weather?.unit === "metric" ? "m/s" : "m/h",
    },
    {
      label: t("clouds"),
      value: weather?.clouds.all ?? "",
      unit: "%",
    },
    {
      label: t("snow"),
      value: weather?.snow?.["1h"] ?? "",
      unit: "mm/h",
    },
    {
      label: t("rain"),
      value: weather?.rain?.["1h"] ?? "",
      unit: "mm/h",
    },
  ];

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-6">
        <form aria-labelledby="form-weather" role="form">
          <div className="grid gap-5 mb-6">
            <TextInput
              label="city_name"
              id="city_name"
              ref={inputRef}
              placeHolder="Enter City Name"
              onKeyDown={handleKeyDown}
            />
            <SelectInput
              ref={selectRef}
              id="language"
              label="language"
              value={language}
              items={languages}
              placeHolder="Select Language"
              onChange={handleChangeLanguage}
              onKeyDown={handleKeyDown}
            />
            <RadioButton
              items={options}
              label="unit"
              onChange={handleChangeUnit}
              onKeyDown={handleKeyDown}
            />
            <CustomButton
              text="search"
              ref={buttonRef}
              label="Submit Form"
              onClick={getWeatherData}
              onKeyDown={handleKeyDown}
            />
          </div>
        </form>
        <div className="col-span-2">
          <div
            className={`${
              error ? "" : "hidden"
            }p-4 mb-4 font-bold text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400`}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
          <div>
            <p className={`${loading ? "" : "hidden"}`}>{t("loading")}</p>
            <div
              className={`${
                error || loading ? "hidden" : ""
              } bg-[#2B2B2B] rounded-xl p-8 grid grid-cols-1 md:grid-cols-3 justify-between`}
            >
              <div className="col-span-2">
                <div className="flex flex-col gap-4 lg:flex-row lg:justify-between text-white mb-2">
                  <span>
                    {weather?.name}, {weather?.sys?.country}
                  </span>
                  <p>
                    {new Date((weather?.dt ?? 0) * 1000).toLocaleTimeString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      }
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-4 text-white">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                    <p className="text-6xl">
                      {weather?.main?.temp.toFixed(0)}°
                      {weather?.unit === "metric" ? "C" : "F"}
                    </p>
                    <div className="grid gap-1">
                      <p>
                        Min / Max:
                        <span className="mx-1">
                          {weather?.main.temp_min.toFixed(0)}
                        </span>
                        \
                        <span className="mx-1">
                          {weather?.main?.temp_max.toFixed(0)}
                        </span>
                        °{weather?.unit === "metric" ? "C" : "F"}
                      </p>
                      <p>
                        {t("feels_like")}:
                        <span>
                          {weather?.main?.feels_like.toFixed(0) ?? ""}°
                          {weather?.unit === "metric" ? "C" : "F"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-x-4 lg:gap-x-4">
                    {weatherInformation.map((item, index) => (
                      <div
                        className={`${
                          !item.value ? "hidden" : "flex"
                        } items-center font-semibold`}
                        key={index}
                      >
                        {item.label}:{item.value + " " + item.unit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between md:justify-end">
                {weather?.weather.map((item, index) => (
                  <div key={index} className="text-center">
                    <img
                      className="w-32"
                      src={`https://openweathermap.org/img/wn/${item.icon}@4x.png`}
                      alt={item.description}
                      role="img"
                      aria-label={item.description}
                    />
                    <p className="text-white">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
