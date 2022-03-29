const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      // className은 문자열로 전달해야 해서 배열로 전달하면 안된다 => join 메서드를 통해서 띄어쓰기를 separate로 해서 합쳐줌
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};

export default MyButton;
