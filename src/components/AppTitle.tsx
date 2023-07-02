import AnimationSharpIcon from "@mui/icons-material/AnimationSharp";
import { useNavigate } from "react-router-dom";
// interface Props {
//   size?: string | null;
// }

function AppTitle({}) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigate("/");
        }}
      >
        <span style={{ fontSize: "20px" }}>Buisness</span>
        <AnimationSharpIcon sx={{ color: "#d4af37" }} />
      </div>
    </>
  );
}

export default AppTitle;
