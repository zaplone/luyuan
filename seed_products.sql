-- 清空现有产品数据
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE products_localizations_lnk CASCADE;
TRUNCATE TABLE components_product_material_specs CASCADE;

-- 重置序列
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE components_product_material_specs_id_seq RESTART WITH 1;

-- 插入 16 个产品（英文版）
-- 1. Titan Pro S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('titan_pro_s3', 'Titan Pro S3', 'LY-1001', 'Our flagship heavy-duty boot. Designed for extreme construction environments with reinforced heel support.', '500 Pairs', 'S3', '["SRC", "HRO"]', 'High Boot', '["Construction", "Mining"]', '["Anti-Twist System", "Reflective Strips", "300J Impact Resistance"]', true, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 2. VoltGuard Composite
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('voltguard_composite', 'VoltGuard Composite', 'LY-2005', '100% Metal-Free design for electricians and high-security areas. Lightweight and airport friendly.', '500 Pairs', 'S1P', '["ESD", "SRC"]', 'Low Cut', '["Logistics", "Executive", "Oil & Gas"]', '["Metal Free", "Lightweight", "ESD Protection"]', false, true, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 3. ChefSafe Grip
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('chefsafe_grip', 'ChefSafe Grip', 'LY-3002', 'Specialized for food industry. Easy-clean surface and superior slip resistance on oily floors.', '1000 Pairs', 'S2', '["SRC"]', 'Low Cut', '["Food"]', '["Machine Washable", "White Color", "Oil Resistant"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 4. Executive Comfort S1
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('executive_comfort_s1', 'Executive Comfort S1', 'LY-4008', 'Business casual safety shoe with premium leather finish. Perfect for office and light industrial environments.', '500 Pairs', 'S1', '["SRC"]', 'Low Cut', '["Executive", "Logistics"]', '["Business Look", "Extra Comfort", "Lightweight"]', true, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 5. Arctic Thermal S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('arctic_thermal_s3', 'Arctic Thermal S3', 'LY-5012', 'Insulated winter boot for extreme cold conditions. Tested down to -40°C with Thinsulate lining.', '300 Pairs', 'S3', '["SRC", "CI"]', 'High Boot', '["Construction", "Mining", "Oil & Gas"]', '["Cold Insulation", "Waterproof", "High Ankle Support"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 6. FlexWork S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('flexwork_s1p', 'FlexWork S1P', 'LY-6018', 'Sporty and flexible safety trainer. Perfect for fast-paced warehouse and logistics work.', '800 Pairs', 'S1P', '["SRC"]', 'Sporty', '["Logistics", "Executive"]', '["Athletic Design", "Breathable", "Flexible Sole"]', false, true, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 7. Welder Pro S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('welder_pro_s3', 'Welder Pro S3', 'LY-7025', 'Heat-resistant boot for welding and metal work. Features metatarsal guard and spark-resistant upper.', '500 Pairs', 'S3', '["SRC", "HRO"]', 'Mid Cut', '["Mining", "Oil & Gas"]', '["Heat Resistant", "Metatarsal Protection", "Spark Resistant"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 8. Summer Breeze SB
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('summer_breeze_sb', 'Summer Breeze SB', 'LY-8030', 'Open safety sandal for hot environments. Maximum breathability with toe protection.', '1000 Pairs', 'SB', '["SRC"]', 'Sandal', '["Food", "Logistics"]', '["Maximum Ventilation", "Adjustable Straps", "Summer Comfort"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 9. LadySafe S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('ladysafe_s1p', 'LadySafe S1P', 'LY-9001', 'Ergonomically designed for women. Narrower fit with enhanced arch support and stylish appearance.', '600 Pairs', 'S1P', '["SRC"]', 'Low Cut', '["Executive", "Logistics", "Food"]', '["Women''s Fit", "Stylish Design", "Arch Support"]', false, true, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 10. ChemShield S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('chemshield_s3', 'ChemShield S3', 'LY-1003', 'Chemical-resistant boot for laboratories and chemical plants. Acid and alkali resistant materials.', '400 Pairs', 'S3', '["SRC", "WR"]', 'High Boot', '["Chemical", "Mining"]', '["Chemical Resistant", "Acid Proof", "Easy Clean"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 11. TrailBlazer S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('trailblazer_s1p', 'TrailBlazer S1P', 'LY-1104', 'Hiking-style safety boot. Combines outdoor comfort with workplace protection.', '500 Pairs', 'S1P', '["SRC"]', 'Mid Cut', '["Construction", "Logistics"]', '["Hiking Comfort", "Lightweight", "All-Terrain Grip"]', true, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 12. IsoVolt S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('isovolt_s3', 'IsoVolt S3', 'LY-1205', 'Electrical insulation boot for high-voltage work. Tested up to 18kV.', '300 Pairs', 'S3', '["SRC", "HRO", "ESD"]', 'High Boot', '["Oil & Gas"]', '["18kV Insulation", "Dielectric Sole", "Metal Free"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 13. CleanRoom ESD
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('cleanroom_esd', 'CleanRoom ESD', 'LY-1306', 'ESD-safe shoe for electronics manufacturing and cleanroom environments.', '800 Pairs', 'S1', '["ESD", "SRC"]', 'Low Cut', '["Executive"]', '["ESD Protection", "Particle Free", "Cleanroom Compatible"]', false, true, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 14. SteelMaster S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('steelmaster_s3', 'SteelMaster S3', 'LY-1407', 'Heavy-duty boot for steel mills and foundries. Extra heat and molten metal splash protection.', '400 Pairs', 'S3', '["SRC", "HRO"]', 'High Boot', '["Mining"]', '["Molten Metal Resistant", "Extra Thick Sole", "Metatarsal Guard"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 15. MediCare SB
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('medicare_sb', 'MediCare SB', 'LY-1508', 'Healthcare and medical facility shoe. Antimicrobial and easy to sanitize.', '1000 Pairs', 'SB', '["SRC"]', 'Low Cut', '["Food"]', '["Antimicrobial", "Easy Sanitize", "Slip Resistant"]', false, false, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 16. SpeedRunner S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('speedrunner_s1p', 'SpeedRunner S1P', 'LY-1609', 'Ultra-lightweight safety runner. Perfect for express delivery and courier services.', '1000 Pairs', 'S1P', '["SRC"]', 'Sporty', '["Logistics"]', '["Ultra Lightweight", "Running Comfort", "Breathable"]', true, true, NOW(), NOW(), NOW(), 'en', 1, 1);

-- 插入中文版本
-- 1. 泰坦加强版 S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('titan_pro_s3', '泰坦加强版 S3', 'LY-1001', '我们的旗舰级重型防护靴。专为极端的建筑施工环境设计,配有增强型后跟支撑。', '500 Pairs', 'S3', '["SRC", "HRO"]', 'High Boot', '["Construction", "Mining"]', '["防扭转系统", "夜间反光条", "300J 抗冲击"]', true, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 2. 电盾复合防护鞋
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('voltguard_composite', '电盾复合防护鞋', 'LY-2005', '100% 无金属设计,专为电工和高安保区域打造。轻量化设计,可通过机场安检。', '500 Pairs', 'S1P', '["ESD", "SRC"]', 'Low Cut', '["Logistics", "Executive", "Oil & Gas"]', '["无金属", "超轻量", "防静电"]', false, true, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 3. 厨安防滑鞋
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('chefsafe_grip', '厨安防滑鞋', 'LY-3002', '食品行业专用。表面易清洁,在油腻地面具有卓越的防滑性能。', '1000 Pairs', 'S2', '["SRC"]', 'Low Cut', '["Food"]', '["可机洗", "白色洁净款", "耐油底"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 4. 行政舒适款 S1
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('executive_comfort_s1', '行政舒适款 S1', 'LY-4008', '商务休闲风格安全鞋,采用优质皮革表面。非常适合办公室和轻工业环境。', '500 Pairs', 'S1', '["SRC"]', 'Low Cut', '["Executive", "Logistics"]', '["商务外观", "超舒适", "轻量化"]', true, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 5. 极地保暖 S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('arctic_thermal_s3', '极地保暖 S3', 'LY-5012', '适用于极寒条件的保暖冬靴。经过-40°C测试,采用新雪丽保暖内里。', '300 Pairs', 'S3', '["SRC", "CI"]', 'High Boot', '["Construction", "Mining", "Oil & Gas"]', '["低温保暖", "全防水", "高帮护踝"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 6. 弹力工作鞋 S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('flexwork_s1p', '弹力工作鞋 S1P', 'LY-6018', '运动风格的灵活安全鞋。非常适合快节奏的仓储和物流工作。', '800 Pairs', 'S1P', '["SRC"]', 'Sporty', '["Logistics", "Executive"]', '["运动设计", "透气", "柔韧鞋底"]', false, true, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 7. 焊工专业版 S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('welder_pro_s3', '焊工专业版 S3', 'LY-7025', '适用于焊接和金属加工的耐热靴。配备跖骨防护和防火花鞋面。', '500 Pairs', 'S3', '["SRC", "HRO"]', 'Mid Cut', '["Mining", "Oil & Gas"]', '["耐高温", "跖骨防护", "防火花"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 8. 夏日清风 SB
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('summer_breeze_sb', '夏日清风 SB', 'LY-8030', '适用于炎热环境的开放式安全凉鞋。最大化透气性并提供脚趾防护。', '1000 Pairs', 'SB', '["SRC"]', 'Sandal', '["Food", "Logistics"]', '["最大通风", "可调节绑带", "夏季舒适"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 9. 女士专用款 S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('ladysafe_s1p', '女士专用款 S1P', 'LY-9001', '专为女性设计的人体工学安全鞋。更窄鞋型配合增强足弓支撑和时尚外观。', '600 Pairs', 'S1P', '["SRC"]', 'Low Cut', '["Executive", "Logistics", "Food"]', '["女士鞋型", "时尚设计", "足弓支撑"]', false, true, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 10. 防化盾 S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('chemshield_s3', '防化盾 S3', 'LY-1003', '适用于实验室和化工厂的防化学品靴。采用耐酸碱材料。', '400 Pairs', 'S3', '["SRC", "WR"]', 'High Boot', '["Chemical", "Mining"]', '["防化学品", "耐酸碱", "易清洁"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 11. 轻装徒步款 S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('trailblazer_s1p', '轻装徒步款 S1P', 'LY-1104', '徒步风格的安全靴。结合户外舒适性与工作防护。', '500 Pairs', 'S1P', '["SRC"]', 'Mid Cut', '["Construction", "Logistics"]', '["徒步舒适", "轻量化", "全地形抓地"]', true, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 12. 绝缘盾 S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('isovolt_s3', '绝缘盾 S3', 'LY-1205', '适用于高压作业的电绝缘靴。通过18kV测试。', '300 Pairs', 'S3', '["SRC", "HRO", "ESD"]', 'High Boot', '["Oil & Gas"]', '["18kV绝缘", "电介质鞋底", "无金属"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 13. 洁净室防静电鞋
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('cleanroom_esd', '洁净室防静电鞋', 'LY-1306', '适用于电子制造和洁净室环境的防静电安全鞋。', '800 Pairs', 'S1', '["ESD", "SRC"]', 'Low Cut', '["Executive"]', '["防静电", "无颗粒物", "洁净室兼容"]', false, true, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 14. 钢厂专用 S3
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('steelmaster_s3', '钢厂专用 S3', 'LY-1407', '适用于钢厂和铸造厂的重型靴。额外的耐热和防熔融金属飞溅防护。', '400 Pairs', 'S3', '["SRC", "HRO"]', 'High Boot', '["Mining"]', '["防熔融金属", "超厚鞋底", "跖骨防护"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 15. 医护专用 SB
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('medicare_sb', '医护专用 SB', 'LY-1508', '适用于医疗卫生设施的安全鞋。抗菌且易于消毒。', '1000 Pairs', 'SB', '["SRC"]', 'Low Cut', '["Food"]', '["抗菌", "易消毒", "防滑"]', false, false, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 16. 极速跑鞋款 S1P
INSERT INTO products (document_id, name, model_code, description, moq, safety_standard, additional_certs, style, industries, features, is_hot, is_new, published_at, created_at, updated_at, locale, created_by_id, updated_by_id) 
VALUES 
('speedrunner_s1p', '极速跑鞋款 S1P', 'LY-1609', '超轻量安全跑鞋。非常适合快递和配送服务。', '1000 Pairs', 'S1P', '["SRC"]', 'Sporty', '["Logistics"]', '["超轻量", "跑鞋舒适", "透气"]', true, true, NOW(), NOW(), NOW(), 'zh', 1, 1);

-- 验证数据
SELECT 
    id, 
    name, 
    model_code, 
    locale,
    CASE WHEN published_at IS NOT NULL THEN 'Published' ELSE 'Draft' END as status
FROM products 
ORDER BY model_code, locale;
