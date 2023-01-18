import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import styles from "./Autocomplete.module.css";

interface Option {
  id: string;
  label: string;
}

interface AutocompleteProps {
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

interface AutocompleteState {
  isFocus: boolean;
  searchQuery: string;
  selectedOptionId: string | null;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder,
  options,
  value,
  onChange,
}) => {
  const isControlled = value !== undefined && onChange !== undefined;

  const [inputValue, setInputValue] = useState("");
  const [state, setState] = useState<AutocompleteState>({
    isFocus: false,
    searchQuery: "",
    selectedOptionId: "",
  });
  const startTransition = useTransition()[1];

  const optionsLabelById = useMemo(() => {
    const optionsMap: Record<string, string> = {};
    options.forEach((option) => {
      optionsMap[option.id] = option.label;
    });
    return optionsMap;
  }, [options]);

  useEffect(() => {
    if (value && isControlled) {
      setInputValue(value);
      setState((previousState) => ({
        ...previousState,
        selectedOptionId: value,
      }));
    }
  }, [value, isControlled]);

  const handleFocus = () => {
    setState((previousState) => ({
      ...previousState,
      isFocus: true,
    }));
  };

  const handleBlur = () => {
    setState((previousState) => ({
      ...previousState,
      isFocus: false,
      searchQuery: "",
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    startTransition(() => {
      setState((previousState) => ({
        ...previousState,
        searchQuery: value,
        selectedOptionId: null,
      }));
    });
  };

  const handleOptionClick = useCallback(
    (key: string) => {
      setState((previousState) => ({
        ...previousState,
        isFocus: false,
        ...(!isControlled && {
          selectedOptionId: key,
        }),
      }));
      setInputValue(optionsLabelById[key]);
      if (onChange) {
        onChange(key);
      }
    },
    [isControlled, onChange, optionsLabelById]
  );

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().startsWith(state.searchQuery.toLowerCase())
    );
  }, [state.searchQuery, options]);

  const autocompleteOptions = useMemo(() => {
    return filteredOptions.map((option) => (
      <span
        key={option.id}
        className={`${styles.option} ${
          option.id === state.selectedOptionId ? styles.selected : ""
        }`}
        onClick={() => handleOptionClick(option.id)}
      >
        {option.label}
      </span>
    ));
  }, [filteredOptions, state.selectedOptionId, handleOptionClick]);

  return (
    <div
      className={styles.autocomplete}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      <input
        type="text"
        className={`${styles.input} ${state.isFocus ? styles.focus : ""}`}
        placeholder={placeholder || ""}
        onChange={handleInputChange}
        value={inputValue}
      />
      <div className={`${styles.options} ${state.isFocus ? styles.show : ""}`}>
        {autocompleteOptions}
      </div>
    </div>
  );
};

export default Autocomplete;
