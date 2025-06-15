import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Smartphone, Cloud } from "lucide-react";

const HomePage = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/hero.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
            filter: "blur(2px)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent dark:from-black/80 dark:to-transparent" />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Manage Your Contacts
            <br />
            <span className="text-primary-400">With Ease</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Keep all your contacts organized in one place. Add, edit, and manage
            your contacts effortlessly.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/register" className="btn btn-lg">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-center mb-16"
            >
              Why You'll Love It
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Smartphone className="w-12 h-12" />,
                  title: "Intuitive Design",
                  description:
                    "A clean, modern interface that makes managing your contacts a breeze."
                },
                {
                  icon: <Cloud className="w-12 h-12" />,
                  title: "Secure Cloud Sync",
                  description:
                    "Your contacts are automatically synced and backed up in the cloud."
                },
                {
                  icon: <Shield className="w-12 h-12" />,
                  title: "Cross-Platform Access",
                  description:
                    "Access your contacts from any device, anywhere, anytime."
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
                >
                  <div className="text-primary-500 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg my-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-8 text-gray-900 dark:text-white"
            >
              Ready to Get Started?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-400"
            >
              Join thousands of users who trust our platform to manage their
              contacts efficiently.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                to="/register"
                className="inline-block bg-primary-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-colors duration-300"
              >
                Sign Up Now for Free
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
