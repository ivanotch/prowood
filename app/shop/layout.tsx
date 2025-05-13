import CartInitializer from "../components/providers/CartInitializer";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CartInitializer />
      {children}
    </>
  );
}