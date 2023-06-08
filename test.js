function getString(str) {
  let i, j
  const n = str.length
  const MAX = str.length
  // To store the first index of
  // every character of str
  const chk = []
  for (i = 0; i < MAX; i++) chk[i] = -1

  // Store the first occurring
  // index every character
  for (i = 0; i < n; i++) {
    // If current character is appearing
    // for the first time in str
    if (chk[str[i].charCodeAt(0) - 'a'.charCodeAt(0)] == -1)
      chk[str[i].charCodeAt(0) - 'a'.charCodeAt(0)] = i
  }

  // Starting from the leftmost character
  for (i = 0; i < n; i++) {
    let flag = false

    // For every character smaller than str[i]
    for (j = 0; j < str[i].charCodeAt(0) - 'a'.charCodeAt(0); j++) {
      // If there is a character in str which is
      // smaller than str[i] and appears after it
      if (chk[j] > chk[str[i].charCodeAt(0) - 'a'.charCodeAt(0)]) {
        flag = true
        break
      }
    }

    // If the required character pair is found
    if (flag) break
  }

  // If swapping is possible
  if (i < n - 1) {
    // Characters to be swapped
    let ch1 = str[i]
    let ch2 = String.fromCharCode(j + 'a'.charCodeAt(0))

    // For every character
    for (i = 0; i < n; i++) {
      // Replace every ch1 with ch2
      // and every ch2 with ch1
      if (str[i] == ch1) {
        str = str.replaceAt(i, ch2)
      } else if (str[i] == ch2) {
        str = str.replaceAt(i, ch1)
      }
    }
  }

  return str
}

String.prototype.replaceAt = function (index, replacement) {
  return (
    this.substring(0, index) +
    replacement +
    this.substring(index + replacement.length)
  )
}

console.log(getString('bdea'))
