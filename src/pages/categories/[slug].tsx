import { GetServerSidePropsContext } from 'next';
import { Container } from "semantic-ui-react";
import styles from "./category.module.scss";
import { productCtrl } from "@/api";
import { Separator, GridProducts, Pagination } from "@/components/Shared";
import { BasicLayout } from "@/layouts";

interface CategoryPageProps {
    products: any[];
    pagination: {
      page: number;
      totalPages: number;
    };
}

export default function CategoryPage(props: CategoryPageProps) {
  const { products, pagination } = props;
  const { page, totalPages } = pagination;

  return (
    <BasicLayout>
      <Container>
        <Separator height={20} />

        <GridProducts products={products} classProduct={styles.product} />
        { products.length > 0 && (
          <Pagination currentPage={page} totalPages={totalPages} />
        )}
      </Container>
    </BasicLayout>
  );
}

// Esta funcion se ejecuta en el lado del servidor y no en el navegador
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params, query } = context;
  const { slug } = params as { slug: string };
  const { page = 1, search } = query;
  const ITEMS_PER_PAGE = 10;

  if (search) {
    return { props: { pagination: "", products: "" } };
  }

  try {
    const response = await productCtrl.getByCategorySlug(
      slug,
      +page,
      ITEMS_PER_PAGE
    );

    const products = response.data || [];
    const totalPages = Math.ceil(response.totalItems / ITEMS_PER_PAGE);
    const pagination = { page, totalPages };

    return { props: { pagination, products } };
  } catch (error) {
    return { props: { notFound: true } };
  }
}
