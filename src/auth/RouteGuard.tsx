import { Navigate } from "react-router-dom";
import { verifyBiz, verifyToken } from "./TokenManager";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  level?: number;
}

const guardLevelFunc = (level: number) => {
  if (level === 1) {
    return verifyToken();
  }
  if (level === 2) {
    return verifyBiz();
  } else {
    return false;
  }
};

function RouteGuard({ children, level = 1 }: Props) {
  return guardLevelFunc(level) ? <>{children}</> : <Navigate to="/login" replace={true} />;
}

export default RouteGuard;
