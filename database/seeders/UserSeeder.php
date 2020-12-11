<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->name = "admin";
        $user->email = "admin@megamarket.com";
        $user->password = bcrypt('pass');
        $user->remember_token = Str::random(10);
        $user->is_admin = true;
        $user->save();

        User::factory(10)->create();
    }
}
