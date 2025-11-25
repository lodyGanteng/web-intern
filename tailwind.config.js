export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  safelist: [
    // safelist semua arah gradient
    { pattern: /bg-gradient-to-(r|l|t|b|br|bl|tr|tl)/ },

    // safelist SEMUA warna tailwind dari 50 sampai 900
    { pattern: /(from|to|via)-[a-z]+-(50|100|200|300|400|500|600|700|800|900)/ },
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
