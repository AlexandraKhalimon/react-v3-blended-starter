import style from "./Loader.module.css";
import { ClimbingBoxLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <ClimbingBoxLoader color="#172ac3" size={21} />
    </div>
  );
}
