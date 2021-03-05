function getCategory(index){
    switch (index) {
        case 0:
            return 'daily';
        case 1:
            return 'clothes';
        case 2:
            return 'foods';
        case 3:
            return 'books';
        case 4:
            return 'metal';
        case 5:
            return 'fruits';
        case 6:
            return 'cosmetics';
        case 7:
            return 'electronic';
        default:
            break;
    }
}

export default getCategory