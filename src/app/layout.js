import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import TopBar from "@/components/navigation/TopBar";
import ReduxProvider from "@/context/ReduxProvider";

export const metadata = {
  title: "Medi Store",
  description:
    "Medi Store provides a wide range of high-quality medical supplies and health products for all your wellness needs.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <ReduxProvider>
        <TopBar />
        {children}
        <ToastContainer position="top-right" />
      </ReduxProvider>
    </html>
  );
};
export default RootLayout;
