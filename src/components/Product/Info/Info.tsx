import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "./Info.module.scss";
import { useBasket } from "@/hooks";
import { CurrencyRateI } from "@/utils";

export function Info(props: any) {
  const { product } = props;
  const [currencyRate, setCurrencyRate] = useState<CurrencyRateI>({
		currencyLastSymbol: '',
		currencyRate: 1,
		currencySymbol: ''
	});
  const [loading, setLoading] = useState(false);
  const { addBasket, getCurrencies } = useBasket();

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

  const addBasketWrapper = () => {
    setLoading(true);
    addBasket(product.prodId);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.prodTitle}</h1>
      <span className={styles.stock}>
        {`Quedan ${product.prodStock} unidade/s`}
      </span>
      <span className={styles.price}>{currencyRate.currencySymbol}{(Number(product.prodPrice) * currencyRate.currencyRate).toFixed(2)}{currencyRate.currencyLastSymbol}</span>

      <Button
        primary
        className={styles.btnBuy}
        onClick={addBasketWrapper}
        loading={loading}
      >
        Añadir al carrito de compra
      </Button>
    </div>
  );
}
