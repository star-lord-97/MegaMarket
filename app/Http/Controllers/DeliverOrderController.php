<?php

namespace App\Http\Controllers;

use App\Models\Order;

class DeliverOrderController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Order $order)
    {
        $order->is_delivered = true;
        $order->save();
    }
}
