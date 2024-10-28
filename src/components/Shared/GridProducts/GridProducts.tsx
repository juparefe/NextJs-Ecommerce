import classNames from "classnames";
import styles from "./GridProducts.module.scss";
import { Product } from "./Product";
import { Loading, NoResult, Separator } from '@/components/Shared';
import { useAuth } from "@/hooks";

export function GridProducts(props: any) {
  const { products, columns = 4, classProduct } = props;
  const { currencyObject } = useAuth();

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
            <Product product={product} classProduct={classProduct} currencyObject={currencyObject} />
          </div>
        ))}
      </div>
    </>
  );
}
