import ProductDetails from "@/components/ProductDetails";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <ProductDetails productId={id} />
    </div>
  );
}

export default page;
