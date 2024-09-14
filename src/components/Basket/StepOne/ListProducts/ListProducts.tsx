import { useEffect, useState } from "react";
import { Icon, Image, Dropdown } from "semantic-ui-react";
import styles from "./ListProducts.module.scss";
import { useBasket } from "@/hooks";
import { CurrencyRateI, ProductI } from "@/utils";
import { fn } from "@/utils/functions";

export function ListProducts(props: any) {
  const { products } = props;
  const [currencyRate, setCurrencyRate] = useState<CurrencyRateI>({
		currencyLastSymbol: '',
		currencyRate: 1,
		currencySymbol: ''
	});
  const { changeQuantityItem, deleteItem, getCurrencies } = useBasket();

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

  const options = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Carrito de compra</h2>

      {products.map((product: ProductI) => (
        <div key={product.prodId} className={styles.product}>
          <Image src={fn.getUrlImage(product.prodId)} alt={product.prodTitle} />

          <div>
            <div className={styles.info}>
              <p>{product.prodTitle}</p>
            </div>

            <div className={styles.actions}>
              <Dropdown
                className="number"
                options={options}
                selection
                compact
                value={product.quantity}
                onChange={(_, data) =>
                  changeQuantityItem(product.prodId, String(data.value))
                }
              />
              <span>{currencyRate.currencySymbol}{(Number(product.prodPrice) * currencyRate.currencyRate).toFixed(2)}{currencyRate.currencyLastSymbol}</span>
              <Icon
                name="trash alternate outline"
                link
                onClick={() => deleteItem(product.prodId)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
