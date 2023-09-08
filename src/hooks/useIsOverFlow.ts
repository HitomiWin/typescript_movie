import { useLayoutEffect, useState, MutableRefObject } from "react";
interface Props {
  readonly ref: MutableRefObject<HTMLDivElement>;
  readonly callback: Callback;
}

interface Callback {
  (callback: boolean): void;
}

export const useIsOverflow = ({ ref, callback }: Props) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    const { current } = ref;
    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;

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
