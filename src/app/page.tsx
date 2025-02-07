'use client';

import BooksShowcase from "../app/components/BooksShowcase";
import Footer from "../app/components/Footer";
import HeroShowcase from "../app/components/HeroShowCase";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home as lucideHome, User,} from 'lucide-react'

export default function Home() {



    const navItems = [
      { name: 'Home', url: '#home', icon: lucideHome },
      { name: 'Books', url: '#books', icon: User },
    ]
    return (
      <>
      <NavBar items={navItems} />
        <div id="home">
        <HeroShowcase />
        </div>
        <div id="books">
        <BooksShowcase   />
        </div>
        <Footer />
      </>
    );
}
