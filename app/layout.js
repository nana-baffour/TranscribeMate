
import AuthProvider from "@/components/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import "./globals.css";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800" rel="stylesheet" />
      </head>
      <body >
        <AuthProvider>
          <Navbar />
          <Toaster />
          <main className=' max-w-full m-0 p-0 bg-white'>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
