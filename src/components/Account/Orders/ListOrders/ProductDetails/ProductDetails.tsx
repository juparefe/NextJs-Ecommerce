import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import styles from "./ProductDetails.module.scss";
import { productCtrl } from "@/api";
import { Loading } from "@/components/Shared";
import { ProductI } from "@/utils";
import { fn } from "@/utils/functions";

export function ProductsDetails(props: any) {
  const { productsOrder } = props;
  const [products, setProducts] = useState<ProductI[]>([]);
  const [loading, setLoading] = useState(false);

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
      {products.map((product) => (
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
            {product.quantity} x {product.prodPrice}€
          </p>
        </div>
      ))}
    </div>
  );
}
