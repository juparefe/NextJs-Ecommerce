import classNames from "classnames";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import styles from "./Product.module.scss";
import { Constants } from "@/utils";
import { fn } from "@/utils/functions";

export function Product(props: any) {
  const { product, classProduct } = props;
  const [image, setImage] = useState(Constants.NOT_FOUND_IMAGE);
  const lowStock = product.prodStock > 0 && product.prodStock < 10;

  useEffect(() => {
    const imageUrl = fn.getUrlImage(product.prodId);
    fn.checkIfImageExists(imageUrl, (exists: boolean) => {
      if (exists) setImage(imageUrl);
    });
  }, [product]);

  return (
    <div
      className={classNames(styles.container, {
        [classProduct]: classProduct
      })}
    >
      <Link className={styles.link} href={`/product/${product.prodPath}`}>
        <div className={styles.content}>
          <Image src={image} alt={product.prodTitle} className={styles.image}/>
          <h3 className={styles.title}>{product.prodTitle}</h3>

          <div className={styles.footer}>
            <span className={styles.price}>$ {product.prodPrice}</span>
          </div>

          {lowStock && (
            <p className={styles.lowStock}>
              {`Solo quedan ${product.prodStock} unidades`}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
