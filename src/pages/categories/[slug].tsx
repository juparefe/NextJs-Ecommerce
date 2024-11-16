import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { Container } from "semantic-ui-react";
import styles from "./category.module.scss";
import { productCtrl } from "@/api";
import { Separator, GridProducts, Pagination } from "@/components/Shared";
import { useWindowSize } from '@/hooks';
import { BasicLayout } from "@/layouts";

interface CategoryPageProps {
    products: any[];
    pagination: {
      page: number;
      totalPages: number;
    };
}

export default function CategoryPage(props: CategoryPageProps) {
  const { products, pagination = { page: 1, totalPages: 1 } } = props;
  let { page, totalPages } = pagination;
  const { windowSize } = useWindowSize();
  const [columns, setColumns] = useState(4);

  useEffect(() => {
    if (windowSize && windowSize.width < 600) {
      if(columns !== 2) {setColumns(2);}
    } else if (windowSize && windowSize.width < 900) {
      if(columns !== 3) {setColumns(3);}
    } else {
      if(columns !== 4) {setColumns(4);}
    }
  }, [windowSize]);

  const handlePageChange = (newPage: number) => {
    console.log("NewPage [slug]", newPage);
  };

  return (
    <BasicLayout>
      <Container>
        <Separator height={20} />
        <GridProducts
          products={products}
          columns={columns}
          classProduct={styles.product} />
        { products.length > 0 && (
          <Pagination
            currentPage={page}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
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
  const ITEMS_PER_PAGE = 8;

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
