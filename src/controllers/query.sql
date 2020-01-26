SELECT * from public.product_variant where ( variant_name ILIKE :search_name OR 
          variant_description ILIKE :search_name OR 
          product_name ILIKE :search_name OR 
          description_product ILIKE :search_name OR 
          company_name ILIKE :search_name) 