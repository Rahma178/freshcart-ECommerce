import Image from "next/image";
import Link from "next/link";
import logo from "../../../assets/freshcart-logo.49f1b44d.svg";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPhone, FaEnvelope, FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer>
      {/* Features Bar */}
      <div className="border-t border-b py-6 px-10 md:px-20">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="text-green-500 text-2xl">📦</div>
            <div>
              <p className="font-medium text-sm">Free Shipping</p>
              <p className="text-xs text-gray-500">On orders over 500 EGP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-green-500 text-2xl">🔄</div>
            <div>
              <p className="font-medium text-sm">Easy Returns</p>
              <p className="text-xs text-gray-500">14-day return policy</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-green-500 text-2xl">🔒</div>
            <div>
              <p className="font-medium text-sm">Secure Payment</p>
              <p className="text-xs text-gray-500">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-green-500 text-2xl">🎧</div>
            <div>
              <p className="font-medium text-sm">24/7 Support</p>
              <p className="text-xs text-gray-500">Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-gray-900 text-gray-400 py-12 px-10 md:px-20">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg px-3 py-2 inline-flex items-center gap-2 mb-4">
              <Image src={logo} alt="freshcart-logo" className="h-6 w-auto" />
            </div>
            <p className="text-sm leading-relaxed mb-4">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at competitive
              prices with a seamless shopping experience.
            </p>
            <div className="flex flex-col gap-2 text-sm mb-5">
              <div className="flex items-center gap-2">
                <FaPhone className="text-green-500 text-xs" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-green-500 text-xs" />
                <span>support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-green-500 text-xs" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="bg-gray-800 hover:bg-green-500 transition-colors w-8 h-8 rounded-full flex items-center justify-center">
                <FaFacebook className="text-sm" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-500 transition-colors w-8 h-8 rounded-full flex items-center justify-center">
                <FaTwitter className="text-sm" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-500 transition-colors w-8 h-8 rounded-full flex items-center justify-center">
                <FaInstagram className="text-sm" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-green-500 transition-colors w-8 h-8 rounded-full flex items-center justify-center">
                <FaYoutube className="text-sm" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Shop</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { name: "All Products", path: "/shop" },
                { name: "Categories", path: "/shop" },
                { name: "Brands", path: "/brands" },
                { name: "Electronics", path: "/shop" },
                { name: "Men's Fashion", path: "/shop" },
                { name: "Women's Fashion", path: "/shop" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="hover:text-green-500 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { name: "My Account", path: "/" },
                { name: "Order History", path: "/allorders" },
                { name: "Wishlist", path: "/whishList" },
                { name: "Shopping Cart", path: "/cart" },
                { name: "Sign In", path: "/login" },
                { name: "Create Account", path: "/register" },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path} className="hover:text-green-500 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                "Contact Us",
                "Help Center",
                "Shipping Info",
                "Returns & Refunds",
                "Track Order",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-green-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2026 FreshCart. All rights reserved.</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span>💳</span> Visa
            </span>
            <span className="flex items-center gap-1">
              <span>💳</span> Mastercard
            </span>
            <span className="flex items-center gap-1">
              <span>💳</span> PayPal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}