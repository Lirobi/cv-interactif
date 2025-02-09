import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ContentsManager from "./ContentsManager";

export default async function ContentsPage() {
    // Retrieve the authentication token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("adminAuth")?.value;
    if (!token) {
        redirect("/admin/login");
    }

    // Fetch all contents from the database
    const contents = await prisma.mainPageRubrique.findMany({
        orderBy: {
            order: 'asc'
        }
    });

    return (
        <>
            <Header />
            <main className="flex flex-col items-center justify-center">
                {/* Render the interactive contents manager */}
                <ContentsManager initialContents={contents} />
            </main>
            <Footer />
        </>
    );
}
