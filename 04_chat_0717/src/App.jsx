import { useState, useEffect, useInsertionEffect } from 'react';
import './App.css';
// firebaseを使うために用意されているもの
import { collection, query, onSnapshot, addDoc } from "firebase/firestore";
// .envに書かれているfirebaseに接続するためのもの
import { db, auth } from "./firebase";
import firebase, { storage } from "./firebase";
import Add from './Add';

function App() {
  // ★画像アップロード処理★
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleImage = event => {
    const image = event.target.files[0];
    setImage(image);
  };

  const onSubmit = event => {
    event.preventDefault();
    if (image === "") {
      console.log("ファイルが選択されていません");
    }
    // アップロード処理
    const ref = ref(storage,`/images/${image.name}`);
    const uploadTast = uploadBytes(ref, image)
    // const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  const next = snapshot => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };
  const error = error => {
    // エラーハンドリング
    console.log(error);
  };
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(fireBaseUrl => {
        setImageUrl(fireBaseUrl);
      });
  };
  // ★ここまで★

  //1 useStateを準備して、データを取得できるようにする
  // 1. useState
  //useStateでデータを受け取れる準備をする
  const [data, setData] = useState([{ id: "", title: "" }]);
  console.log(data, "useStateの箱の方をみましょう！");

  //3. 登録用のuseStateを準備します🤗
  const [titleValue, setTitleValue] = useState("");
  const [conditionValue, setConditionValue] = useState("");
  const [detailsValue, setDetailsValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  //2. useEffect
  useEffect(() => {
    //2.1 query = コレクション(firebaseの箱のこと)の指定をする
    // firebaseで用意されたおまじない
    const q = query(collection(db, "group")); //データにアクセス

    //2.2 useEffectのクリーンアップ
    //onSnapshotはfirebaseに変更があった瞬間リアルタイムで動く
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      setData(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          condition: doc.data().condition,
          details: doc.data().details,
          date: doc.data().date,
        }))
      );
    });

    return () => unsub();
  }, []);

  //4. inputのonChangeのイベントを記述🤗
  const handleInputChangeTitle = (e) => {
    setTitleValue(e.target.value);

    var now = new Date();

    var Year = now.getFullYear();
    var Month = now.getMonth() + 1;
    var Date = now.getDate();
    var Day = now.getDay();

    var ymd = Year + "年" + Month + "月" + Date + "日";

    setDateValue(ymd);

    getDate();
  };

  const handleInputChangeCondition = (e) => {
    setConditionValue(e.target.value);
  };

  const handleInputChangeDetails = (e) => {
    setDetailsValue(e.target.value);
  };

  const getDate = () => {
    var now = new Date();

    var Year = now.getFullYear();
    var Month = now.getMonth() + 1;
    var Date = now.getDate();
    var Day = now.getDay();

    var ymd = Year + "年" + Month + "月" + Date + "日";

    setDateValue(ymd);

  }

  //送信の処理を記述＝送信のボタンが押されたら登録の処理を実行する🤗
  const addData = async () => {
    // 処理を記述していきます🤗
    // alert(1); 記述後、送信ボタンを押す→画面に変化があればコメントアウトしましょう🤗
    console.log(dateValue);
    // firebaseへの登録の処理
    await addDoc(
      collection(db, "group"), //場所どこ？
      {
        title: titleValue,
        condition: conditionValue,
        details: detailsValue,
        date: dateValue,
      }
    );

    // 文字を空にします🤗
    setTitleValue("");
    setConditionValue("");
    setDetailsValue("");
    setDateValue("");
  };


  return (
    <div className="App">

      <h1>猫日記</h1>

      {/* 表示のロジック */}
      {data.map((item, index) => (
        <div key={index}>
          <div>{index}</div>
          <div>{item.id}</div>
          <div>{item.date}</div>
          <div>{item.title}</div>
          <div>{item.condition}</div>
          <div>{item.details}</div>
        </div>
      ))}

      <hr></hr>

      <Add
        addData={addData}
        titleValue={titleValue}
        conditionValue={conditionValue}
        detailsValue={detailsValue}
        handleInputChangeTitle={handleInputChangeTitle}
        handleInputChangeCondition={handleInputChangeCondition}
        handleInputChangeDetails={handleInputChangeDetails}
      />

      <div className="App">
        <h1>画像アップロード</h1>
        <form onSubmit={onSubmit}>
          <input type="file" onChange={handleImage} />
          <button>Upload</button>
        </form>
        <img src={imageUrl} alt="uploaded" />
      </div>

    </div>
  );
}

export default App
