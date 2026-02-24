import { useState } from "react";

export const Capybara: React.FC<{ correct: boolean }> = ({ correct }) => {
  const [imgNum, setImgNum] = useState(2);
  setTimeout(() => setImgNum(3 - imgNum), 750);
  const src = correct
    ? `/happy_capybara${imgNum}.svg`
    : `/sad_capybara${imgNum}.svg`;

  return <img src={src} className="w-32 justify-self-end" />;
};
