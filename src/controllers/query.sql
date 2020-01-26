SELECT * from public.product_variant where 
          variant_name LIKE :search_name OR 
          variant_description LIKE :search_name OR 
          price LIKE :search_name OR 
          product_name LIKE :search_name OR 
          description_product LIKE :search_name OR 
          company_name LIKE :search_name OR 