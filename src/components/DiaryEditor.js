import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "best",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "good",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "not bad",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "bad",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "worst",
  },
];

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DiaryEditor = () => {
  const contentRef = useRef();
  // 오늘의 일기를 state에 mapping 하기 위한 state
  const [content, setContent] = useState("");
  // 어떤 감정을 선택했는지 저장할 state
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const { onCreate } = useContext(DiaryDispatchContext);
  // emotion을 클릭하면 수행할 함수
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const navigate = useNavigate();

  //작성완료 버튼의 기능
  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    //context length가 적절한 길이가 되었을때 onCreate 함수를 호출
    onCreate(date, content, emotion);
    navigate("/", { replace: true });
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={"write a diary"}
        leftChild={<MyButton text={"< back"} onClick={() => navigate(-1)} />}
      />
      <div>
        {/* 역할은  div와 동일한데 이름만 다르다 */}
        <section>
          <h4>Date</h4>
          <div className="input_box">
            {/* 날자 선택이 가능한 html 태그 */}
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input_date"
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>Feeling</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                //emotion감정이 선택된 감정인지 아닌지를 알게하기 위한 prop
                // 선택된 emotion의 값과 같은 emtion = true, 같지 않은 emotion = false
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="How was your day?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
        </section>
        <section>
          <div className="control-box">
            <MyButton text={"save"} type={"positive"} onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
