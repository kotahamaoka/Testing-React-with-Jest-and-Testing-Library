/**
 *@function formatCurrency
 *数値を通貨の形式にフォーマット
 * @param {number} amount
 * @returns {string} 数値を通貨に変換
 *
 * @example
 *  formatCurrency(0)
 *  // => $0.00
 *
 * @example
 *  formatCurrency(1.5)
 * // => $1.50
 *
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}
