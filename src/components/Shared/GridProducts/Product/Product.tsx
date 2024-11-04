import classNames from "classnames";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Image, Label } from "semantic-ui-react";
import styles from "./Product.module.scss";
import { Constants, fn } from "@/utils";

export function Product(props: any) {
  const { product, classProduct, currencyObject } = props;
  const [discountedPrice, setDiscountedPrice] = useState('0');
  const [image, setImage] = useState(Constants.NOT_FOUND_IMAGE);
  const [price, setPrice] = useState('0');
  const lowStock = product.prodStock > 0 && product.prodStock < 10;
  const showDiscount = Number(product.prodDiscount) > 0 ? true : false;

  useEffect(() => {
    const imageUrl = fn.getUrlImage(product.prodId);
    fn.checkIfImageExists(imageUrl, (exists: boolean) => {
      if (exists) {
        setImage(imageUrl);
      } else {
        setImage(Constants.NOT_FOUND_IMAGE);
      }
    });
  }, [product]);

  useEffect(() => {
    const prodPrice = fn.formatCurrency(Number(product.prodPrice), currencyObject);
    if(Number(product.prodDiscount) > 0) {
      setDiscountedPrice(prodPrice);
      setPrice(fn.formatCurrency(Number(product.prodPrice-(product.prodPrice * (Number(product.prodDiscount)/100))), currencyObject));
    } else {
      setDiscountedPrice('0');
      setPrice(prodPrice);
    }
  }, [product]);

  return (
    <div
      className={classNames(styles.container, {
        [classProduct]: classProduct
      })}
    >
      <Link className={styles.link} href={`/product/${product.prodPath}`}>
        <div className={styles.content}>
            <Image
              alt={product.prodTitle}
              className={styles.image}
              label={
                product.prodDiscount && Number(product.prodDiscount) > 0
                  ? { color: 'teal', corner: 'right', icon: 'gift', size: 'medium' }
                  : null
              }
              src={image}
            />
          <h3 className={styles.title}>{product.prodTitle}</h3>

          <div className={styles.footer}>
            { showDiscount && (
              <Label color='teal' className={styles.discountLabel} size="mini" ribbon>
                <p className={styles.discountLabelText}>
                  {`-${product.prodDiscount}%`}
                </p>
                <p className={styles.discountedPrice}>
                  {discountedPrice}
                </p>
                <p className={styles.currentPrice}>
                  {price}
                </p>
              </Label>
            )}
            { !showDiscount && (
              <Label className={styles.discountLabel} size="mini" ribbon>
              <p className={styles.price}></p>
              <p className={styles.price}>
                {price}
              </p>
              <p className={styles.price}></p>
            </Label>
            )}
          </div>
          {lowStock && (
            <p className={styles.lowStock}>
              {`Solo quedan ${product.prodStock} unidad/es`}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
