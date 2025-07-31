'use client';

export const BackgroundPattern = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#509e8e]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#487052]/10 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="organic-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1" fill="#575846" opacity="0.3"/>
              <circle cx="0" cy="0" r="1" fill="#487052" opacity="0.2"/>
              <circle cx="60" cy="60" r="1" fill="#509e8e" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#organic-grid)" />
        </svg>
      </div>
    </div>
  );
};