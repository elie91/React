import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import styles from "./Autocomplete.module.css";

interface AutocompleteProps {
  options: { key: string; text: string }[];
  placeholder?: string;
  value?: string;
}

const debounce = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, delay);
  };
};

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  placeholder,
  value,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [userInput, setUserInput] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleClick = (event: any) => {
      if (containerRef.current) {
        setShowOptions(containerRef.current.contains(event.target));
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleOptionClick = (key: string) => {
    setInputValue(key);
    setShowOptions(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    startTransition(() => {
      setUserInput(event.target.value);
    });
  };

  const displayedOptions = useMemo(() => {
    return options.filter((option) =>
      option.text.toLowerCase().includes(userInput.toLowerCase())
    );
  }, [userInput, options]);

  const autocompleteOptions = useMemo(() => {
    return displayedOptions.map((option) => {
      const isSelected = option.key === inputValue;
      return (
        <span
          className={`${styles.option} ${
            isSelected ? styles.activeOption : ""
          }`}
          key={option.key}
          onClick={() => handleOptionClick(option.key)}
        >
          {option.text}
        </span>
      );
    });
  }, [displayedOptions, inputValue]);

  return (
    <div ref={containerRef} className={styles.autocomplete}>
      {showOptions && (
        <div className={styles.options}>{autocompleteOptions}</div>
      )}

      <input
        value={inputValue}
        placeholder={placeholder || ""}
        type="text"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Autocomplete;
