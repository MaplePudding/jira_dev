import { useLocation } from "react-router";

export const useCurProjectId = () => {
  const location = useLocation();
  let res = location.pathname.match(/projects\/(\d+)/);
  if (res && res.length >= 1) {
    return res[1];
  } else {
    return null;
  }
};
