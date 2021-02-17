const simpleColorConverter = require('simple-color-converter');

export const deltaE = (rgbA: number[], rgbB: number[]) => {
  let labA = rgb2lab(rgbA);
  let labB = rgb2lab(rgbB);
  let deltaL = labA[0] - labB[0];
  let deltaA = labA[1] - labB[1];
  let deltaB = labA[2] - labB[2];
  let c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  let c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  let deltaC = c1 - c2;
  let deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  let sc = 1.0 + 0.045 * c1;
  let sh = 1.0 + 0.015 * c1;
  let deltaLKlsl = deltaL / (1.0);
  let deltaCkcsc = deltaC / (sc);
  let deltaHkhsh = deltaH / (sh);
  let i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

export const rgb2lab = (rgb: number[]) => {
  let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}


export const getColorName = (rgbArray: number[]) => {
  const color = new simpleColorConverter({
    rgb: rgbArray.toString() , 
    to: 'ral'
})
  const ralValue = color.color.ral
  const ralName = color.color.name
  
  let colorName: string = ''

  switch(true) {
    case ralName.includes('Beige'):
      colorName = 'beige'
      break
    case ralName.includes('Grey'):
      colorName = 'grey'
      break
    case ralValue > 1012 && ralValue < 1016:
      colorName = 'ivory'
      break
    case ralValue > 3013 && ralValue < 3020:
      colorName = 'pink'
      break  
    case ralValue < 2000:
      colorName = 'yellow'
      break
    case ralValue < 3000:
      colorName = 'orange'
      break
    case ralValue < 4000:
      colorName = 'red'
      break
    case ralValue < 5000:
      colorName = 'purple'
      break
    case ralValue < 6000:
      colorName = 'blue'
      break
    case ralValue < 7000:
      colorName = 'green'
      break
    case ralValue < 8000 || ralName.includes('Grey') || ralName.includes('Aluminium') || ralName.includes('Papyrus'):
      colorName = 'grey'
      break
    case ralValue < 9000:
      colorName = 'brown'
      break
    case ralValue < 10000 && ralName.includes('White'):
      colorName = 'white'
      break
    case ralValue < 10000 && ralName.includes('Black'):
      colorName = 'black'
      break
    case ralValue < 10000 && ralName.includes('Cream'):
      colorName = 'cream'
      break  
  }

  return colorName
}