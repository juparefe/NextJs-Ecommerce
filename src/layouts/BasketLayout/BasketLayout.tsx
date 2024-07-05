import styles from "./BasketLayout.module.scss";
import { Layout } from "@/components/Layout";
import { Separator } from "@/components/Shared";

export function BasketLayout(props: any) {
  const { children } = props;

  return (
    <div className={styles.container}>
      <Layout.HeaderBasket />
      <Separator height={100} />
      {children}
    </div>
  );
}
