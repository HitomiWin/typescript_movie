import { useEffect, useState } from "react";
export const useGetHeight = (className: string) => {
  const [height, setHeight] = useState<number | null>(null);
  const box = document.querySelector(`.${className}`);
  useEffect(() => {
    setHeight(box ? box.clientHeight : null);
  }, [box]);
  return height;
};
