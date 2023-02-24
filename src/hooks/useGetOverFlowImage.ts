import { useLayoutEffect, useState, MutableRefObject } from "react";
interface Props {
  ref: MutableRefObject<HTMLDivElement>;
  callback: Callback;
}
interface Callback {
  (callback: boolean): void;
}

export const useGetOverFlowImage = ({ ref, callback }: Props) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      const box = document.querySelector(`.${current.className}`);
      console.log(box?.clientHeight);
      const hasOverflow = box && box.clientHeight > 650 ? true : false;
      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
      }

      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
