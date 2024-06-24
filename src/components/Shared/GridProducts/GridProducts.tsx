
import { Loading } from "../Loader";
import { NoResult } from "../NoResult";
import { Separator } from "../Separator";
import styles from "./GridProducts.module.scss";

export function GridProducts(props: any) {
  const { products, columns = 4, classProduct } = props;

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
    <div className={styles.container}>
      {products.map((product: any) => (
        <div
          key={product.prodID}
          className='<p></p>'
        >
          <h2>Products</h2>
        </div>
      ))}
    </div>
  );
}
