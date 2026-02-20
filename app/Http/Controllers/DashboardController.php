<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response|\Illuminate\Http\RedirectResponse
    {
        if (auth()->user()->role === 'Customer') {
            return redirect('/');
        }

        $stats = [
            'totalRevenue' => Order::where('status', 'Completed')->sum('total_amount'),
            'activeOrders' => Order::whereIn('status', ['Pending', 'Delivering'])->count(),
            'avgPrepTime' => '12 min',
            'staffCount' => \App\Models\User::count(),
        ];

        $staffRoles = \App\Models\User::toBase()
            ->select('role', \DB::raw('count(*) as count'))
            ->groupBy('role')
            ->pluck('count', 'role');

        $recentOrders = Order::with(['customer', 'orderItems.product'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'staffRoles' => $staffRoles,
            'recentOrders' => $recentOrders,
        ]);
    }
}
