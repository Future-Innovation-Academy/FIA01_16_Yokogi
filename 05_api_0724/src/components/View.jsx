
const View = ({ sunsetTime, sunriseTime, img, diff, sun }) => {



  return (
    <div className="viewItem" >
      {/* <p>{sunsetTime}</p>
        <p>{sunriseTime}</p> */}
      <p>{sun}γΎγ§{diff}ζι</p>

      <img src={img} alt="img" width="300" height="200" />
    </div>
  );
};
export default View;