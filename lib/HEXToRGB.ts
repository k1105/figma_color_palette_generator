export const HEXToRGB = (hex: string) => {
    if(hex.length !== 7) {
        //alert("err! hexの形式が正しくありません");
        return ({R: 0, G: 0, B: 0});
    } else {
        const R = parseInt((hex[1]+hex[2]), 16);
        const G = parseInt((hex[3]+hex[4]), 16);
        const B = parseInt((hex[5]+hex[6]), 16);
        return ({R: R, G: G, B: B});
    }  
};