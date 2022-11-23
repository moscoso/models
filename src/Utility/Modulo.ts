/**
 * The modulo operation returns the remainder or signed remainder of a division, after one number is divided by another
 *
 * For example, the expression "5 mod 2" would evaluate to 1, because 5 divided by 2 has a quotient of 2 and a remainder of 1.
 * While "9 mod 3" would evaluate to 0, because the division of 9 by 3 has a quotient of 3 and a remainder of 0
 *
 * @param a the dividend
 * @param n the divisor
 * @returns the remainder of the Euclidean division of a by n
 */
export const modulo = (a: number, n: number) => (a % n + n) % n;
