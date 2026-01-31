// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    const FORCE_RESET = true;  // 改为 true 并重启才会清空并重新生成；平时保持 false 

    try {
      // 1. 确保中文 (zh) 语言已启用
      const localeService = strapi.plugin('i18n').service('locales');
      const locales = await localeService.find();
      console.log('📋 Available locales:', locales.map(l => l.code).join(', '));
      
      // 检查是否有简体中文 (zh)
      const hasZh = locales.find((l) => l.code === 'zh');
      
      if (!hasZh) {
        console.log('🌐 Adding Chinese (zh) locale...');
        await localeService.create({
          name: 'Chinese (Simplified)',
          code: 'zh',
          isDefault: false,
        });
        console.log('✅ Created locale: zh');
      }
      
      // 使用 zh 作为中文 locale
      const zhLocale = 'zh';
      console.log(`✅ Using Chinese locale: ${zhLocale}`);

      if (FORCE_RESET) {
        console.log('🧹 Starting Clean Reset...');
        
        // 逐个清理
        const entries = await strapi.entityService.findMany('api::product.product', {
          locale: 'all', 
          fields: ['id']
        });

        if (entries.length > 0) {
          console.log(`Deleting ${entries.length} entries...`);
          for (const entry of entries) {
            try {
              await strapi.entityService.delete('api::product.product', entry.id);
            } catch (e) {
              // Ignore
            }
          }
        }
        
        console.log('✨ Ready to seed.');

        // 定义 16 个双语产品（覆盖不同行业、标准和款式）
        const PRODUCTS_DATA = [
          // 1. 重型建筑靴
          {
            en: {
              name: 'Titan Pro S3',
              model_code: 'LY-1001',
              description: 'Our flagship heavy-duty boot. Designed for extreme construction environments with reinforced heel support.',
              safety_standard: 'S3',
              additional_certs: ['SRC', 'HRO'],
              style: 'High Boot',
              industries: ['Construction', 'Mining'],
              materials: {
                upper: 'Full Grain Buffalo Leather',
                outsole: 'Dual Density PU/Rubber',
                toe_cap: 'Steel',
                midsole: 'Steel Plate',
                lining: 'Breathable Mesh'
              },
              moq: '500 Pairs',
              features: ['Anti-Twist System', 'Reflective Strips', '300J Impact Resistance'],
              is_hot: true
            },
            zh: {
              name: '泰坦加强版 S3',
              description: '我们的旗舰级重型防护靴。专为极端的建筑施工环境设计,配有增强型后跟支撑。',
              materials: {
                upper: '全粒面水牛皮',
                outsole: '双密度 PU/橡胶',
                toe_cap: '钢头',
                midsole: '防刺穿钢板',
                lining: '透气网布'
              },
              features: ['防扭转系统', '夜间反光条', '300J 抗冲击']
            }
          },
          // 2. 无金属电工鞋
          {
            en: {
              name: 'VoltGuard Composite',
              model_code: 'LY-2005',
              description: '100% Metal-Free design for electricians and high-security areas. Lightweight and airport friendly.',
              safety_standard: 'S1P',
              additional_certs: ['ESD', 'SRC'],
              style: 'Low Cut',
              industries: ['Logistics', 'Executive', 'Oil & Gas'],
              materials: {
                upper: 'Microfiber & KPU',
                outsole: 'PU/PU',
                toe_cap: 'Composite',
                midsole: 'Kevlar',
                lining: 'CoolMax'
              },
              moq: '500 Pairs',
              features: ['Metal Free', 'Lightweight', 'ESD Protection'],
              is_new: true
            },
            zh: {
              name: '电盾复合防护鞋',
              description: '100% 无金属设计,专为电工和高安保区域打造。轻量化设计,可通过机场安检。',
              materials: {
                upper: '超纤 & KPU',
                outsole: '双密度 PU',
                toe_cap: '复合塑钢头',
                midsole: '凯夫拉防刺穿布',
                lining: 'CoolMax 吸湿排汗里布'
              },
              features: ['无金属', '超轻量', '防静电']
            }
          },
          // 3. 食品行业专用
          {
            en: {
              name: 'ChefSafe Grip',
              model_code: 'LY-3002',
              description: 'Specialized for food industry. Easy-clean surface and superior slip resistance on oily floors.',
              safety_standard: 'S2',
              additional_certs: ['SRC'],
              style: 'Low Cut',
              industries: ['Food'],
              materials: {
                upper: 'Waterproof Microfiber',
                outsole: 'Rubber',
                toe_cap: 'Steel',
                midsole: 'None',
                lining: 'Antibacterial'
              },
              moq: '1000 Pairs',
              features: ['Machine Washable', 'White Color', 'Oil Resistant']
            },
            zh: {
              name: '厨安防滑鞋',
              description: '食品行业专用。表面易清洁,在油腻地面具有卓越的防滑性能。',
              materials: {
                upper: '防水超纤',
                outsole: '防滑橡胶',
                toe_cap: '钢头',
                midsole: '无',
                lining: '抗菌里布'
              },
              features: ['可机洗', '白色洁净款', '耐油底']
            }
          },
          // 4. 商务休闲款
          {
            en: {
              name: 'Executive Comfort S1',
              model_code: 'LY-4008',
              description: 'Business casual safety shoe with premium leather finish. Perfect for office and light industrial environments.',
              safety_standard: 'S1',
              additional_certs: ['SRC'],
              style: 'Low Cut',
              industries: ['Executive', 'Logistics'],
              materials: {
                upper: 'Premium Nubuck Leather',
                outsole: 'PU/Rubber',
                toe_cap: 'Composite',
                midsole: 'None',
                lining: 'Soft Textile'
              },
              moq: '500 Pairs',
              features: ['Business Look', 'Extra Comfort', 'Lightweight'],
              is_hot: true
            },
            zh: {
              name: '行政舒适款 S1',
              description: '商务休闲风格安全鞋,采用优质皮革表面。非常适合办公室和轻工业环境。',
              materials: {
                upper: '高级磨砂皮',
                outsole: 'PU/橡胶',
                toe_cap: '复合头',
                midsole: '无',
                lining: '柔软纺织内里'
              },
              features: ['商务外观', '超舒适', '轻量化']
            }
          },
          // 5. 极寒保暖靴
          {
            en: {
              name: 'Arctic Thermal S3',
              model_code: 'LY-5012',
              description: 'Insulated winter boot for extreme cold conditions. Tested down to -40°C with Thinsulate lining.',
              safety_standard: 'S3',
              additional_certs: ['SRC', 'CI'],
              style: 'High Boot',
              industries: ['Construction', 'Mining', 'Oil & Gas'],
              materials: {
                upper: 'Full Grain Leather + Cordura',
                outsole: 'Nitrile Rubber',
                toe_cap: 'Steel',
                midsole: 'Steel Plate',
                lining: 'Thinsulate 400g'
              },
              moq: '300 Pairs',
              features: ['Cold Insulation', 'Waterproof', 'High Ankle Support']
            },
            zh: {
              name: '极地保暖 S3',
              description: '适用于极寒条件的保暖冬靴。经过-40°C测试,采用新雪丽保暖内里。',
              materials: {
                upper: '全粒面皮革 + 科杜拉',
                outsole: '丁腈橡胶',
                toe_cap: '钢头',
                midsole: '防刺钢板',
                lining: '新雪丽 400g 保暖棉'
              },
              features: ['低温保暖', '全防水', '高帮护踝']
            }
          },
          // 6. 运动风格
          {
            en: {
              name: 'FlexWork S1P',
              model_code: 'LY-6018',
              description: 'Sporty and flexible safety trainer. Perfect for fast-paced warehouse and logistics work.',
              safety_standard: 'S1P',
              additional_certs: ['SRC'],
              style: 'Sporty',
              industries: ['Logistics', 'Executive'],
              materials: {
                upper: 'Knit Mesh + TPU',
                outsole: 'EVA/Rubber',
                toe_cap: 'Composite',
                midsole: 'Kevlar',
                lining: 'Quick Dry Mesh'
              },
              moq: '800 Pairs',
              features: ['Athletic Design', 'Breathable', 'Flexible Sole'],
              is_new: true
            },
            zh: {
              name: '弹力工作鞋 S1P',
              description: '运动风格的灵活安全鞋。非常适合快节奏的仓储和物流工作。',
              materials: {
                upper: '针织网布 + TPU',
                outsole: 'EVA/橡胶',
                toe_cap: '复合头',
                midsole: '凯夫拉',
                lining: '速干网布'
              },
              features: ['运动设计', '透气', '柔韧鞋底']
            }
          },
          // 7. 焊工专用
          {
            en: {
              name: 'Welder Pro S3',
              model_code: 'LY-7025',
              description: 'Heat-resistant boot for welding and metal work. Features metatarsal guard and spark-resistant upper.',
              safety_standard: 'S3',
              additional_certs: ['SRC', 'HRO'],
              style: 'Mid Cut',
              industries: ['Mining', 'Oil & Gas'],
              materials: {
                upper: 'Chrome Leather',
                outsole: 'Nitrile Rubber',
                toe_cap: 'Steel',
                midsole: 'Steel Plate',
                lining: 'Flame Retardant'
              },
              moq: '500 Pairs',
              features: ['Heat Resistant', 'Metatarsal Protection', 'Spark Resistant']
            },
            zh: {
              name: '焊工专业版 S3',
              description: '适用于焊接和金属加工的耐热靴。配备跖骨防护和防火花鞋面。',
              materials: {
                upper: '铬鞣皮',
                outsole: '丁腈橡胶',
                toe_cap: '钢头',
                midsole: '防刺钢板',
                lining: '阻燃内里'
              },
              features: ['耐高温', '跖骨防护', '防火花']
            }
          },
          // 8. 夏季凉鞋
          {
            en: {
              name: 'Summer Breeze SB',
              model_code: 'LY-8030',
              description: 'Open safety sandal for hot environments. Maximum breathability with toe protection.',
              safety_standard: 'SB',
              additional_certs: ['SRC'],
              style: 'Sandal',
              industries: ['Food', 'Logistics'],
              materials: {
                upper: 'Synthetic Leather + Mesh',
                outsole: 'EVA/Rubber',
                toe_cap: 'Steel',
                midsole: 'None',
                lining: 'Quick Dry'
              },
              moq: '1000 Pairs',
              features: ['Maximum Ventilation', 'Adjustable Straps', 'Summer Comfort']
            },
            zh: {
              name: '夏日清风 SB',
              description: '适用于炎热环境的开放式安全凉鞋。最大化透气性并提供脚趾防护。',
              materials: {
                upper: '合成革 + 网布',
                outsole: 'EVA/橡胶',
                toe_cap: '钢头',
                midsole: '无',
                lining: '速干'
              },
              features: ['最大通风', '可调节绑带', '夏季舒适']
            }
          },
          // 9. 女士专用款
          {
            en: {
              name: 'LadySafe S1P',
              model_code: 'LY-9001',
              description: 'Ergonomically designed for women. Narrower fit with enhanced arch support and stylish appearance.',
              safety_standard: 'S1P',
              additional_certs: ['SRC'],
              style: 'Low Cut',
              industries: ['Executive', 'Logistics', 'Food'],
              materials: {
                upper: 'Suede + Mesh',
                outsole: 'PU/Rubber',
                toe_cap: 'Composite',
                midsole: 'Kevlar',
                lining: 'Moisture Wicking'
              },
              moq: '600 Pairs',
              features: ['Women\'s Fit', 'Stylish Design', 'Arch Support'],
              is_new: true
            },
            zh: {
              name: '女士专用款 S1P',
              description: '专为女性设计的人体工学安全鞋。更窄鞋型配合增强足弓支撑和时尚外观。',
              materials: {
                upper: '麂皮 + 网布',
                outsole: 'PU/橡胶',
                toe_cap: '复合头',
                midsole: '凯夫拉',
                lining: '吸湿排汗'
              },
              features: ['女士鞋型', '时尚设计', '足弓支撑']
            }
          },
          // 10. 防化学品靴
          {
            en: {
              name: 'ChemShield S3',
              model_code: 'LY-1003',
              description: 'Chemical-resistant boot for laboratories and chemical plants. Acid and alkali resistant materials.',
              safety_standard: 'S3',
              additional_certs: ['SRC', 'WR'],
              style: 'High Boot',
              industries: ['Chemical', 'Mining'],
              materials: {
                upper: 'PVC Coated Leather',
                outsole: 'Nitrile Rubber',
                toe_cap: 'Steel',
                midsole: 'Steel Plate',
                lining: 'Chemical Resistant'
              },
              moq: '400 Pairs',
              features: ['Chemical Resistant', 'Acid Proof', 'Easy Clean']
            },
            zh: {
              name: '防化盾 S3',
              description: '适用于实验室和化工厂的防化学品靴。采用耐酸碱材料。',
              materials: {
                upper: 'PVC涂层皮革',
                outsole: '丁腈橡胶',
                toe_cap: '钢头',
                midsole: '防刺钢板',
                lining: '防化内里'
              },
              features: ['防化学品', '耐酸碱', '易清洁']
            }
          },
          // 11. 轻量徒步款
          {
            en: {
              name: 'TrailBlazer S1P',
              model_code: 'LY-1104',
              description: 'Hiking-style safety boot. Combines outdoor comfort with workplace protection.',
              safety_standard: 'S1P',
              additional_certs: ['SRC'],
              style: 'Mid Cut',
              industries: ['Construction', 'Logistics'],
              materials: {
                upper: 'Nubuck + Cordura',
                outsole: 'Vibram Rubber',
                toe_cap: 'Composite',
                midsole: 'Kevlar',
                lining: 'Breathable Mesh'
              },
              moq: '500 Pairs',
              features: ['Hiking Comfort', 'Lightweight', 'All-Terrain Grip'],
              is_hot: true
            },
            zh: {
              name: '轻装徒步款 S1P',
              description: '徒步风格的安全靴。结合户外舒适性与工作防护。',
              materials: {
                upper: '磨砂皮 + 科杜拉',
                outsole: 'Vibram橡胶',
                toe_cap: '复合头',
                midsole: '凯夫拉',
                lining: '透气网布'
              },
              features: ['徒步舒适', '轻量化', '全地形抓地']
            }
          },
          // 12. 电绝缘靴
          {
            en: {
              name: 'IsoVolt S3',
              model_code: 'LY-1205',
              description: 'Electrical insulation boot for high-voltage work. Tested up to 18kV.',
              safety_standard: 'S3',
              additional_certs: ['SRC', 'HRO', 'ESD'],
              style: 'High Boot',
              industries: ['Oil & Gas'],
              materials: {
                upper: 'Full Grain Leather',
                outsole: 'Dual Density PU',
                toe_cap: 'Composite',
                midsole: 'Kevlar',
                lining: 'Insulating Textile'
              },
              moq: '300 Pairs',
              features: ['18kV Insulation', 'Dielectric Sole', 'Metal Free']
            },
            zh: {
              name: '绝缘盾 S3',
              description: '适用于高压作业的电绝缘靴。通过18kV测试。',
              materials: {
                upper: '全粒面皮革',
                outsole: '双密度PU',
                toe_cap: '复合头',
                midsole: '凯夫拉',
                lining: '绝缘纺织'
              },
              features: ['18kV绝缘', '电介质鞋底', '无金属']
            }
          },
          // 13. 防静电洁净鞋
          {
            en: {
              name: 'CleanRoom ESD',
              model_code: 'LY-1306',
              description: 'ESD-safe shoe for electronics manufacturing and cleanroom environments.',
              safety_standard: 'S1',
              additional_certs: ['ESD', 'SRC'],
              style: 'Low Cut',
              industries: ['Executive'],
              materials: {
                upper: 'ESD Microfiber',
                outsole: 'ESD PU',
                toe_cap: 'Composite',
                midsole: 'None',
                lining: 'ESD Fabric'
              },
              moq: '800 Pairs',
              features: ['ESD Protection', 'Particle Free', 'Cleanroom Compatible'],
              is_new: true
            },
            zh: {
              name: '洁净室防静电鞋',
              description: '适用于电子制造和洁净室环境的防静电安全鞋。',
              materials: {
                upper: '防静电超纤',
                outsole: '防静电PU',
                toe_cap: '复合头',
                midsole: '无',
                lining: '防静电布料'
              },
              features: ['防静电', '无颗粒物', '洁净室兼容']
            }
          },
          // 14. 钢厂专用
          {
            en: {
              name: 'SteelMaster S3',
              model_code: 'LY-1407',
              description: 'Heavy-duty boot for steel mills and foundries. Extra heat and molten metal splash protection.',
              safety_standard: 'S3',
              additional_certs: ['SRC', 'HRO'],
              style: 'High Boot',
              industries: ['Mining'],
              materials: {
                upper: 'Chrome Leather + Aluminized',
                outsole: 'Heat Resistant Rubber',
                toe_cap: 'Steel',
                midsole: 'Steel Plate',
                lining: 'Aluminized Fabric'
              },
              moq: '400 Pairs',
              features: ['Molten Metal Resistant', 'Extra Thick Sole', 'Metatarsal Guard']
            },
            zh: {
              name: '钢厂专用 S3',
              description: '适用于钢厂和铸造厂的重型靴。额外的耐热和防熔融金属飞溅防护。',
              materials: {
                upper: '铬鞣皮 + 镀铝',
                outsole: '耐高温橡胶',
                toe_cap: '钢头',
                midsole: '防刺钢板',
                lining: '镀铝布料'
              },
              features: ['防熔融金属', '超厚鞋底', '跖骨防护']
            }
          },
          // 15. 医疗卫生鞋
          {
            en: {
              name: 'MediCare SB',
              model_code: 'LY-1508',
              description: 'Healthcare and medical facility shoe. Antimicrobial and easy to sanitize.',
              safety_standard: 'SB',
              additional_certs: ['SRC'],
              style: 'Low Cut',
              industries: ['Food'],
              materials: {
                upper: 'Antimicrobial Synthetic',
                outsole: 'Non-Marking Rubber',
                toe_cap: 'Composite',
                midsole: 'None',
                lining: 'Antimicrobial Fabric'
              },
              moq: '1000 Pairs',
              features: ['Antimicrobial', 'Easy Sanitize', 'Slip Resistant']
            },
            zh: {
              name: '医护专用 SB',
              description: '适用于医疗卫生设施的安全鞋。抗菌且易于消毒。',
              materials: {
                upper: '抗菌合成革',
                outsole: '不留痕橡胶',
                toe_cap: '复合头',
                midsole: '无',
                lining: '抗菌布料'
              },
              features: ['抗菌', '易消毒', '防滑']
            }
          },
          // 16. 超轻跑鞋款
          {
            en: {
              name: 'SpeedRunner S1P',
              model_code: 'LY-1609',
              description: 'Ultra-lightweight safety runner. Perfect for express delivery and courier services.',
              safety_standard: 'S1P',
              additional_certs: ['SRC'],
              style: 'Sporty',
              industries: ['Logistics'],
              materials: {
                upper: 'Flyknit Mesh',
                outsole: 'EVA Foam + Rubber',
                toe_cap: 'Composite',
                midsole: 'Kevlar',
                lining: 'Moisture Wicking'
              },
              moq: '1000 Pairs',
              features: ['Ultra Lightweight', 'Running Comfort', 'Breathable'],
              is_new: true,
              is_hot: true
            },
            zh: {
              name: '极速跑鞋款 S1P',
              description: '超轻量安全跑鞋。非常适合快递和配送服务。',
              materials: {
                upper: '飞织网布',
                outsole: 'EVA泡沫 + 橡胶',
                toe_cap: '复合头',
                midsole: '凯夫拉',
                lining: '吸湿排汗'
              },
              features: ['超轻量', '跑鞋舒适', '透气']
            }
          }
        ];

        for (const p of PRODUCTS_DATA) {
          console.log(`📦 Creating: ${p.en.name} / ${p.zh.name}...`);
          
          // 1. 创建英文版（主条目）
          const enEntry = await strapi.entityService.create('api::product.product', {
            data: {
              ...p.en,
              publishedAt: new Date(),
              locale: 'en',
            },
          });
          console.log(`  ✓ English version (ID: ${enEntry.id})`);

          // 2. 创建中文版并关联到英文版
          // 关键：locale 必须作为 create 的选项传入，不能放在 data 里，否则 Strapi 会忽略
          const zhData = {
            ...p.en,  // 先复制所有英文字段（包括共用字段）
            ...p.zh,  // 用中文数据覆盖需要翻译的字段
          };

          const zhEntry = await strapi.entityService.create('api::product.product', {
            data: {
              ...zhData,
              publishedAt: new Date(),
              localizations: [enEntry.id],  // 关联到英文版
            },
            locale: zhLocale,  // 中文 locale 放在选项层级，Strapi 才会正确写入数据库
          });
          console.log(`  ✓ Chinese version (ID: ${zhEntry.id}, locale: ${zhEntry.locale || zhLocale})`);
          console.log(`  ✅ Linked successfully`);
        }
        console.log(`✅ Successfully seeded 16 products with proper i18n links (16 English + 16 Chinese = 32 entries).`);
      }
    } catch (error) {
      console.error('❌ Product Seeding Failed:', error);
      console.error(error);
    }
  },
};
