import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
    return (
        <div className="min-h-screen w-full flex flex-col justify-between overflow-x-hidden">
            <Header />
            <div className="flex flex-col items-center justify-center py-8 pb-16">
                <div className="flex flex-col items-center justify-center bg-background shadow-blue-50 shadow-2xl max-md:w-5/6 rounded-2xl z-50 h-fit p-10 max-sm:p-6 hover:scale-105 transition-all duration-300 ease-in-out">
                    <h1 className="text-6xl max-sm:text-4xl font-bold mb-8 text-foreground cursor-default">Contact</h1>
                    <div className="space-y-6 flex flex-col items-center justify-center">
                        <div className="grid grid-cols-2 gap-6 h-10 w-24 text-foreground">
                            <Link
                                href="https://www.linkedin.com/in/lilianbischung"
                                target="_blank"
                                className="text-foreground"
                                title="LinkedIn"
                            >
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 hover:scale-110 ease-in-out" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle> <rect x="2" y="9" width="4" height="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> <path d="M10 22H14V15C14 13.8954 14.8954 13 16 13C17.1046 13 18 13.8954 18 15V22H22V15C22 11.6863 19.3137 9 16 9C12.6863 9 10 11.6863 10 15V22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </Link>
                            <Link
                                href="https://github.com/Lirobi"
                                target="_blank"
                                className="text-foreground"
                                title="GitHub"
                            >
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 hover:scale-110 ease-in-out"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" fill="currentColor" /></g></svg>

                            </Link>
                        </div>
                        <p className="text-xl max-sm:text-lg flex items-center justify-center group gap-2">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300 group-hover:scale-110 h-10 max-sm:h-8 ease-in-out"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></rect> <path d="M20 5.5L12 13L4 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <a
                                href="mailto:contact@lilianbischung.fr"
                                className="underline-animation text-foreground max-sm:text-sm break-all"
                            >
                                contact@lilianbischung.fr
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    );
}
