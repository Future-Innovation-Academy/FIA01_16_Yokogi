import React from "react";

const Add = ({ addData, handleInputChangeTitle, handleInputChangeCondition, handleInputChangeDetails, titleValue, conditionValue, detailsValue }) => {
  return (
    <div>
      {/* hrタグは線 */}
      <hr />
      <h1>登録の処理</h1>

      {/* 入力させるinputタグを記述 */}
      <p>Title</p>
      <input type="text" value={titleValue} onChange={handleInputChangeTitle} />
      <p>Condition</p>
      <input type="text" value={conditionValue} onChange={handleInputChangeCondition} />
      <p>Details</p>
      <input type="text" value={detailsValue} onChange={handleInputChangeDetails} />

      {/* 送信のボタンを記述 */}
      <button onClick={addData}>送信</button>
    </div>
  );
};

export default Add;