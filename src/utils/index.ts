/**
 * 检查给定的值是否为有效的数字
 *
 * 此函数用于确定传入的值是否为一个有效的数字类型它不仅检查值的类型是否为 'number'，
 * 还要进一步确认这个值不是NaN（不是一个数字），以确保其真正具有数字意义
 *
 * @param value 任意类型的值，用于检查
 * @returns 如果值是一个有效的数字类型，则返回true；否则返回false
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value)
}
