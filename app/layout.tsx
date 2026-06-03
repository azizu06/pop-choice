import "./globals.css";
import { Carter_One, Roboto_Slab } from "next/font/google";

const carterOne = Carter_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-carter-one",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${carterOne.variable} ${robotoSlab.variable}`}>
        {children}
      </body>
    </html>
  );
}
