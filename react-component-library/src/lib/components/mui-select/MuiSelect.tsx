import React, { useMemo, useState } from "react";

import styles from "./MuiSelect.module.css";

type Option = {
  key: string;
  text: string;
  value: string;
};

type SimpleSelect = {
  multiple: false;
  value: string;
  onChange: (newValue: string) => void;
};

type MultipleSelect = {
  multiple: true;
  value: string[];
  onChange: (newValues: string[]) => void;
};

type MuiSelectProps = (SimpleSelect | MultipleSelect) & {
  options: Option[];
  placeholder?: string;
};

const MuiSelect: React.FC<MuiSelectProps> = ({
  multiple = false,
  value,
  onChange,
  options,
  placeholder,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setShowOptions(true);
    setIsFocus(true);
  };

  const handleBlur = () => {
    setShowOptions(false);
    setIsFocus(false);
  };

  const getDisplayedValue = () => {
    return multiple ? (value as string[]).join(", ") : value;
  };

  const selectOptions = useMemo(() => {
    return options.map((option) => {
      return (
        <span key={option.key} className={styles.option}>
          {option.text}
        </span>
      );
    });
  }, [options]);

  return (
    <div
      className={`${styles.muiSelect} ${isFocus ? styles.focus : ""}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {placeholder && !value && (
        <span className={styles.placeholder}>{placeholder} </span>
      )}
      {value && <span className={styles.value}>{getDisplayedValue()}</span>}
      <div className={`${styles.options} ${showOptions ? styles.show : ""}`}>
        {selectOptions}
      </div>
    </div>
  );
};

export default MuiSelect;
