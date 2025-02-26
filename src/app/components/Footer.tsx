'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { SiNextdotjs, SiCloudflare, SiInstagram, SiLinkedin, SiYoutube } from 'react-icons/si';
import logo from '@/app/logo.png';

import Image from 'next/image';
const socialLinks = [
  {
    icon: <SiInstagram size={24} />,
    href: 'https://instagram.com',
    label: 'Instagram',
    hoverColor: 'hover:text-pink-300',
  },
  {
    icon: <SiLinkedin size={24} />,
    href: 'https://www.linkedin.com/in/dipisha-kalura91304/',
    label: 'LinkedIn',
    hoverColor: 'hover:text-blue-300',
  },
  {
    icon: <SiYoutube size={24} />,
    href: 'https://www.youtube.com/@itsmelupa',
    label: 'YouTube',
    hoverColor: 'hover:text-red-300',
  }
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Books', href: '#books' },

];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden bg-[#FFE9E9] ">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
            <Image
              src={logo}
              alt="Logo"
              width={35}
              height={35}
              className="rounded-full"
            /> 
  
              <h3 className="text-xl font-serif font-semibold">
                Dipisha Kalura
              </h3>
            </div>
            <p className="text-sm leading-relaxed">
              Welcome to my creative corner! I&apos;m a passionate writer who believes in the power of words 
              to touch hearts and inspire minds. Through poetry and stories, I explore the depths of 
              human emotions and experiences, creating a bridge between imagination and reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">
              Explore
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold">
              Let&apos;s Connect
            </h3>
            <p className="text-sm mb-4">
              Join me on social media for daily inspiration, poetry updates, and behind-the-scenes glimpses 
              of my writing journey.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-200 ${social.hoverColor}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Powered By Section */}
        <div className="mt-12 pt-8 border-t border-pink-200/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <SiNextdotjs className="w-5 h-5" />
                <span className="text-sm">Next.js</span>
              </div>
              <div className="flex items-center gap-2">
                <SiCloudflare className="w-5 h-5" />
                <span className="text-sm">Cloudflare</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm">
              Created by <a href='https://www.linkedin.com/in/deepeshkalura/'> Deepesh Kalura </a> <Heart size={16} className="text-pink-300" /> Powered by <a href='http://github.com/rovaa-org'> Rovaa </a> 
            </div>
            
            <div className="text-sm text-center md:text-right">
              © {new Date().getFullYear()} All rights reserved to Dipisha Kalura
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;