// Defines the structure for weather information
export interface weatherInformationType {
  label: string | React.ReactElement;
  value: string | number;
  unit: string;
}

// Defines the structure for individual weather conditions
export interface WeatherArrayType {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Defines the structure for full weather data 
export interface WeatherAPIType {
  coord: {
    lon: string;
    lat: string;
  };
  weather: Array<WeatherArrayType>;
  unit: string;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  snow?: {
    "1h"?: number;
  };
  rain?: {
    "1h"?: number;
  };
  clouds: {
    all?: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

// Defines the structure for weather icon properties
export interface SvgPropsType {
  size: number;
  fill: string;
}

// Defines the structure for a language
export interface LanguagesType {
  code: string;
  name: string;
}

// Defines the structure for radio button options
export interface RadioButtonOptionsType {
  id: string;
  value: string;
  checked: boolean;
  ref: React.Ref<HTMLInputElement>;
}

// Defines the structure for a radio button group
export interface RadioButtonPropsType {
  label: string;
  items: Array<RadioButtonOptionsType>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

// Defines the structure for a button
export interface ButtonPropsType {
  text: string;
  label: string;
  ref: React.Ref<HTMLButtonElement>;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// Defines the structure for a Select 
export interface SelectPropsType {
  id: string;
  placeHolder: string;
  label: string;
  ref: React.Ref<HTMLSelectElement>;
  value: string;
  items: Array<LanguagesType>;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

// Defines the structure for a Text Input
export interface TextInputPropsType {
  id: string;
  placeHolder: string;
  label: string;
  ref: React.Ref<HTMLInputElement>;
}