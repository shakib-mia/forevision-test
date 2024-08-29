import React, { useEffect, useState } from "react";
import styles from "./TimerCircle.module.css"; // Import the CSS module

const TimerCircle = () => {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.circle}>
        <div className={`${styles.mask} ${styles.full}`}>
          <div className={styles.fill}></div>
        </div>
        <div className={`${styles.mask} ${styles.half}`}>
          <div className={styles.fill}></div>
          <div className={`${styles.fill} ${styles.fix}`}></div>
        </div>
        <div className={styles.insideCircle}>
          {timeLeft} {/* Display the remaining time */}
        </div>
      </div>
    </div>
  );
};

export default TimerCircle;
