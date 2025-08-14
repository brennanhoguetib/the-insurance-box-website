import fs from "node:fs";
import path from "node:path";

export type Product = {
  slug: string;
  name: string;
  summary: string;
  hero: string;
  bullets: string[];
  resources: { label: string; url: string }[];
  seo: { title: string; description: string };
};

export type ProductLite = Pick<Product, "slug" | "name" | "summary">;

const productsDir = path.join(process.cwd(), "src", "content", "products");
const productOrder = [
  "life-insurance",
  "health-insurance",
  "medicare",
  "long-term-care",
  "disability-insurance",
  "annuities",
  "financial-advisement",
];

export function listProductFiles(): string[] {
  return fs
    .readdirSync(productsDir)
    .filter((f) => f.endsWith(".json"));
}

export function getAllProducts(): Product[] {
  return listProductFiles()
    .map((file) => {
      const full = path.join(productsDir, file);
      const raw = fs.readFileSync(full, "utf-8");
      const data = JSON.parse(raw) as Product;
      return data;
    })
    .sort((a, b) => productOrder.indexOf(a.slug) - productOrder.indexOf(b.slug));
}

export function getProductBySlug(slug: string): Product | undefined {
  const filePath = path.join(productsDir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Product;
}

export function getProductsLite(): ProductLite[] {
  return getAllProducts().map(({ slug, name, summary }) => ({ slug, name, summary }));
}


