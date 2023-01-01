export const fonts = {
    body: '"Rubik", sans-serif',
    heading: '"Rubik", sans-serif',
    monospace: 'Source Code Pro, monospace',
}

export const fontByName = {
    Rubik: '"Rubik", sans-serif',
    Oxanium: 'Oxanium',
    'Source Code Pro': 'Source Code Pro, monospace',
    Inter: 'Inter, sans-serif',
}

export const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
}

// TODO restructure to generate type in an elegant way
export const theme = {
    light: {
        fonts,
        fontByName,
        fontWeights,
        colors: {
            bg: {
                primary: '#FBFBFB',
                secondary: '#FFFFFF',
                tertiary: '#F4F4F4',
            },
            text: {
                primary: '#404040',
            },
            ui: {
                borderColor: '#ECECEC',
            },
        },
    },
}

export default theme
