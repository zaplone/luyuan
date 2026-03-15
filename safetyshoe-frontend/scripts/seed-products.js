const STRAPI_URL = 'http://127.0.0.1:1337';

const categories = ['Construction', 'Oil & Gas', 'Food Service', 'Heavy Industry', 'Logistics', 'Mining'];
const styles = ['Low Cut', 'Mid Cut', 'High Boot'];
const standardsList = [
  ['S3', 'SRC'], 
  ['S1P', 'SRA'], 
  ['SB', 'E', 'FO'], 
  ['S3', 'CI', 'WR'], 
  ['OB', 'SRC']
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function createProduct(i) {
  const category = getRandomElement(categories);
  const style = getRandomElement(styles);
  
  const productData = {
    data: {
      name: `Safety Pro Model ${2000 + i}`,
      sku: `SP-${2000 + i}`,
      description: `Professional safety footwear designed for ${category}. Features durable construction and superior comfort for long work shifts. This ${style.toLowerCase()} model offers excellent protection.`,
      moq: 500,
      category: category,
      style: style,
      price_range: `$${20 + Math.floor(Math.random() * 30)} - $${50 + Math.floor(Math.random() * 30)}`,
      is_hot: Math.random() > 0.7,
      is_new: Math.random() > 0.8,
      standards: getRandomElement(standardsList),
      features: ['Waterproof', 'Anti-slip', 'Steel Toe', 'Breathable'].sort(() => 0.5 - Math.random()).slice(0, 3),
      materials: {
        upper: Math.random() > 0.5 ? 'Full Grain Leather' : 'Microfiber',
        outsole: Math.random() > 0.5 ? 'Dual Density PU' : 'Rubber',
        lining: 'Breathable Mesh'
      }
    }
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      console.log(`✅ Created: Safety Pro Model ${2000 + i}`);
    } else {
      console.error(`❌ Failed to create product ${i}:`, response.statusText);
      const err = await response.text();
      console.error(err);
    }
  } catch (error) {
    console.error(`❌ Error creating product ${i}:`, error);
  }
}

async function seed() {
  console.log('🚀 Starting to seed products...');
  // 生成 20 个产品
  for (let i = 1; i <= 20; i++) {
    await createProduct(i);
    // 稍微停顿一下，避免请求太快
    await new Promise(r => setTimeout(r, 100));
  }
  console.log('✨ Seed completed!');
}

seed();

