const columns = ['name', 'pack', 'category', 'sku', 'stock', 'price', 'supplier']
const escapeCell = value => `"${String(value ?? '').replaceAll('"', '""')}"`

export function downloadInventoryCsv(products, filename = 'khetsetu-inventory.csv') {
  const csv = [columns.join(','), ...products.map(product => columns.map(column => escapeCell(product[column])).join(','))].join('\n')
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.append(anchor)
  anchor.click()
  anchor.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function parseLine(line) {
  const cells = []
  let value = ''
  let quoted = false
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]
    if (char === '"' && line[index + 1] === '"' && quoted) { value += '"'; index += 1 }
    else if (char === '"') quoted = !quoted
    else if (char === ',' && !quoted) { cells.push(value); value = '' }
    else value += char
  }
  cells.push(value)
  return cells
}

export function parseInventoryCsv(csv) {
  const lines = csv.replace(/^\uFEFF/, '').split(/\r?\n/).filter(line => line.trim())
  if (lines.length < 2) return []
  const headings = parseLine(lines[0]).map(value => value.trim().toLowerCase())
  if (!columns.every(column => headings.includes(column))) throw new Error(`CSV needs these columns: ${columns.join(', ')}`)
  return lines.slice(1).map((line, index) => {
    const cells = parseLine(line)
    const read = column => cells[headings.indexOf(column)]?.trim() ?? ''
    const product = {
      id: `import-${crypto.randomUUID()}`,
      name: read('name'), pack: read('pack'), category: read('category'), sku: read('sku'),
      stock: Number(read('stock')), price: Number(read('price')), supplier: read('supplier'), tile: 0,
    }
    if (!product.name || !product.sku || !Number.isFinite(product.stock) || product.stock < 0 || !Number.isFinite(product.price) || product.price < 0) throw new Error(`Invalid product on CSV row ${index + 2}`)
    return product
  })
}
