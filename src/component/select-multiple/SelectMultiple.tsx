import { useState, useEffect, useRef } from "react";
import styles from "./module/SelectMultiple.module.css";

export type SelectOptions = {
  label: string;
  value: string | number;
};

type SingleSelect = {
  multiple?: false;
  values?: SelectOptions;
  onChange: (values: SelectOptions | undefined) => void;
};

type MultipleSelect = {
  multiple: true;
  values: SelectOptions[];
  onChange: (values: SelectOptions[]) => void;
};

type SelectMultipleProps = {
  options: SelectOptions[];
} & (SingleSelect | MultipleSelect);

export function SelectMultiple({
  multiple,
  options,
  values,
  onChange,
}: SelectMultipleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOptions = (e: SelectOptions) => {
    if (e !== values) {
      if (multiple) {
        if (values?.includes(e)) {
          onChange(values.filter((o) => o !== e));
        } else {
          onChange([...values, e]);
        }
      } else {
        onChange(e);
      }
      setIsOpen(false);
    }
  };

  const optionSelected = (e: SelectOptions) => {
    return multiple ? values.includes(e) : e === values;
  };

  useEffect(() => {
    setIsHighlighted(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen) selectOptions(options[isHighlighted]);
          break;
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newIndexHighlighted =
            isHighlighted + (e.code === "ArrowUp" ? -1 : +1);
          if (
            newIndexHighlighted >= 0 &&
            newIndexHighlighted < options.length
          ) {
            setIsHighlighted(newIndexHighlighted);
          }
          break;
        }
        case "Escape":
          setIsOpen(false);
          break
      }
    };

    containerRef.current?.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [isOpen, isHighlighted, options]);

  return (
    <div
      ref={containerRef}
      onClick={() => setIsOpen((prevState) => !prevState)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? values.map((v) => (
              <button
                key={v.value}
                className={styles["option-badge"]}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOptions(v);
                }}
              >
                {v.label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : values?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, i) => (
          <li
            onMouseEnter={() => setIsHighlighted(i)}
            onClick={(e) => {
              e.stopPropagation();
              selectOptions(option);
            }}
            key={option.value}
            className={`${styles.option} ${
              optionSelected(option) ? styles.selected : ""
            } ${isHighlighted === i ? styles.highlighted : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
