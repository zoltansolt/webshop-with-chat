export class Product {
  "id": number;
  "title": {
    "short": string;
    "long": string;
  };
  "content": {
    "short": string;
    "long": string;
  };
  "price": number;
  "tax": number;
  "quantity": number;
  "images": Image[];
}

export class Image {
  "url": string;
}
