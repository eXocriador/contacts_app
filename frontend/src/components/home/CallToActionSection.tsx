// frontend/src/components/home/CallToActionSection.tsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Mail,
  ChevronUp,
  HelpCircle
} from "lucide-react";

const trustedBy = [
  {
    name: "Google",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
  },
  {
    name: "Vercel",
    logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
  }
];

const faqs = [
  {
    q: "Is my data secure?",
    a: "Absolutely! We use industry-standard encryption and never share your data."
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time, no questions asked."
  },
  {
    q: "Is there a free trial?",
    a: "Of course! You get 14 days free, no credit card required."
  }
];

const CallToActionSection = () => {
  return (
    <section className="pt-20 bg-gradient-to-b from-background via-background to-[#0a0d12] relative overflow-hidden">
      {/* Subtle green blobs for depth */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-700/15 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary-600/10 rounded-full blur-2xl z-0" />
      <div className="container-custom relative z-10 flex flex-col items-center">
        {/* Floating CTA card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="glass w-full max-w-7xl mx-auto px-2 md:px-8 py-8 md:py-10 rounded-3xl shadow-xl border-2 border-primary-500/20 bg-gradient-to-br from-white/10 via-primary-900/10 to-background/80 flex flex-col items-center text-center relative will-change-[opacity]"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary-500/20">
            <Sparkles className="w-5 h-5 text-primary-400" />
            <span className="text-primary-100 font-medium">
              Join 10,000+ users
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Ready to get started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-text-secondary leading-relaxed">
            Join thousands of users who are already managing their contacts more
            efficiently. Start your free trial today — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-6">
            <Link
              to="/register"
              className="btn-primary text-lg px-10 py-4 w-full sm:w-auto"
            >
              <span>Get Started Free</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contacts"
              className="btn bg-white text-primary-600 border-2 border-primary-500 hover:bg-primary-50 text-lg px-10 py-4 w-full sm:w-auto"
            >
              View Demo
            </Link>
          </div>
          {/* Trusted by */}
          <div className="flex flex-col items-center gap-2 mb-6 w-full">
            <div className="text-xs text-text-secondary mb-1">
              Trusted by teams at
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {trustedBy.map((c) => (
                <img
                  key={c.name}
                  src={c.logo}
                  alt={c.name}
                  className="h-7 w-auto grayscale opacity-80 hover:opacity-100 transition"
                  loading="lazy"
                  style={{ maxWidth: "90px" }}
                />
              ))}
            </div>
          </div>
          {/* FAQ */}
          <div className="w-full bg-white/5 rounded-2xl p-4 md:p-6 mt-2 mb-2 border border-primary-500/10 flex flex-col items-center gap-4">
            <Mail className="w-7 h-7 text-primary-500 mb-2" />
            <div className="text-lg font-semibold text-text-default mb-2 text-center">
              Still have questions?
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full">
              {faqs.map((f, i) => (
                <div
                  key={f.q}
                  className="group bg-background/70 rounded-xl border border-primary-500/10 p-3 md:p-4 flex flex-col items-center text-center gap-2 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex flex-col items-center gap-2 mb-1">
                    <HelpCircle className="w-5 h-5 text-primary-500" />
                    <span className="font-semibold text-text-default text-base">
                      {f.q}
                    </span>
                  </div>
                  <div className="text-text-secondary text-sm">{f.a}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-center w-full">
              <a
                href="mailto:support@contactsapp.com"
                className="btn-secondary px-6 py-2 text-sm flex items-center gap-2"
              >
                <Mail className="w-4 h-4" /> Contact us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
