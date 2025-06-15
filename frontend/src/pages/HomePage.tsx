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
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          contain: "paint",
          isolation: "isolate"
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/images/hero.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            willChange: "transform",
            transform: "translateZ(0)",
            filter: "blur(6px)",
            backfaceVisibility: "hidden",
            contain: "strict"
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent dark:from-black/80 dark:to-transparent"
          style={{ contain: "strict" }}
        />
        <div
          className="absolute inset-0 bg-black/30 dark:bg-black/50"
          style={{ contain: "strict" }}
        />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto p-16 lg:p-24 bg-black/70 dark:bg-black/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-600/50 dark:border-gray-700/50">
          <div className="text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-400 rounded-full text-sm font-medium mb-4">
                ✨ Your Digital Contact Hub
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
            >
              Connect. Organize.
              <br />
              <span className="text-primary-400 relative">Thrive.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-700 dark:text-gray-200 mb-8"
            >
              Transform how you manage relationships.
              <br />
              <span className="text-primary-600 dark:text-primary-300">
                One contact at a time.
              </span>
            </motion.p>
          </div>
          <div className="text-center flex flex-col h-full justify-between">
            {/* Top Group: Title and Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-8"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Simplify Your Connections
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Effortlessly manage all your professional and personal contacts
                in one secure place. Organize them with custom tags, set
                reminders for follow-ups, and enjoy seamless access across all
                your devices.
              </p>
            </motion.div>

            {/* Bottom Group: Buttons and Checkmark Features */}
            <div className="flex flex-col gap-6">
              {/* Existing buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-lg transition-colors duration-200 group"
                >
                  Start Your Journey
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: "smooth"
                    })
                  }
                  className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 rounded-lg transition-colors duration-200"
                >
                  See How It Works
                  <span className="ml-2">↓</span>
                </motion.button>
              </motion.div>
              {/* Existing checkmark features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-8 text-gray-700 dark:text-gray-300"
              >
                <div className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">
                    ✓
                  </span>
                  Secure & Private
                </div>
                <div className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">
                    ✓
                  </span>
                  Easy to Use
                </div>
                <div className="flex items-center">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">
                    ✓
                  </span>
                  Always Available
                </div>
              </motion.div>
            </div>
          </div>
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
