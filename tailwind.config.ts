import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
        neo: {
          blue: '#2563EB',
          yellow: '#FFD60A',
          pink: '#FF006E',
          green: '#22C55E',
          bg: '#F8F8F8',
          surface: '#FFFFFF',
          border: '#000000',
          text: '#000000',
          muted: '#404040',
        },
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
        'brutal': '20px',
  		},
      boxShadow: {
        'brutal-sm': '5px 5px 0px #000000',
        'brutal': '8px 8px 0px #000000',
        'brutal-lg': '12px 12px 0px #000000',
        'brutal-active': '2px 2px 0px #000000',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

