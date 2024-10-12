import logo from "./logo.svg";
import "./App.css";
import WeatherData from "./component/WeatherData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-slate-500 h-screen w-screen">
      <h1 className="pt-4 text-4xl font-serif font-bold text-center text-white">
        Weather App 🌞🌈
      </h1>
      <WeatherData />
      <ToastContainer />
    </div>
  );
}

export default App;
