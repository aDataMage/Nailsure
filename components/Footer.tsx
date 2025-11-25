import Link from "next/link";
import { Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-secondary text-secondary-foreground py-12 border-t border-border">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-primary">Nailsure</h3>
                    <p className="text-muted-foreground max-w-xs">
                        Experience the art of luxury nail care. Dedicated to perfection and your relaxation.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium">Contact Us</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center space-x-2">
                            <MapPin size={18} className="text-primary" />
                            <span>123 Luxury Lane, Beverly Hills, CA</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Phone size={18} className="text-primary" />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Mail size={18} className="text-primary" />
                            <span>hello@nailsure.com</span>
                        </li>
                    </ul>
                </div>

                {/* Socials & Links */}
                <div className="space-y-4">
                    <h4 className="text-lg font-medium">Follow Us</h4>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Instagram size={24} />
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                            <Facebook size={24} />
                        </Link>
                    </div>
                    <div className="pt-4">
                        <Link href="/admin" className="text-sm text-muted-foreground/50 hover:text-primary transition-colors">
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Nailsure. All rights reserved.
            </div>
        </footer>
    );
}
