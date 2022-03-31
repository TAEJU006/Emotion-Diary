const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}) => {
  return (
    // onClick에서 발생한 emotion_id를 DiaryEditor 컴포넌트에 handleClickEmote가 emotion이라는 이름으로 전달을 받아서 setEmotion을 수행해서 emotion상태를 바꿔줌
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
