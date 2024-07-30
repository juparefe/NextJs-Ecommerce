import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { productCtrl } from "@/api";
import { Basket } from "@/components/Basket";
import { Loading, NoResult } from "@/components/Shared";
import { useBasket } from "@/hooks";
import { BasketLayout } from "@/layouts";
import { ProductI } from "@/utils";

export default function BasketPage() {
  // En este basket viene un array de objetos con el id y la cantidad de cada producto
  const { basket } = useBasket();
  const [products, setProducts] = useState<ProductI[]>([]);
  const [address, setAddress] = useState(null);

  // Para recuperar el step en el query y asignarlo a una variable
  const {
    query: { step = 1 }
  } = useRouter();
  const currentStep = Number(step);

  // Este useEfect recorre el array y asigna la informacion para cada producto
  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of basket) {
          if (Number(item.id)) {
            const response = await productCtrl.getById(item.id);
            data.push({ ...response, quantity: item.quantity });
          }
        }
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [basket]);

  return (
    <BasketLayout>
      {!products && currentStep !== 4 && <Loading />}
      {products && products.length === 0 && currentStep < 4 && (
        <NoResult text="Carrito vacio" />
      )}
      {products.length > 0 && currentStep === 1 && (
        <Basket.StepOne products={products} />
      )}
      {products.length > 0 && currentStep === 2 && (
        <Basket.StepTwo
          products={products}
          address={address}
          setAddress={setAddress}
          nextDisabled={!address}
        />
      )}
      {products.length > 0 && currentStep === 3 && (
        <Basket.StepThree products={products} address={address} />
      )}
      {currentStep === 4 && <Basket.StepFour />}
    </BasketLayout>
  );
}
