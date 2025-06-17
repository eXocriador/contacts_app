import React from "react";
import { motion } from "framer-motion";

const ContactCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-surface rounded-xl border border-border overflow-hidden animate-pulse flex flex-col"
    >
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-border" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-border rounded w-3/4" />
              <div className="h-4 bg-border rounded w-1/2" />
            </div>
          </div>
          <div className="w-5 h-5 bg-border rounded-full" />
        </div>
        <div className="space-y-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-border rounded" />
            <div className="h-4 bg-border rounded w-full" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-border rounded" />
            <div className="h-4 bg-border rounded w-5/6" />
          </div>
        </div>
      </div>
      <div className="p-4 bg-background/50 border-t border-border flex justify-end space-x-3">
        <div className="h-9 w-24 bg-border rounded-lg" />
        <div className="h-9 w-24 bg-border rounded-lg" />
      </div>
    </motion.div>
  );
};

export default ContactCardSkeleton;
