export function Description(props: any) {
    const { product } = props;

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: product.prodDescription }} />
      </div>
    );
}
