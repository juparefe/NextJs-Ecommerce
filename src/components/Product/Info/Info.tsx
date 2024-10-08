import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "./Info.module.scss";
import { useBasket } from "@/hooks";
import { Constants, CurrencyRateI } from "@/utils";

export function Info(props: any) {
  const { product } = props;
  const [currencyRate, setCurrencyRate] = useState<CurrencyRateI>(Constants.DEFAULT_CURRENCY);
  const [loading, setLoading] = useState(false);
  const [available, setAvailable] = useState<boolean>(true);
  const { addBasket, basket, getCurrencies } = useBasket();
  const router = useRouter();

  useEffect(() => {
		// Obtener las tasas de cambio de las monedas al montar el componente
		(async () => {
		  try {
			const currency = await getCurrencies(); // Espera a obtener las tasas de cambio
			setCurrencyRate(currency); // Almacena las tasas en el estado
		  } catch (error) {
			console.error("Error obteniendo las tasas de cambio", error);
		  }
		})();
	}, []);

  useEffect(() => {
    const prodStock = basket.find(item => product.prodId === item.id);

    if (!prodStock) {
      setAvailable(true);
    } else {
      setAvailable(product.prodStock > prodStock.quantity);
    }
  }, [addBasket]);

  const addBasketWrapper = () => {
    setLoading(true);
    addBasket(product.prodId);

    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.prodTitle}</h1>
      {(available) && <span className={styles.stock}>
        {`Quedan ${product.prodStock} unidad/es`}
      </span>}
      <span className={styles.price}>{currencyRate.currencySymbol}{(Number(product.prodPrice) * currencyRate.currencyRate).toFixed(2)}{currencyRate.currencyLastSymbol}</span>

      {(!available) && <span className={styles.stock}>
        {`Los sentimos, no quedan unidades disponibles`}
      </span>}

      {(available) && <Button
        primary
        className={styles.btnBuy}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Añadir al carrito de compra
      </Button>}
    </div>
  );
}
