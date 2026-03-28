import NavigationBar from "./components/general/NavigationBar";

export default function Home() {
  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ];

  return (
    <>
      <NavigationBar navLinks={navLinks} />
      <main className="container mx-auto px-4 md:px-6 py-8"></main>
    </>
  );
}
