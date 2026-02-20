<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'admin@pizzahut.com'],
            [
                'name' => 'PizzaHut Admin',
                'password' => Hash::make('password'),
                'role' => 'Admin'
            ]
        );

        User::updateOrCreate(
            ['email' => 'manager@pizzahut.com'],
            [
                'name' => 'Sarah Manager',
                'password' => Hash::make('password'),
                'role' => 'Manager'
            ]
        );

        User::updateOrCreate(
            ['email' => 'chef@pizzahut.com'],
            [
                'name' => 'Chef Mario',
                'password' => Hash::make('password'),
                'role' => 'Chef'
            ]
        );

        User::updateOrCreate(
            ['email' => 'reception@pizzahut.com'],
            [
                'name' => 'Front Desk Linda',
                'password' => Hash::make('password'),
                'role' => 'Receptionist'
            ]
        );

        // Seed Products
        $products = [
            // Classic Pizzas
            [
                'name'         => 'Pepperoni Feast',
                'price'        => 18.99,
                'description'  => 'Classic pepperoni with extra mozzarella cheese.',
                'ingredients'  => 'Tomato Sauce, Mozzarella, Double Pepperoni, Italian Herbs',
                'category'     => 'Pizza',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=1780&auto=format&fit=crop',
            ],
            [
                'name'         => 'Veggie Lover',
                'price'        => 16.50,
                'description'  => 'Fresh mushrooms, green peppers, onions, tomatoes, and black olives.',
                'ingredients'  => 'Tomato Sauce, Mozzarella, Mushrooms, Green Peppers, Red Onions, Fresh Tomatoes, Black Olives',
                'category'     => 'Pizza',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop',
            ],
            // Signature Pizzas
            [
                'name'         => 'BBQ Chicken Blast',
                'price'        => 22.00,
                'description'  => 'Grilled chicken, red onions, and cilantro with a smoky BBQ sauce base.',
                'ingredients'  => 'BBQ Sauce, Mozzarella, Grilled Chicken, Red Onions, Cilantro',
                'category'     => 'Signature',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'name'         => 'Super Supreme',
                'price'        => 24.50,
                'description'  => 'The ultimate pizza with 9 premium toppings.',
                'ingredients'  => 'Tomato Sauce, Mozzarella, Pepperoni, Beef, Pork, Ham, Mushrooms, Green Peppers, Onions, Olives',
                'category'     => 'Signature',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop',
            ],
            // Delight Pizzas
            [
                'name'         => 'Thin Crust Garden Delight',
                'price'        => 17.00,
                'description'  => 'Light and crispy thin crust topped with fresh garden veggies.',
                'ingredients'  => 'Lite Tomato Sauce, Part-Skim Mozzarella, Spinach, Zucchini, Roasted Peppers',
                'category'     => 'Delight',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2070&auto=format&fit=crop',
            ],
            [
                'name'         => 'Chicken Bacon Delight',
                'price'        => 19.50,
                'description'  => 'Creamy garlic parmesan sauce with chicken and smoky bacon.',
                'ingredients'  => 'Garlic Parm Sauce, Mozzarella, Grilled Chicken, Smoked Bacon, Spring Onions',
                'category'     => 'Delight',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=1925&auto=format&fit=crop',
            ],
            // Beverages
            [
                'name'         => 'Coca-Cola (500ml)',
                'price'        => 2.50,
                'description'  => 'Classic refreshing Coca-Cola.',
                'ingredients'  => 'Carbonated Water, Sugar, Caramel Color, Phosphoric Acid, Natural Flavors, Caffeine',
                'category'     => 'Beverages',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1887&auto=format&fit=crop',
            ],
            [
                'name'         => 'Sprite (500ml)',
                'price'        => 2.50,
                'description'  => 'Crisp, refreshing lemon-lime soda.',
                'ingredients'  => 'Carbonated Water, Sugar, Citric Acid, Natural Flavors, Sodium Citrate',
                'category'     => 'Beverages',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1887&auto=format&fit=crop',
            ],
            [
                'name'         => 'Iced Lemon Tea',
                'price'        => 3.00,
                'description'  => 'Refreshing chilled black tea with a hint of lemon.',
                'ingredients'  => 'Water, Black Tea Extract, Sugar, Lemon Juice, Citric Acid',
                'category'     => 'Beverages',
                'is_available' => true,
                'image_path'   => 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=1964&auto=format&fit=crop',
            ],
        ];

        foreach ($products as $p) {
            \App\Models\Product::updateOrCreate(['name' => $p['name']], $p);
        }


        // Seed Customers
        $customers = [
            ['name' => 'Heshan Bandaranayake', 'email' => 'heshan@example.com', 'phone' => '0771234567', 'address' => '123 Pizza Street', 'city' => 'Colombo'],
            ['name' => 'Jane Cooper', 'email' => 'jane@example.com', 'phone' => '0719876543', 'address' => '456 Crust Road', 'city' => 'Kandy'],
        ];

        foreach ($customers as $c) {
            \App\Models\Customer::firstOrCreate(['email' => $c['email']], $c);
        }
        // Seed Sizes
        $sizes = [
            ['name' => 'Personal', 'price_modifier' => 0.00],
            ['name' => 'Medium', 'price_modifier' => 4.00],
            ['name' => 'Large', 'price_modifier' => 8.00],
        ];

        foreach ($sizes as $s) {
            \App\Models\PizzaSize::updateOrCreate(['name' => $s['name']], $s);
        }

        // Seed Toppings
        $toppings = [
            ['name' => 'Extra Cheese', 'price' => 2.00],
            ['name' => 'Mushrooms', 'price' => 1.50],
            ['name' => 'Onions', 'price' => 1.00],
            ['name' => 'Green Peppers', 'price' => 1.00],
            ['name' => 'Black Olives', 'price' => 1.50],
            ['name' => 'Pepperoni', 'price' => 2.50],
        ];

        foreach ($toppings as $t) {
            \App\Models\Topping::updateOrCreate(['name' => $t['name']], $t);
        }
    }
}
