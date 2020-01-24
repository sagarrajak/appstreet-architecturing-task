CREATE OR REPLACE view product_variant as select  
product.id as product_id,
variant.variant_name,
variant.variant_description,
variant.price,
variant.id as variant_id,
product.product_name,
product.description_product,
product.company_name
FROM  public.variant as variant inner join public.product as product on variant.product_id = product.id;