import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import styles from "./ProductDetails.module.scss";
import { productCtrl } from "@/api";
import { Loading } from "@/components/Shared";
import { useBasket } from "@/hooks";
import { CurrencyRateI, ProductI } from "@/utils";
import { fn } from "@/utils/functions";

export function ProductsDetails(props: any) {
  const { productsOrder } = props;
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState(false);
  const [currencyRate, setCurrencyRate] = useState<CurrencyRateI>({
    currencyLastSymbol: '',
    currencyRate: 1,
    currencySymbol: ''
  });
  const { getCurrencies } = useBasket();

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
    (async () => {
      try {
        setLoading(true);
        const productsTemp = [];
        for await (const item of productsOrder) {
          const response = await productCtrl.getById(item.odProdId);
          productsTemp.push({ ...response, quantity: item.odQuantity });
        }
        setProducts(productsTemp);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    })();
  }, [productsOrder]);

  if (loading) return <Loading text="Cargando productos" />;

  return (
    <div>
      {products.map((product) => {
        const productPrice = Number(product.prodPrice) * currencyRate.currencyRate;
        product.prodPrice = productPrice.toFixed(2);

        return (
          <div key={product.prodId} className={styles.product}>
            <div>
              <Image
                src={fn.getUrlImage(product.prodId)}
                alt={product.prodTitle}
              />
              <div>
                <h4>{product.prodTitle}</h4>
              </div>
            </div>

            <p className={styles.price}>
              {product.quantity} x {currencyRate.currencySymbol}{product.prodPrice}{currencyRate.currencyLastSymbol}
            </p>
          </div>
        );
      })}
    </div>
  );
}
