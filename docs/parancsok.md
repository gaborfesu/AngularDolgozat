# Parancsok

A projektet létrehozó parancsok.

## Járművek

### Projekt létrehozása

composer create-project laravel/laravel jarmu

### Adatbázis

A .env állomány:

```ini

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```

```bash
touch database/database.sqlite
copy nul database/database.sqlite
```

```bash
php artisan make:migration create_vehicle_table
```

A database/migrations/2022_02_14_190705_create_vehicle_table.php fájl szerkesztése:

```php
//...
            $table->increments('id');
            $table->string('plate', 20);
            $table->string('brand', 20);
            $table->integer('year');
            $table->decimal('price', 10, 2);
            $table->boolean('sold');
            $table->timestamps();
```

Migráció:

```bash
php artisan migrate 
php artisan migrate:status
```

### Model létrehozása

Ez létrehozza a Model-t is kérdésre:

```bash
php artisan make:controller VehiclesController --model=Vehicles --resource --requests
```

### Routing

Szerkesszük a következő fájlt: routes/api.php

```php
Route::apiResource('vehicles', VehiclesController::class);
```

Indítjuk a szervert:

```bash
php artisan serve
```

### Insomnia

Insomniában megnézzük:

* http://127.0.0.1:8000/api/vehicles

### Kontroller

Szerkesszük a app/Http/Controllers/VehiclesController.php fájlt:

```php
    public function index()
    {
        //
        return Vehicles::all();        
    }
```

### Insomnia újra

Ez get metódussal elérhető. Insomniában újra:

* http://127.0.0.1:8000/api/vehicles

### Azonosítva

Az eléréshez engedélyezni kell a app/Http/Requests/StoreVehiclesRequest.php állományt:

```php
<?php

namespace App\Http\Requests;


class StoreVehiclesRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    //...    
}
```

### Kitölthető

És app/Models/Vehicles.php:

```php
    use HasFactory; 

    protected $fillable = [
        'plate',
        'brand',
        'year',
        'price',
        'sold'
    ];
```

### Migráció

A migráció nem volt sikeres.
Ezért volt:

```bash
php artisan migrate:rollback
```

Majd újra:

```bash
php artisan migrate
```

Az Insomniában kell:

```http
Accept   application/json
```

### Azonosítva újra

Szerkesszük a app/Http/Requests/UpdateVehiclesRequest.php állományt:

```php
    public function authorize()
    {
        return true;
    }
```

Itt fel kell venni egy $id paramétert. Szerkesszük a 
app/Http/Controllers/VehiclesController.php állományt:

```php
    public function destroy(Vehicles $vehicles, $id)
    {
        return Vehicles::destroy($id);
        
    }
```

### Routing javítása

Szerkesszük a routes/app.php fájlt:

```php
Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::apiResource('vehicles', VehiclesController::class)
    ->except('index');
});

Route::get('vehicles', [VehiclesController::class, 'index']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
```

## Ügyfelek
