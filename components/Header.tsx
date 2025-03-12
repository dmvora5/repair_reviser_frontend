import Image from "next/image"
import { Button } from "./ui/button"

const Header = () => {
    return (
        <header className="h-[98px] bg-brandBlack sticky top-0 left-0 flex justify-center items-center">
            <nav className="w-full mx-20 flex justify-between">
                <Image
                    src="/Logo.svg"
                    width={164}
                    height={50}
                    alt="Logo"
                />
                <div className="w-3/5 flex items-center">
                    <ul className="inline-flex justify-evenly items-center w-full text-white">
                        <li className="inline-block cursor-pointer text-menu hover:text-menu-hover">Home</li>
                        <li className="inline-block cursor-pointer text-menu hover:text-menu-hover">About Us</li>
                        <li className="inline-block cursor-pointer text-menu hover:text-menu-hover">Services</li>
                        <li className="inline-block cursor-pointer text-menu hover:text-menu-hover">Registration</li>
                        <li className="inline-block cursor-pointer text-menu hover:text-menu-hover">Contact Us</li>
                    </ul>
                    <Button variant="destructive" className="px-20 py-6">
                        Log In
                    </Button>
                </div>
            </nav>
        </header>
    )
}

export default Header