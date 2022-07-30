import { useState, useEffect } from 'react';
import Item from './Item';
import View from './View';
const Data = () => {
  const [sunset, setSunset] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [sunsetTime, setSunsetTime] = useState([]);
  const [sunriseTime, setSunriseTime] = useState([]);
  const [sunriseTTime, setSunriseTTime] = useState([]);
  const [diff, setDiff] = useState([]);
  const [url, setUrl] = useState([]);
  const [sun, setSun] = useState([]);
  const [today, setToday] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
      
        "https://api.open-meteo.com/v1/forecast?latitude=35.6785&longitude=139.6823&daily=sunset,sunrise&timezone=Asia%2FTokyo"
      
      );
      

      const responseData = await response.json();
      console.log(responseData, "data");
  
      const dataList = responseData.daily;
      const sunset = dataList.sunset;
      const sunrise = dataList.sunrise;
    
      setSunset(sunset);
      setSunrise(sunrise);

      getView();
    };
    fetchData();
    setInterval( fetchData,60000);
  }, []);


  const getView = () => {
   const today = new Date();
   setToday(today);

  //  今日の日の出
   const sunrise1 = sunrise[0].substring(0,10);
   const sunrise2 = sunrise[0].substring(sunrise[0].length - 5);
   const sunrise3 = sunrise1 + ' ' +　sunrise2;
   const sunriseTime = new Date(sunrise3);
   setSunriseTime(sunriseTime);
   console.log(sunriseTime,"sunrise");

  //  今日の日の入り
   const sunset1 = sunset[0].substring(0,10);
   const sunset2 = sunset[0].substring(sunset[0].length - 5);
   const sunset3 = sunset1 + ' ' +　sunset2;
   const sunsetTime = new Date(sunset3);
   setSunsetTime(sunsetTime);
   console.log(sunsetTime,"sunset");

  //  明日の日の出　取得時間によって配列のどことるか変える必要あり
  const sunriseT1 = sunrise[1].substring(0,10);
  const sunriseT2 = sunrise[1].substring(sunrise[1].length - 5);
  const sunriseT3 = sunriseT1 + ' ' +　sunriseT2;
  const sunriseTTime = new Date(sunriseT3);
  setSunriseTTime(sunriseTTime);
  console.log(sunriseTTime,"sunriseT");
   
   if (today <= sunriseTime){
    setBeforeSunrise();
   } else if (today > sunriseTime && today <= sunsetTime) {
    setBeforeSunset();
   } else {
    setAfterSunset();
   }

  }

  const setBeforeSunrise = () => {
    const url = "https://www.illust-box.jp/db_img/sozai/00015/157279/watermark.jpg";
    setUrl(url);

    const diff = (sunriseTime.getTime() - today.getTime())/ (60*60*1000);
    console.log(diff,"diff1");

    setSun("日の出");
  }

  const setBeforeSunset = () => {
    const url = "https://www.illust-box.jp/db_img/sozai/00019/194485/watermark.jpg";
    setUrl(url);

    const diff = (sunsetTime.getTime() - today.getTime())/ (60*60*1000);
    // const diffH = diff.substring(0,diff.indexOf('.'));
    // const diffM = diff.substring(diff.indexOf('.')+1);
    // console.log(diffH,"diffH"); 
    // console.log(diffM,"diffM");
    // console.log(diff,"diff2");
    setDiff(diff);

    setSun("日の入り");
  }

  const setAfterSunset = () => {
    const url = "https://www.illust-box.jp/db_img/sozai/00015/157279/watermark.jpg";
    setUrl(url);

    const diff = (sunriseTTime.getTime() - today.getTime())/ (60*60*1000);
    console.log(diff,"diff3");
    setSun("日の出");
  }
    
  return (
    <div>
      <div className='viewBox'>
        <View key='0' sunsetTime={sunset[0]} sunriseTime={sunrise[0]} diff={diff} img={url} sun={sun}/>
        
      </div>
    </div>
  );
};
export default Data;