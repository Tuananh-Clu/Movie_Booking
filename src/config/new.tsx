import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { items } from "../types/type";

type NewsProvider = {
  SelectArticle: items;
  setSelectArticle: React.Dispatch<React.SetStateAction<items>>;
};

export const NewContext = createContext<NewsProvider>({
  SelectArticle: {
    categories: "",
    content: "",
    enclosure: {
      link: "",
      type: "",
      length: 0,
    },
    guid: "",
    link: "",
    pubDate: "",
    thumbnail: "",
    title: "",
  },
  setSelectArticle: () => {},
});

export const NewProvider = ({ children }: { children: ReactNode }) => {
  const [SelectArticle, setSelectArticle] = useState<items>({
    categories: "",
    content: "",
    enclosure: {
      link: "",
      type: "",
      length: 0,
    },
    guid: "",
    link: "",
    pubDate: "",
    thumbnail: "",
    title: "",
  });
  useEffect(()=>{
    console.log(SelectArticle)
  })

  return (
    <NewContext.Provider value={{ setSelectArticle, SelectArticle }}>
      {children}
    </NewContext.Provider>
  );
};
