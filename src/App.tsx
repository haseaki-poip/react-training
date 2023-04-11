import Camera from "./components/Camera";
import ImageCrip from "./components/ImageCrip";
import Map from "./components/Map";
import Predict from "./components/Predict";
import Parent from "./components/UseCallback";
import Bar from "./lib/Bar";
import Slider from "./lib/Slider";

const App = () => {
  return (
    <div className="App">
      <div className="m-10">
        <Slider>
          <div className="bg-black min-w-[600px] h-[500px] rounded-xl"></div>
          <div className="bg-black min-w-[600px] h-[500px] rounded-xl"></div>
          <div className="bg-black min-w-[600px] h-[500px] rounded-xl"></div>
        </Slider>
      </div>
    </div>
  );
};

export default App;
