import { useEffect } from "react";
import DiaryEditor from "../components/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `feeling diary - new diary`;
  }, []);

  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
