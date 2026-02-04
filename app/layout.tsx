import "./globals.css";

export const metadata = {
  title: "Ashutosh Sharma | AI Portfolio",
  description: "Hackathon Winning AI Portfolio deployed with Kuberns AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
