import { useEffect, useRef } from "react";
//useHandleClick
export function useOutsideClick(close, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        //ref.current it's the white page when you click on add new cabin or
        //something like that,
        //e.target when the click happend
        //contains return true if click happend in white page
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("click outside");
          close();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [close]
  );
  return { ref };
}
