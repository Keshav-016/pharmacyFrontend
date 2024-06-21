/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                button: '#1444EF',
                'text-grey': '#DDE0E2',
                'grey-bg': '#F5F5F5',
                'btn-border': '#D3D8E4',
                primary: '#1444EF',
                grey: '#D3D8E4',
                red: '#F11F52'
            },

            screens: {
                xs: '400px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px'
            },
            backgroundImage: {
                'background-image': "url('./src/assets/images/Background.png')",
                'home-bg': "url('./src/assets/images/MedBox.png')",
                'product-bg':
                    'radial-gradient(circle, rgba(255,255,255,1) 40%, rgba(205,205,207,1) 90%, rgba(204,204,204,1) 94%)'
            },
            backgroundColor: {
                'cart-card-bg': '#ECECEC'
            },
            textColor: {
                'border-clr': '#C0CAD4',
                'logo-blue': '#174883',
                'text-grey': '#737A83',
                'default-bg': '#EBF6F9'
            },
            fontFamily: {
                'default-font-family': ['archivo', 'sans-serif']
            }
        },
        screens: {
            xs: '480px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px'
        }
    },
    plugins: []
};
