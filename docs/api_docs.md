# jarat

A jarat egy járműnyilvántartó jármű kereskedők számára.

A jarmu egy backend szolgáltatást valósít meg REST API formájában. Az adatok JSON formátuban utaznak a szerver és a kliens között.

## Adatbázis

Tetszőleges adatbázis használható. Az adatábázisok migrálással létrejönnek.

## Végpontok

| Végpont            | Metódus | Hitelesítés | Siker  |
|--------------------|---------|-------------|--------|
| /api/register      | POST    | nem         | 201 Created |
| /api/login         | POST    | nem         | 200 OK |
| /api/logout        | POST    | igen        | 200 OK |
| /api/vehicles      | GET     | nem         | 200 OK |
| /api/vehicles      | POST    | igen        | 201 Created |
| /api/vehicles/{id} | PUT     | igen        | 200 OK |
| /api/vehicles/{id} | DELETE  | igen        | 200 OK |

Azonosítást igénylő végpontok, azonosítás nélkül 401 Unauthorized
választ adnak.

A /register végponton meg kell adni:
* felhasználónév
* email cím
* jelszó

Az elvárt JSON adatok:

```json
{
	"name": "janos",
	"email": "janos@zold.lan",
	"password":"titok",
	"password_confirmation": "titok"
}
```



A /login végponton meg kell adni:
* felhasználónév
* jelszó