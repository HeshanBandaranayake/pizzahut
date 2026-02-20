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

        User::firstOrCreate(
            ['email' => 'admin@pizzahut.com'],
            [
                'name' => 'PizzaHut Admin',
                'password' => Hash::make('password'),
                'role' => 'Admin'
            ]
        );

        User::firstOrCreate(
            ['email' => 'manager@pizzahut.com'],
            [
                'name' => 'Sarah Manager',
                'password' => Hash::make('password'),
                'role' => 'Manager'
            ]
        );

        User::firstOrCreate(
            ['email' => 'chef@pizzahut.com'],
            [
                'name' => 'Chef Mario',
                'password' => Hash::make('password'),
                'role' => 'Chef'
            ]
        );

        User::firstOrCreate(
            ['email' => 'reception@pizzahut.com'],
            [
                'name' => 'Front Desk Linda',
                'password' => Hash::make('password'),
                'role' => 'Receptionist'
            ]
        );

        // Seed Products
        $products = [
            ['name' => 'Pepperoni Feast', 'price' => 18.99, 'description' => 'Classic pepperoni with extra mozzarella cheese.', 'category' => 'Pizza', 'is_available' => true],
            ['name' => 'Veggie Lover', 'price' => 16.50, 'description' => 'Fresh mushrooms, green peppers, onions, tomatoes, and black olives.', 'category' => 'Pizza', 'is_available' => true],
            ['name' => 'Meat Lover', 'price' => 21.00, 'description' => 'Pepperoni, Italian sausage, ham, bacon, and seasoned pork.', 'category' => 'Pizza', 'is_available' => true],
            ['name' => 'Hawaiian', 'price' => 17.50, 'description' => 'Sweet pineapple and savory ham with premium cheese.', 'category' => 'Pizza', 'is_available' => true],
        ];

        foreach ($products as $p) {
            \App\Models\Product::firstOrCreate(['name' => $p['name']], $p);
        }

        // Seed Customers
        $customers = [
            ['name' => 'Heshan Bandaranayake', 'email' => 'heshan@example.com', 'phone' => '0771234567', 'address' => '123 Pizza Street', 'city' => 'Colombo'],
            ['name' => 'Jane Cooper', 'email' => 'jane@example.com', 'phone' => '0719876543', 'address' => '456 Crust Road', 'city' => 'Kandy'],
        ];

        foreach ($customers as $c) {
            \App\Models\Customer::firstOrCreate(['email' => $c['email']], $c);
        }
    }
}
