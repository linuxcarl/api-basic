import { faker } from '@faker-js/faker';
import { Product } from '../interfeces/product.interface';
import boom from '@hapi/boom';
class ProductService {
  products: Product[] = [];
  constructor() {
    this.products = this.generate();
  }
  generate(): Product[] {
    const limit = 100;
    const listProducts: Product[] = [];
    for (let index = 0; index < limit; index++) {
      listProducts.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        description: faker.lorem.paragraph(),
        isBlocked: faker.datatype.boolean(),
      });
    }
    return listProducts;
  }
  async find(): Promise<Product[]> {
    return this.products;
  }
  async findOne(id: string) {
    const product = this.products.find((r) => r.id === id);
    if (!product) {
      throw boom.notFound('product not found with boom');
    } else if (!!product.isBlocked) {
      throw boom.forbidden('product is blocked');
    }
    return product;
  }

  async create(body: Product) {
    const product = {
      id: faker.datatype.uuid(),
      ...body,
    };
    this.products.push(product);
    return product;
  }

  async update(id: string, body: Product) {
    const index = this.products.findIndex((id) => id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products[index] = { ...this.products[index], ...body };
    return this.findOne(id);
  }

  async delete(id: string) {
    const index = this.products.findIndex((r) => r.id === id);
    if (index === -1) {
      throw boom.notFound('product not found with boom');
    }
    this.products.splice(index, 1);
    return { id };
  }
}
export default ProductService;
