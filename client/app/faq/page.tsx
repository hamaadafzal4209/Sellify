"use client";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment methods to ensure convenience for our customers. This includes major credit and debit cards such as Visa, MasterCard, and American Express. Additionally, we support payment via PayPal, bank transfers, and other digital wallets. For more information on specific payment methods, please visit our payment options page.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you will receive an email containing a tracking link. This link will allow you to monitor your shipment in real-time. You can also log into your account on our website and check your order status in the 'My Orders' section.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We have a 30-day return policy for our customers. Items must be returned in their original condition and packaging to qualify for a refund. Please visit our returns page for detailed instructions on how to initiate a return. If you have any questions, feel free to reach out to our support team.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we are pleased to offer international shipping to a wide range of countries. Shipping rates and delivery times may vary based on your location. For detailed information about international shipping options, please refer to our shipping policy page.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team through various channels. You may email us at support@example.com, use our live chat feature on the website, or fill out the contact form on our contact page. Our support hours are Monday to Friday, 9 AM to 5 PM.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "Yes, you can modify or cancel your order within 24 hours of placing it. To do this, please contact our customer support team as soon as possible. Once the order is processed and shipped, modifications cannot be made.",
    },
    {
      question: "Do you have a loyalty program?",
      answer:
        "Absolutely! Our loyalty program rewards customers with points for every purchase made. These points can be redeemed for discounts on future orders. Sign up for our loyalty program today to start earning rewards and enjoy exclusive offers.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-5xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="mt-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3>
                <button
                  type="button"
                  className={`flex items-center justify-between w-full p-5 font-medium border-b rounded-md transition-transform duration-300 ease-in-out ${
                    activeIndex === index
                      ? "bg-primary-500 text-white"
                      : "text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  {activeIndex === index ? (
                    <AiOutlineMinus className="w-4 h-4" />
                  ) : (
                    <AiOutlinePlus className="w-4 h-4" />
                  )}
                </button>
              </h3>
              <div
                className={`border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
                  activeIndex === index ? "max-h-40" : "max-h-0 overflow-hidden"
                }`}
              >
                <div className="p-5 text-gray-500 text-left">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
