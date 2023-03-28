const colorsConfig = {
    blue: '#0891b2',
    green: '#16a34a',
    red: '#dc2626'
}


export const getColor = (color: keyof typeof colorsConfig) => {
    return colorsConfig[color]
}