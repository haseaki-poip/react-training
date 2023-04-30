import { useEffect, useMemo, useRef } from "react";
import Camera from "./components/Camera";
import ImageCrip from "./components/ImageCrip";
import Map from "./components/Map";
import Predict from "./components/Predict";
import Parent from "./components/UseCallback";
import Bar from "./lib/Bar";
import Slider from "./lib/Slider";
import Slider2 from "./lib/Slider2";
import Gallery from "./lib/Gallery";
import Header from "./lib/Header";

const App = () => {
  return (
    <div className="App">
      <Header ControlStartPosition={300} initIsShowHeader={true} />
      <div className="my-28">
        <Slider2>
          {/* overflow-hiddenをしていてもmin-wを設定しないと要素が小さくなって画面内に収まるだけ */}

          <div className="bg-black w-[85vw] h-[500px] rounded-xl text-white">
            1
          </div>

          <div className="bg-red-400 w-[85vw] h-[500px] rounded-xl text-white">
            2
          </div>
          <div className="bg-blue-400 w-[85vw] h-[500px] rounded-xl text-white">
            3
          </div>
        </Slider2>
      </div>
      <div className="my-10">
        <Gallery />
      </div>
    </div>
  );
};

export default App;
