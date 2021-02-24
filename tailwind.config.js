module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                accent: '#3D42D6',
                base: '#2F3B57',
                secondary: '#8991A3',
                ring: '#D3DFFF',
                active_ring: '#E8E9EC',
                dropdown: '#E8E9EC',
                success: '#FC505E',
                in_progress: '#242730',
                inactive: '#DCDBDB',
                error: '#FF2B2B',
                button: '#EDF2FF'
            },
        },
    },
    variants: {
        extend: {
          backgroundColor: ['disabled'],
        }
      },
    plugins: [],
}
