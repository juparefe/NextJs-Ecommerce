import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import styles from "./OrderSummary.module.scss";
import { basketCtrl } from "@/api/basket";
import { useAuth } from "@/hooks";
import { ProductI } from "@/utils";

export function OrderSummary(props: any) {
  const { products, nextStep, btnText, nextDisabled = false } = props;
  const [total, setTotal] = useState(0);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let totalTemp = 0;
    products.forEach((product: ProductI) => {
      totalTemp += Number(product.prodPrice) * Number(product.quantity);
    });
    setTotal(totalTemp);
  }, [products]);

  // Si el usuario esta logeado va al siguiente paso del carrito de compras y sino va al login
  const goToNextStep = () => {
    if (user && Object.keys(user).length > 0) {
      router.replace({ query: { ...router.query, step: nextStep } });
    } else {
      router.push("/join/login");
    }
  };

  if (!total) return null;

  return (
    <div className={styles.container}>
      <h2>Resumen:</h2>

      <div className={styles.prices}>
        <div>
          <span>Total ({basketCtrl.count()} productos):</span>
          <span>{total.toFixed(2)}€</span>
        </div>
      </div>

      <Button primary fluid className={styles.btn} disabled={nextDisabled} onClick={goToNextStep}>
        {btnText}
      </Button>
    </div>
  );
}
