import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

const Img1 = "https://tegakisozai.com/wp-content/uploads/2019/09/kosumosu_kukiari_tubomi.png";
const Img2 = "https://www.isogo-sk.com/wp-content/uploads/2022/01/ikebana.png";
const Img3 =
  "https://thumb.ac-illust.com/11/11f13b14aed072e93e611759d9aa090f_t.jpeg";
const Img4 = "https://thumb.ac-illust.com/09/092e79055b2577bd4c77e0226cfccf94_w.jpeg";

function App() {
  const [count, setCount] = useState(0)

  const Img = "https://www.isogo-sk.com/wp-content/uploads/2022/01/ikebana.png";

  const [w, setW] = useState(110);
  const [h, setH] = useState(100);

  const water = () => {
    setW(w * 1.01);
    setH(h * 1.01);
  };

  const reset = () => {
    setW(110);
    setH(100);
  };

  return (
    <div className="App">

      <div className="button">
        <button onClick={reset}>リセット</button>
      </div>

      <div className="level">
        {w < 150 && (
          <p>Level 1</p>
        )}
        {w < 300 && w > 150 && (
          <p>Level 2</p>
        )}
        {w < 600 && w > 300 && (
          <p>Level 3</p>
        )}
        {w > 600 && (
          <p>Level MAX</p>
        )}
      </div>

      <div className="flower">
        {w < 150 && (
          <img onMouseOver={water} src={Img1} alt="花" width={w} height={h} />
        )}

        {w < 300 && w > 150 && (
          <img onMouseOver={water} src={Img2} alt="花" width={w} height={h} />
        )}

        {w < 600 && w > 300 && (
          <img onMouseOver={water} src={Img3} alt="花" width={w} height={h} />
        )}

        {w > 600 && (
          <img onMouseOver={water} src={Img4} alt="花" width={w} height={h} />
        )}
      </div>

      <hr></hr>
    </div>

  )
}


export default App
