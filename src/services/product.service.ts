import { faker } from '@faker-js/faker';
import { Product } from '../interfeces/product.interface';
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
      });
    }
    return listProducts;
  }
  find(): Product[] {
    return this.products;
  }
  findOne(id: string) {
    return this.products.find((product) => product.id === id);
  }

  create(body: Product) {
    const product = {
      id: faker.datatype.uuid(),
      ...body,
    };
    this.products.push(product);
    return product;
  }

  update(id: string, body: Product) {
    const index = this.products.findIndex((id) => id === id);
    if (index > -1) {
      this.products[index] = { ...this.products[index], ...body };
    }
    return this.findOne(id);
  }

  delete(id: string) {
    const index = this.products.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}
export default ProductService;
