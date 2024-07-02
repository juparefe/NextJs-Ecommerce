import { GetServerSidePropsContext } from 'next';
import { useState, useEffect } from "react";
import { Container, Image } from "semantic-ui-react";
import styles from "./product.module.scss";
import { productCtrl } from "@/api";
import { Product } from "@/components/Product";
import { Separator } from "@/components/Shared";
import { BasicLayout } from "@/layouts";
import { Constants } from '@/utils';
import { fn } from "@/utils/functions";

export default function ProductPage(props: any) {
  const { product } = props;
  const [image, setImage] = useState(Constants.NOT_FOUND_IMAGE);

  useEffect(() => {
    const imageUrl = fn.getUrlImage(product.prodId);
    fn.checkIfImageExists(imageUrl, (exists: boolean) => {
      if (exists) setImage(imageUrl);
    });
  }, [product]);

  return (
    <BasicLayout>
      <Container>
        <div className={styles.product}>
          <div>
            <Image src={image} alt={product.prodTitle} />
          </div>
          <div>
            <Product.Info product={product} />
          </div>
        </div>

        <Separator height={20} />
        <h3>Descripcion:</h3>
        <Product.Description product={product} />
      </Container>

      <Separator height={50} />
    </BasicLayout>
  );
}

// Esta funcion se ejecuta en el lado del servidor y no en el navegador
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { params, query } = context;
    const { slug } = params as { slug: string };
    const { search } = query;

  if (search) return { props: { product: "" } };

  try {
    const response = await productCtrl.getBySlug(slug);
    return { props: { product: response } };
  } catch (error) {
    return { props: { notFound: true } };
  }
}
