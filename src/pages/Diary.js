import { useParams } from "react-router-dom";

const Diary = () => {
  // useParams를 이용하면 전달받아서 들어오게 되는 path variable (id)들을 모아서 객체로 갖다 주게 됨
  const { id } = useParams();
  console.log(id);

  return (
    <div>
      <h1>Diary</h1>
      <p>이곳은 일기 상세 페이지 입니다</p>
    </div>
  );
};

export default Diary;
