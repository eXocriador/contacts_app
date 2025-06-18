import React from "react";

const ContactCardSkeleton = () => (
  <div className="bg-surface rounded-lg shadow-md p-6 animate-pulse">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 bg-border rounded-full"></div>
      <div className="ml-4 flex-1">
        <div className="h-4 bg-border rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-border rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-border rounded w-full"></div>
      <div className="h-3 bg-border rounded w-5/6"></div>
    </div>
    <div className="flex justify-end space-x-2 mt-4">
      <div className="w-8 h-8 bg-border rounded"></div>
      <div className="w-8 h-8 bg-border rounded"></div>
    </div>
  </div>
);

export default ContactCardSkeleton;
