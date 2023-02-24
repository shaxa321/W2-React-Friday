import React, { useState, useEffect } from "react";

export const CurrentTime = () => {
  let [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <p className="subText">{date.toLocaleTimeString()}</p>
    </div>
  );
};

export default CurrentTime;
