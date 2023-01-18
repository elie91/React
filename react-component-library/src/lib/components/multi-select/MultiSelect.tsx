import React, { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./MultiSelect.module.css";

type Option = {
  key: string;
  text: string;
  value: string;
};

interface MultiSelectProps {
  placeholder: string;
  options: Option[];
  value?: string[];
  onChange?: (newValues: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  placeholder,
  value,
  onChange,
}) => {
  const isControlled = !!value && !!onChange;

  const [showOptions, setShowOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    if (!isControlled) {
      return;
    }
    setSelectedOptions(value);
  }, [value, isControlled]);

  const optionsById = useMemo(() => {
    console.log("IN optionsById");
    const optionsMap: Record<string, Option> = {};
    options.forEach((option) => (optionsMap[option.value] = option));
    return optionsMap;
  }, [options]);

  const selectedOptionsById = useMemo(() => {
    console.log("IN selectedOptionsById");
    const selectedOptionsMap: Record<string, string> = {};
    selectedOptions.forEach((option) => (selectedOptionsMap[option] = option));
    return selectedOptionsMap;
  }, [selectedOptions]);

  const handleAddOption = (key: string) => {
    const newValues = [...selectedOptions, key];
    if (isControlled) {
      onChange(newValues);
    } else {
      setSelectedOptions(newValues);
    }
  };

  const handleRemoveOption = (key: string) => {
    const newValues = selectedOptions.filter((option) => option !== key);
    console.log({ newValues });
    if (isControlled) {
      onChange(newValues);
    } else {
      setSelectedOptions(newValues);
    }
  };

  const multiSelectOptions = useMemo(() => {
    return options.map((option) => {
      const isSelected = !!selectedOptionsById[option.value];
      return (
        <span
          className={`${styles.option} ${isSelected ? styles.selected : ""}`}
          key={option.key}
          onClick={() => {
            if (!isSelected) {
              handleAddOption(option.key);
            }
          }}
        >
          {option.text}
        </span>
      );
    });
  }, [options, selectedOptionsById]);

  return (
    <div
      className={styles.multiSelect}
      onFocus={() => setShowOptions(true)}
      onBlur={() => setShowOptions(false)}
      tabIndex={-1}
    >
      {!selectedOptions.length ? (
        <span className={styles.placeholder}>{placeholder}</span>
      ) : (
        <div className={styles.selectedOptions}>
          {selectedOptions.map((option) => (
            <SelectedOption
              option={optionsById[option]}
              onRemove={handleRemoveOption}
            />
          ))}
        </div>
      )}
      <div
        className={`${styles.options} ${
          showOptions ? styles.show : styles.hide
        }`}
      >
        {multiSelectOptions}
      </div>
    </div>
  );
};

interface SelectedOptionProps {
  option: Option;
  onRemove: (key: string) => void;
}

const SelectedOption: React.FC<SelectedOptionProps> = ({
  option,
  onRemove,
}) => {
  return (
    <div className={styles.selectedOption}>
      <span>{option.text}</span>
      <i className="ri-close-line" onClick={() => onRemove(option.key)} />
    </div>
  );
};

export default MultiSelect;
