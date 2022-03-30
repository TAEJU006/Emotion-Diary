import { useState } from "react";

const sortOptionList = [
  { value: "latest", name: "latest" },
  { value: "oldest", name: "oldest" },
];

// value = control 메뉴가 렌더링 하는 select가 어떤걸 선택 하고 있는지 역할
// onChange = select가 선택하는게 변화 했을때 바꿀 기능을 할 함수
// optionList = select 태그안에 들어갈 옵션
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    //onChange 이벤트가 일어나게 되면 이벤트 이벤트 객체에 target에 value를 전달해서  prop으로 받은 onChange 매서드를 실행 시키는데
    // prop으로 준 onChange 메서드는 setSortType이였기 때문에 sortType을 oldest를 선택하면 oldest가 되고, latest를 선택하면 latest가 됨
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {/* it = sortOptionList에 latest,oldest 객체를 가르킴 */}
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  // 정렬 기준을 저장할 state
  //sortType 정렬기준을 바꾸는 select의 역할
  const [sortType, setSortType] = useState("latest");

  // 최신순인지 오래된순인지 if문으로 분기를 달아서 정렬된 리스트를 반환하는 역할을 하는 함수
  const getProcessDiaryList = () => {
    // 정렬하고 하는 데이터가 배열이면 그냥 정렬이 안됨 => 비교 함수를 만들어 줘야함
    const compare = (a, b) => {
      if (sortType === "latest") {
        // 문자열이 들어올 수 있기 때문에 parseInt
        //date값을 비교해 가장 최신에 작성한게 앞
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //sort 하면 원본 배열이 정렬 되므로 copy해 사용
    // JSON.stringify(diaryList) => diaryList가 배열이어서 배열을 JSON화 시켜서 문자열로 바꿈
    // 문자열로 반환된걸 JSON.parse를 수행 시키게 되면 다시 배열로 복호화
    // diaryList에 있는 원본 배열의 값이 문자열로 바꼈다가 다시 배열로 바껴서 값만 들어옴 => DiaryList가 저장하고 있는 배열을 건드리지 않을 수 있음
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const sortedList = copyList.sort(compare);
    return sortedList;
  };

  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
