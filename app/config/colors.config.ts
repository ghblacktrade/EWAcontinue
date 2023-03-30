const colorsConfig = {
    blue: '#0891b2',
    green: 'rgba(12,54,61,0.99)',
    red: '#dc2626',
    white: '#ccebff'
}


export const getColor = (color: keyof typeof colorsConfig) => {
    return colorsConfig[color]
}