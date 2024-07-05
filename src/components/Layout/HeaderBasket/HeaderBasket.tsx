import classNames from "classnames";
import { useRouter } from "next/router";
import { Icon } from "semantic-ui-react";
import { Logo } from "../Logo";
import styles from "./HeaderBasket.module.scss";
import { Constants } from "@/utils";

export function HeaderBasket() {
  const {
    query: { step = 1 }
  } = useRouter();
  const currentStep = Number(step);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Logo />
      </div>

      <div className={styles.center}>
        {Constants.STEPS.map((item) => (
          <div
            key={item.number}
            className={classNames({
              [styles.active]: item.number === currentStep,
              [styles.success]: item.number < currentStep
            })}
          >
            <span className={styles.number}>
              <Icon name="check" />
              {item.number}
            </span>
            <span>{item.title}</span>
            <span className={styles.space} />
          </div>
        ))}
      </div>

      <div className={styles.right} />
    </div>
  );
}
