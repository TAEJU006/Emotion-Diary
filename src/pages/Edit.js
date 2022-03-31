import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  //path variable을 Edit 컴포넌트에서 받아와야 함
  // 현재 전달받은 아이디를 꺼내줌
  const { id } = useParams();

  // DiaryStateContext가 제공하는 DiaryList를 받아옴
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  //id가 변하거나 DiaryList가 변할때만 꺼내오도록 작성
  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        //useParams를 통해서 받은 아이디가 숫자가 아니라 문자일 수 있으므로 형변환
        (it) => parseInt(it.id) === parseInt(id)
      );

      //undefined일 경우엔 falsy한 속성을 갖어서 if문에서 거짓으로 분류, 객체의 값이 들어오면 truthy
      if (targetDiary) {
        setOriginData(targetDiary);
        // targerDiary가 있을때 origin 데이터 값으로 초기화
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);

  return (
    <div>
      {/* originData가 있으면 DiaryList 렌더 */}
      {/* DiaryEditor에서는 isEdit과 originData를 받아서 수정 폼으로 변환 */}
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
