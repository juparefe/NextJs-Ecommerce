import { Icon, Image, Dropdown } from "semantic-ui-react";
import styles from "./ListProducts.module.scss";
import { useBasket } from "@/hooks";
import { ProductI } from "@/utils";
import { fn } from "@/utils/functions";

export function ListProducts(props: any) {
  const { products } = props;
  const { changeQuantityItem, deleteItem } = useBasket();

  const options = Array.from({ length: 50 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Cesta</h2>

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
              <span>{product.prodPrice}€</span>
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
