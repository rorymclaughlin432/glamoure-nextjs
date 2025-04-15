import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';
import { addProduct } from '@/lib/db/products';
import prisma from '@/lib/db/prisma';
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/products/route';
import CartPage from '@/app/cart/page';
import { getCart } from '@/lib/db/cart';

const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

module.exports = createJestConfig(customJestConfig);



const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'This is a test product.',
  price: 99.99,
  imageUrl: '/test-image.jpg',
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('This is a test product.')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', '/test-image.jpg');
  });
});

jest.mock('@/lib/db/prisma', () => ({
  product: {
    create: jest.fn(),
  },
}));

describe('addProduct', () => {
  it('creates a new product in the database', async () => {
    const mockProduct = {
      name: 'Test Product',
      description: 'This is a test product.',
      price: 99.99,
      imageUrl: '/test-image.jpg',
    };

    await addProduct(mockProduct);

    expect(prisma.product.create).toHaveBeenCalledWith({
      data: mockProduct,
    });
  });
});

jest.mock('@/lib/db/prisma', () => ({
  product: {
    findMany: jest.fn(),
  },
}));

describe('/api/products API Route', () => {
  it('returns a list of products', async () => {
    const mockProducts = [
      { id: '1', name: 'Product 1', price: 10.0 },
      { id: '2', name: 'Product 2', price: 20.0 },
    ];

    prisma.product.findMany.mockResolvedValue(mockProducts);

    const { req, res } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockProducts);
  });
});

jest.mock('@/lib/db/cart', () => ({
  getCart: jest.fn(),
}));

describe('Cart Page', () => {
  it('displays cart items and total price', async () => {
    const mockCart = {
      items: [
        { id: '1', product: { name: 'Product 1', price: 10.0 }, quantity: 2 },
        { id: '2', product: { name: 'Product 2', price: 20.0 }, quantity: 1 },
      ],
    };

    getCart.mockResolvedValue(mockCart);

    render(<CartPage />);

    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Total: $40.00')).toBeInTheDocument();
  });
});