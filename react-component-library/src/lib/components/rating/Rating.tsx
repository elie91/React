import React, { useEffect, useMemo, useRef, useState } from "react";

import styles from "./Rating.module.css";

interface RatingProps {
  value?: number;
  onChange?: (newValue: number) => void;
  name: string;
  max?: number;
}

const Rating: React.FC<RatingProps> = ({
  value: propsValue,
  onChange,
  name,
  max = 5,
}) => {
  const [value, setValue] = useState(propsValue || 0);
  const [hoverValue, setHoverValue] = useState(0);

  const handleStarClick = (index: number) => {
    setValue(index);
  };

  const handleMouseEnter = (index: number) => {
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const starsIcons = useMemo(() => {
    const stars = [];
    for (let i = 1; i <= max; i++) {
      stars.push(
        <Star
          key={i}
          index={i}
          onClick={handleStarClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          isFull={i <= value || i <= hoverValue}
        />
      );
    }
    return stars;
  }, [max, value, hoverValue]);

  return (
    <div className={styles.rating} id={name}>
      {starsIcons}
    </div>
  );
};

interface StarProps {
  isFull: boolean;
  index: number;
  onClick: (index: number) => void;
  onMouseEnter: (index: number) => void;
  onMouseLeave: (index: number) => void;
}

const Star: React.FC<StarProps> = ({
  isFull,
  index,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.add(styles.starIcon);
      if (isFull) {
        ref.current.classList.add(styles.full);
      } else {
        ref.current.classList.remove(styles.full);
      }
    }
  }, [isFull]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave(index)}
      onClick={() => onClick(index)}
    >
      ☆
    </span>
  );
};

export default Rating;
