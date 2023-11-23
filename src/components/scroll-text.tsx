"use client";

import { useEffect, useState } from "react";

type ScrollTextProps = {
  texts: string[];
  order: "random";
  switchInterval: number;
  switchSpeed: number;
};

export default function ScrollText(props: ScrollTextProps) {
  const [text, setText] = useState(props.texts[0]);

  function nextText() {
    switch (props.order) {
      case "random":
        while (true) {
          const newText =
            props.texts[Math.floor(Math.random() * props.texts.length)];
          if (newText !== text) return newText;
        }
    }
  }

  useEffect(() => {
    const intv = setInterval(() => setText(nextText()), props.switchInterval);
    return () => clearTimeout(intv);
  }, []);

  const [displayText, setDisplayText] = useState(props.texts[0]);
  const [displayClass, setDisplayClass] = useState("");
  useEffect(() => {
    if (text === displayText) return;
    setDisplayClass("scale-0");
    const t = text;
    const to = setTimeout(() => {
      setDisplayText(t);
      setDisplayClass("");
    }, props.switchSpeed);
    return () => clearTimeout(to);
  }, [text]);

  return (
    <div className="inline-flex flex-col">
      <span className={"overflow-hidden transition-all " + displayClass}>
        {displayText}
      </span>
    </div>
  );
}
