// "Google Maps" | "Google Maps and Waze" | "GitHub, GitLab and Bitbucket"
export function formatAlternatives(products: string[]): string {
  if (products.length <= 1) {
    return products.join('')
  }
  return `${products.slice(0, -1).join(', ')} and ${products[products.length - 1]}`
}

// Display order of the category grid clusters; a category whose `group`
// is missing or unknown falls into "Other" at the end
export const GROUP_ORDER = ['Consumer Apps', 'Communication & Social', 'Business & Productivity', 'Infrastructure & Cloud', 'Other']

export function groupCategories<T extends { group?: string }>(categories: T[]): { name: string, categories: T[] }[] {
  const buckets = new Map<string, T[]>()
  for (const category of categories) {
    const group = category.group && GROUP_ORDER.includes(category.group) ? category.group : 'Other'
    if (!buckets.has(group)) {
      buckets.set(group, [])
    }
    buckets.get(group)!.push(category)
  }
  return GROUP_ORDER.filter(group => buckets.has(group)).map(group => ({ name: group, categories: buckets.get(group)! }))
}
