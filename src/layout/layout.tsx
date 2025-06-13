import { usePathname } from "next/navigation";
import CustomNavbar from "./navbar";
import Sidebar from "./sidebar";

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const path = usePathname()

    return (
        <div className="flex flex-col min-h-screen bg-no-repeat bg-center">
            <CustomNavbar />
            <main className="flex-grow bg-casino bg-cover flex">
                <Sidebar />
                <div className="bg-black/80 w-full">
                    {children}
                </div>
            </main>
            <footer className="bg-black text-white p-4 text-center">
                <p>&copy; 2025 www.fasagame.com</p>
            </footer>
        </div>
    )
}


export default Layout;