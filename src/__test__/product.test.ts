import request from 'supertest'
import { app } from '../server'

describe('Product API', () => {
  it('should fetch all products', async () => {
    const res = await request(app).get('/api/product')

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('products')
  })

  it('should fetch products by category', async () => {
    const category = 'earphones'
    const res = await request(app).get(`/api/product?category=${category}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('products')
    expect(res.body.products).toBeInstanceOf(Array)
  })

  it('should fetch a product by slug', async () => {
    const slug = 'yx1-earphones'
    const res = await request(app).get(`/api/product/${slug}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('product')
  })

  it('should return 404 for a non-existing product', async () => {
    const slug = 'non-existing-product'
    const res = await request(app).get(`/api/product/${slug}`)

    expect(res.status).toBe(404)
    expect(res.body).toHaveProperty('message', 'Product not found')
  })
})
