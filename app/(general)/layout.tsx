import Navbar from "@/components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function generalLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
     <main>
     <Navbar></Navbar>

      {children}
    </main>
    </>
  );
}