/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
	extend: {
		colors: {
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			popover: {
				DEFAULT: 'hsl(var(--popover))',
				foreground: 'hsl(var(--popover-foreground))'
			},
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			chart: {
				'1': 'hsl(var(--chart-1))',
				'2': 'hsl(var(--chart-2))',
				'3': 'hsl(var(--chart-3))',
				'4': 'hsl(var(--chart-4))',
				'5': 'hsl(var(--chart-5))'
			}
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
        keyframes: {
            binanceLoaderAnim: {
                '0%, 100%': { height: '8px', transform: 'translateY(0)' },
                '25%': { height: '20px', transform: 'translateY(-6px)' },
                '50%': { height: '8px', transform: 'translateY(0)' },
                '75%': { height: '20px', transform: 'translateY(6px)' },
            },
            googleLoader: {
                '0%': { transform: 'translateX(-100%)' },
                '50%': { transform: 'translateX(100%)' },
                '100%': { transform: 'translateX(300%)' }
            }
        },
        animation: {
            'binance-bar-1': 'binanceLoaderAnim 1.4s ease-in-out infinite',
            'binance-bar-2': 'binanceLoaderAnim 1.4s ease-in-out 0.15s infinite',
            'binance-bar-3': 'binanceLoaderAnim 1.4s ease-in-out 0.3s infinite',
            'binance-bar-4': 'binanceLoaderAnim 1.4s ease-in-out 0.45s infinite',
            'binance-bar-5': 'binanceLoaderAnim 1.4s ease-in-out 0.6s infinite',
            'google-loader': 'googleLoader 2s infinite ease-in-out',
        }
	}
  },
  plugins: [require("tailwindcss-animate"), require('daisyui')],
};