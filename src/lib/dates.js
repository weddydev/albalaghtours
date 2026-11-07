/** "November 2026", "December 2026", … starting next month. */
export function upcomingMonths(count = 14) {
  const now = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i + 1, 1)
    return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  })
}
