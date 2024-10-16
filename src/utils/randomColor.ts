const colors = [
    '#5ECCA0',
    '#CB9BFA',
    '#F8FD91',
    // '#FFC1C1',
    // '#FF6F91',
    // '#FFCE54',
    // '#A36ECA',
    // '#4AAB8D',
    // '#F8A3C7',
];

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};