import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Forces page to scroll to top
  }, [pathname]); // Runs every time the pathname changes

  return null;
};

export default ScrollToTop;
