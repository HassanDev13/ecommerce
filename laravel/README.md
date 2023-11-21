## CLI NEED IT
Make sail alias :  alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
Check if your swagger doc is good : sail php artisan l5-swagger:generate

## Start Laravel 
sail up

## Start Nextjs (if you want)
pnpm run dev 

# Run Migration
run migration : sail php artisan migrate
reset migration : sail php artisan migrate:reset
clear migration : sail php artisan migrate:refresh 

if every think works fine here the links :

## Links 

Swagger doc : http://localhost/api/documentation
Frontend : http://localhost/3000
Backend : http://localhost

## Seeders 
sail php artisan make:seeder ProductSeeder
sail php artisan make:factory ProductFactory
sail php artisan db:seed --class=ProductSeeder

  sail php artisan make:seeder ConsumerSeeder && sail php artisan make:factory  ConsumerFactory
  sail php artisan make:seeder DeliveryPersonnelSeeder && sail php artisan make:factory  DeliveryPersonnelFactory
   sail php artisan make:seeder ImageSeeder && sail php artisan make:factory ImageFactory
    sail php artisan make:seeder OrderSeeder && sail php artisan make:factory  OrderFactory
     sail php artisan make:seeder OrderProdectSeeder && sail php artisan make:factory  OrderProdectFactory
      sail php artisan make:seeder RatingSeeder && sail php artisan make:factory  RatingFactory
  