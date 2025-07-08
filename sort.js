function sort(width, height, length, mass) {
  // Calculate volume
  const volume = width * height * length;
  // Check for bulky
  const isBulky = volume >= 1000000 || width >= 150 || height >= 150 || length >= 150;
  // Check for heavy
  const isHeavy = mass >= 20;

  if (isBulky && isHeavy) {
    return 'REJECTED';
  } else if (isBulky || isHeavy) {
    return 'SPECIAL';
  } else {
    return 'STANDARD';
  }
}

module.exports = sort; 