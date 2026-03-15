UPDATE products SET 
  description = $$Heavy-duty steel toe work boot with full-grain leather upper, ASTM F2413-18 compliant steel toe, and oil/slip-resistant rubber outsole.$$,
  features = $$["ASTM F2413-18 steel toe protection","Puncture-resistant midsole","Oil & slip-resistant rubber outsole","Breathable moisture-wicking lining","Shock-absorbing EVA midsole","Cushioned padded collar"]$$::jsonb,
  specs = $${"upper_material":"Full-grain leather","lining":"Moisture-wicking mesh","toe_cap":"Steel toe","midsole":"EVA + puncture-resistant plate","outsole":"Oil/slip-resistant rubber","sole_type":"Rubber","standards":["ASTM F2413-18","EN ISO 20345 SB"],"certifications":["CE","ANSI"],"slip_resistance":"SRC","electrical_hazard":true,"puncture_resistant":true,"waterproof":false,"insulated":false,"weight":"2.50 lbs (size 9)","sizes":["7","8","9","10","11","12"],"colors":["Black","Brown"]}$$::jsonb,
  applications = $$["Construction","Manufacturing","Warehouse","Logistics"]$$::jsonb
WHERE id IN (1,2);
