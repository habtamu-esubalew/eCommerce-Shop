"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { spacing } from "@/lib/tailwind-utils";
import { cn } from "@/lib/utils";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Professional Footer Component
 * Clean, modern footer with comprehensive links and information
 * Fully responsive with mobile-first approach
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "All Products", href: ROUTES.HOME },
      { label: "Favorites", href: ROUTES.FAVORITES },
    ],
    customerService: [
      { label: "Help Center", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Shipping Info", href: "#" },
      { label: "Returns", href: "#" },
    ],
    company: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-auto">
      <div className={cn(spacing.container, "py-10 sm:py-12 lg:py-16")}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">eCommerce Shop</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your trusted destination for quality products. Shop with confidence
              and enjoy seamless shopping experience.
            </p>
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Shop
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Customer Service
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.customerService.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Company
            </h3>
            <ul className="space-y-3.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border/40 pt-8 pb-8">
          <div className="max-w-md">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-foreground">
              Newsletter
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle newsletter subscription
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              />
              <Button type="submit" size="default" className="whitespace-nowrap">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/40 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} eCommerce Shop. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

