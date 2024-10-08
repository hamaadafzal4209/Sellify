import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="main-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-400">
              We are dedicated to providing the best products and services to
              our customers. Our commitment to quality and customer satisfaction
              is our top priority.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:underline">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/community-support"
                  className="text-gray-300 hover:underline"
                >
                  Community Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400">123 Main Street, Anytown, USA</p>
            <p className="text-gray-400">Email: info@example.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-600" />

        {/* Bottom Section */}
        <div className="md:flex md:justify-between md:items-center">
          <div className="text-center md:text-left">
            <span className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Sellify. All rights reserved.
            </span>
          </div>
          <div className="mt-1 md:mt-0 flex space-x-4 justify-center md:justify-end">
            <Link
              href="/privacy-policy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
