// "Google Maps" | "Google Maps and Waze" | "GitHub, GitLab and Bitbucket"
export function formatAlternatives(products: string[]): string {
  if (products.length <= 1) {
    return products.join('')
  }
  return `${products.slice(0, -1).join(', ')} and ${products[products.length - 1]}`
}
