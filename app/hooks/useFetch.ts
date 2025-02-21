import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);

  return data;
};
