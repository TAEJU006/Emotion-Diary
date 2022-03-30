import { Navigate, useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  // 이미지가 안뜨면
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  const strDate = new Date(parseInt(date)).toLocaleDateString();

  // 일기를 조회할 함수
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  // 일기를 수정할 함수
  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className={"DiaryItem"}>
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img-wrapper_${emotion}`,
          // 감정에 따라서 동적으로 className을 정해줄 수 있음
        ].join(" ")}
      >
        {/* process.env.PUBLIC_URL = public 디렉토리 주소 */}
        {/* ${emotion} =>  감정의 숫자가 들어옴 */}
        <img src={process.env.PUBLIC_URL + `/assets/emotion${emotion}.png`} />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"edit"} />
      </div>
    </div>
  );
};

export default DiaryItem;
