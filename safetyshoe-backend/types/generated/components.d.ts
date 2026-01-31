import type { Schema, Struct } from '@strapi/strapi';

export interface ProductMaterialSpec extends Struct.ComponentSchema {
  collectionName: 'components_product_material_specs';
  info: {
    description: 'Product material specifications';
    displayName: 'Material Spec';
  };
  attributes: {
    lining: Schema.Attribute.String;
    midsole: Schema.Attribute.String;
    outsole: Schema.Attribute.String;
    toe_cap: Schema.Attribute.String;
    upper: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.material-spec': ProductMaterialSpec;
    }
  }
}
