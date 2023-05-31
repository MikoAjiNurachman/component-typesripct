import styles from "./module/FormStepper.module.css";

export type Stepper = {
  customKey?: string | number;
  active: boolean;
  label: string;
};

type StepperProps = {
  stepperList: Stepper[];
};

export function FormStepper({ stepperList }: StepperProps) {
  return (
    <div className={styles.container}>
      <div className={styles.stepper}>
        <div className={styles["stepper-list"]}>
          {stepperList.map((v, i) => (
            <div key={`stepper-item ${i}`}>
              <div className={styles["stepper-item"]}>
              {
                i !== 0 ? (<div className={`${styles["stepper-connector"]} ${v.active ? styles["stepper-connector-active"] : ''}`}></div>) : ''
              }
                <div className={`${styles["stepper-header"]} ${v.active ? styles["stepper-header-active"] : ''}`}>
                  {v.customKey ? v.customKey : i + 1}
                </div>
                <span className={styles["stepper-text"]}>{v.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
