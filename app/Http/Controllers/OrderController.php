<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Product;
use App\Models\Customer;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('orders/index', [
            'orders' => Order::with(['customer', 'orderItems.product'])->latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('orders/create', [
            'products' => Product::where('is_available', true)->get(),
            'customers' => Customer::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'type' => 'required|in:Delivery,Dine-in,Takeaway',
            'pickup_time' => 'nullable|string',
            'table_number' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        return \DB::transaction(function () use ($validated) {
            $totalAmount = 0;
            $orderItems = [];

            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $subtotal = $product->price * $item['quantity'];
                $totalAmount += $subtotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal,
                ];
            }

            $order = Order::create([
                'customer_id' => $validated['customer_id'],
                'status' => 'Pending',
                'type' => $validated['type'],
                'pickup_time' => $validated['pickup_time'] ?? null,
                'table_number' => $validated['table_number'] ?? null,
                'total_amount' => $totalAmount,
            ]);

            foreach ($orderItems as $itemData) {
                $order->orderItems()->create($itemData);
            }

            return redirect()->route('orders.index');
        });
    }

    public function edit(Order $order): Response
    {
        return Inertia::render('orders/edit', [
            'order' => $order->load(['customer', 'orderItems.product']),
            'products' => Product::where('is_available', true)->get(),
            'customers' => Customer::all(),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'sometimes|in:Pending,Delivering,Completed,Cancelled',
            'type' => 'sometimes|in:Delivery,Dine-in,Takeaway',
            'pickup_time' => 'nullable|string',
            'table_number' => 'nullable|string',
            'customer_id' => 'sometimes|exists:customers,id',
            'items' => 'sometimes|array',
        ]);

        if (isset($validated['status']) && count($validated) === 1) {
            $order->update($validated);
            return redirect()->back();
        }

        return \DB::transaction(function () use ($validated, $order) {
            if (isset($validated['items'])) {
                $order->orderItems()->delete();
                $totalAmount = 0;
                foreach ($validated['items'] as $item) {
                    $product = Product::findOrFail($item['product_id']);
                    $subtotal = $product->price * $item['quantity'];
                    $totalAmount += $subtotal;
                    $order->orderItems()->create([
                        'product_id' => $product->id,
                        'quantity' => $item['quantity'],
                        'unit_price' => $product->price,
                        'subtotal' => $subtotal,
                    ]);
                }
                $validated['total_amount'] = $totalAmount;
            }

            $order->update($validated);
            return redirect()->route('orders.index');
        });
    }
}
