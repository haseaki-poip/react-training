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
      <div className="mt-10">
        <Slider>
          {/* overflow-hiddenをしていてもmin-wを設定しないと要素が小さくなって画面内に収まるだけ */}
          <div className="bg-black w-[600px] h-[500px] rounded-xl text-white">
            1
          </div>
          <div className="bg-red-400 w-[600px] h-[500px] rounded-xl text-white">
            2
          </div>
          <div className="bg-blue-400 w-[600px] h-[500px] rounded-xl text-white">
            3
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default App;
