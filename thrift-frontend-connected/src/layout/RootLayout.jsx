import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header/Header";
import CartDrawer from "../components/CartDrawer";

export default function RootLayout() {
  return (
    <div className="appShell">
      <AnnouncementBar />
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <CartDrawer />
      <footer className="footer">© ThriftStore (Demo)</footer>
    </div>
  );
}
