import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  // 페이지를 이동시킬 수 있는 함수를 하나 반환
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id : ", id);

  const mode = searchParams.get("mode");
  console.log("mode : ", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 작성 페이지 입니다</p>
      <button onClick={() => setSearchParams({ who: "taejukim" })}>
        QS 바꾸기
      </button>

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        home으로 가기
      </button>

      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로가기
      </button>
    </div>
  );
};

export default Edit;
