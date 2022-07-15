import { useState, useEffect } from 'react'
import './App.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function App() {
  const getData = () => {
    const data = localStorage.getItem("test");
    console.log(data);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };


  // 登録されるデータを保持するuseState
  const [data, setData] = useState(getData);

  // タイトル入力欄のテキスト情報を保持するuseState
  const [title, setTitle] = useState("");
  const [title2, setTitle2] = useState("");
  const [titleDel, setTitleDel] = useState("");
  const [titleId, setTitleId] = useState(0);

  const deleteData = () => {
    let storageItem = JSON.parse(localStorage.getItem("test"));
    let key = storageItem.keys("test");
    if (storageItem.key == titleDel) {
      delete storageItem.key;
      localStorage.setitem("test", JSON.stringify(storageItem))
    }
  }


  // 送信を押したら登録
  const handleAddSubmit = (e) => {

    e.preventDefault();

    let pushData = {
      title,
      title2,
    };

    setData([...data, pushData]);
    setTitle("");
    setTitle2("");
  };

  const handleDelSubmit = (e) => {

    e.preventDefault();

    deleteData();

    setTitleDel("");
  };

  // point! useStateの[data]に変更があったらlocalStrageを更新する
  useEffect(() => {
    localStorage.setItem("test", JSON.stringify(data));

    // let obj = {
    //   titleId: data
    // }


    // let jsonObj = JSON.stringify(obj);
    // localStorage.setItem("test", jsonObj);

  }, [data]);

  return (
    <div className="App">

 
      <Box component="form"onSubmit={handleAddSubmit} sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
        <div className="name">
          <TextField
            type="text" required onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Name"
            id="standard-size-small"
            defaultValue=""
            size="small"
            variant="standard"
            margin="normal"
          />
        </div>

        <div className="tel">
          <TextField
            type="text" required onChange={(e) => setTitle2(e.target.value)}
            value={title2}
            label="Tel"
            id="standard-size-normal"
            defaultValue=""
            size="small"
            variant="standard"
            margin="normal"
          />
        </div>

        <Button variant="contained" type="submit">SEND</Button>
        </Box>


      {data.map((item, index) => (
        <div key={index}>
          <form onSubmit={handleDelSubmit}>
            <p>名前: {item.title}</p>
            <p>電話番号: {item.title2}</p>
            <Button type="submit" name="del"
              onChange={(e) => setTitleDel(e.target.value)} value={item.title}>DELETE</Button>
          </form>
        </div>
      ))}



    </div>
  )
}

export default App

