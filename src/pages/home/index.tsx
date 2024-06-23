import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import styles from "./home.module.scss";
import { productCtrl } from "@/api";
import { GridCategories, Separator } from "@/components/Shared";
import { BasicLayout } from "@/layouts";

export default function HomePage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productCtrl.getAll(1, 100);
        setProducts(response.data || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <BasicLayout>
      <Separator height={50} />

      <Container>
	  	<GridCategories />

        <Separator height={50} />

        <h2>Últimos productos</h2>
        <Separator height={10} />
        <div>Products</div>
      </Container>
    </BasicLayout>
  );
}
