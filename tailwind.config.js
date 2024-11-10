export default {
  prefix: 'tw-', // Prefix for all Tailwind utility classes
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'], // Define the files to scan for Tailwind classes
  theme: {
    extend: {
      colors: {
        "color-light-cream": '#FAF9F6', // Custom color
        "color-light-blue": "#F0F4F8", // Custom color
      },
      screens: {
        'xs': '480px', // Custom breakpoint for small devices (e.g., phones)
        'sm': '640px', // Default sm breakpoint for small tablets
        'md': '768px', // Default md breakpoint for tablets
        'lg': '1024px', // Default lg breakpoint for larger screens
        'xl': '1280px', // Default xl breakpoint for large desktops
        '2xl': '1536px', // Custom 2xl breakpoint for very large screens
      },
    },
  },
  plugins: [], // Tailwind plugins, if needed
}
