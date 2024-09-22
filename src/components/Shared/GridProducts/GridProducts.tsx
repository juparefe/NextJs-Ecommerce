import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./GridProducts.module.scss";
import { Product } from "./Product";
import { Loading, NoResult, Separator } from '@/components/Shared';
import { useBasket } from "@/hooks";
import { Constants, CurrencyRateI } from "@/utils";

export function GridProducts(props: any) {
  const { products, columns = 4, classProduct } = props;
  const [currencyRate, setCurrencyRate] = useState<CurrencyRateI>(Constants.DEFAULT_CURRENCY);
  const { getCurrencies } = useBasket();

  useEffect(() => {
		// Obtener las tasas de cambio de las monedas al montar el componente
		(async () => {
		  try {
			const currency = await getCurrencies(); // Espera a obtener las tasas de cambio
			setCurrencyRate(currency); // Almacena las tasas en el estado
      console.log("products", products);
		  } catch (error) {
			console.error("Error obteniendo las tasas de cambio", error);
		  }
		})();
	}, []);

  if (!products) {
    return (
      <>
        <Separator height={50} />
        <Loading text="Cargando productos" />
        <Separator height={50} />
      </>
    );
  }

  if (products.length === 0) {
    return <NoResult text="No se han encontrado resultados" />;
  }
  return (
    <>
      <div className={styles.container}>
        {products.map((product: any) => (
          <div
            key={product.prodID}
            className={classNames({
              [styles.oneColumn]: columns === 1,
              [styles.twoColumns]: columns === 2,
              [styles.threeColumns]: columns === 3,
              [styles.fourColumns]: columns === 4,
              [styles.fiveColumns]: columns === 5,
              [styles.sixColumns]: columns === 6
            })}
          >
            <Product product={product} classProduct={classProduct} currencyRate={currencyRate} />
          </div>
        ))}
      </div>
    </>
  );
}
