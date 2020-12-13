<?php

namespace App\Http\Controllers;

use App\Models\SocialAuth;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    public function redirect($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function callback($provider)
    {
        $providerUser = Socialite::driver($provider)->stateless()->user();

        if (!$providerUser->token) {
            throw new Exception('Unauthorized');
        }

        $user = User::whereEmail($providerUser->email)->first();

        if (!$user) {
            $user = User::create([
                'name' => $providerUser->name,
                'email' => $providerUser->email,
                'password' => Hash::make(Str::random(8))
            ]);

            SocialAuth::create([
                'user_id' => $user->id,
                'provider_user_id' => $providerUser->id,
                'provider' => $provider
            ]);
        } else {
            $socialAccounts = $user->socials()->where('provider', $provider)->first();

            if (!$socialAccounts) {
                SocialAuth::create([
                    'user_id' => $user->id,
                    'provider_user_id' => $providerUser->id,
                    'provider' => $provider
                ]);
            }
        }

        return $user->createToken('megaMarket')->accessToken;
    }
}
