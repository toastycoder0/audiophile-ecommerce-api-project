import type { Product } from '@prisma/client'
import request from 'supertest'
import { app } from '../server'
import prisma from '../db'
import { product } from '../constants/mock.json'

jest.mock('../db', () => ({
  product: {
    findMany: jest.fn(),
    findFirst: jest.fn()
  }
}))

const db = jest.mocked(prisma)

describe('Product API', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should fetch all products', async () => {
    db.product.findMany.mockResolvedValue([product])

    const res = await request(app).get('/api/product')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('products')
    expect(res.body.products).toBeInstanceOf(Array)
  })

  it('should fetch products by category', async () => {
    db.product.findMany.mockResolvedValue([product])

    const category = 'earphones'
    const res = await request(app).get(`/api/product?category=${category}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('products')
    expect(res.body.products).toBeInstanceOf(Array)
    expect(res.body.products).not.toHaveLength(0)
    res.body.products.forEach((product: Product) => {
      expect(product.category).toBe(category)
    })
  })

  it('should fetch a product by slug', async () => {
    db.product.findFirst.mockResolvedValue(product)

    const slug = 'yx1-earphones'
    const res = await request(app).get(`/api/product/${slug}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('product')
    expect(res.body.product.slug).toBe(slug)
  })

  it('should return 404 for a non-existing product', async () => {
    db.product.findFirst.mockResolvedValue(null)

    const slug = 'non-existing-product'
    const res = await request(app).get(`/api/product/${slug}`)

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message', 'Product not found')
  })
})
