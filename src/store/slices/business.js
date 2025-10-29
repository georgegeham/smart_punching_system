import axios from "axios";

const BusinessSlice = {
  state: () => ({
    BusinessSettings: JSON.parse(localStorage.getItem("BusinessSettings")) || {
      companyName: null,
      location: null,
      latitude: null,
      longitude: null,
      area: null,
      requireFixedHours: false,
      startHour: null,
      endHour: null,
    },
    weather: JSON.parse(localStorage.getItem("Weather")) || {
      temperature: null,
      condition: null,
      location: null,
      humidity: null,
      windSpeed: null,
    },
  }),
  mutations: {
    setBusinessSettings(state, settings) {
      state.BusinessSettings = settings;
      localStorage.setItem(
        "BusinessSettings",
        JSON.stringify(state.BusinessSettings)
      );
    },
    setWeather(state, weatherData) {
      state.weather = weatherData;
      localStorage.setItem("Weather", JSON.stringify(state.weather));
    },
    resetBusinessSettings(state) {
      state.BusinessSettings = {
        companyName: null,
        location: null,
        latitude: null,
        longitude: null,
        area: null,
        requireFixedHours: false,
        startHour: null,
        endHour: null,
      };
      state.weather = {
        temperature: null,
        condition: null,
        location: null,
        humidity: null,
        windSpeed: null,
      };
      localStorage.removeItem("BusinessSettings");
    },
    resetWeather(state) {
      state.weather = {
        temperature: null,
        condition: null,
        location: null,
        humidity: null,
        windSpeed: null,
      };
      localStorage.removeItem("Weather");
    },
  },
  actions: {
    async setBusinessSettings({ state, commit }, settings) {
      if (settings.location) {
        const response = await axios.get(
          `${import.meta.env.VITE_WEATHER_API_URL}/current.json?key=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&q=${settings.location}&aqi=no`
        );
        if (response.status === 200) {
          const data = response.data;
          const weatherData = {
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            location: data.location.name,
            humidity: data.current.humidity,
            windSpeed: data.current.wind_kph,
          };
          commit("setWeather", weatherData);
        }
      }
      commit("setBusinessSettings", settings);
    },
  },
  getters: {
    BusinessSettings(state) {
      return state.BusinessSettings;
    },
    Weather(state) {
      return state.weather;
    },
  },
};

export default BusinessSlice;
