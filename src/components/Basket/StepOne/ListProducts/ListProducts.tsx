import { Icon, Image, Dropdown } from "semantic-ui-react";
import styles from "./ListProducts.module.scss";
import { useBasket } from "@/hooks";
import { Constants, fn, ProductI } from "@/utils";

export function ListProducts(props: any) {
  const { products, currencyRate } = props;
  const { changeQuantityItem, deleteItem } = useBasket();

  const options = Array.from({ length: 20 }, (_, index) => {
    const number = index + 1;
    return { key: number, text: String(number), value: number };
  });

  return (
    <div className={styles.basket}>
      <h2>Carrito de compra</h2>

      {products.map((product: ProductI) => (
        <div key={product.prodId} className={styles.product}>
          <Image
            src={fn.getUrlImage(product.prodId)}
            alt={product.prodTitle}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              const imgElement = e.target as HTMLImageElement;
              imgElement.src = Constants.NOT_FOUND_IMAGE;}
            }
          />
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
