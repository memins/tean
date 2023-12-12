import Navbar from "./navbar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col items-center my-4">
      <Navbar />
      <main className="py-4 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
