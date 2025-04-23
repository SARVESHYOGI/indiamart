import PaymentPage from "@/components/PaymentPage";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <>
      <PaymentPage payId={id} />
    </>
  );
}

export default page;
