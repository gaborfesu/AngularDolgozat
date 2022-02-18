# jarat

A jarat egy járműnyilvántartó jármű kereskedők számára.

A jarmu egy backend szolgáltatást valósít meg REST API formájában. Az adatok JSON formátuban utaznak a szerver és a kliens között.

## Adatbázis

Tetszőleges adatbáis használható. Az adatábázisok migrálással létrejönnek.

## Végpontok

| Végpont            | Metódus | Hitelesítés | Siker  |
|--------------------|---------|-------------|--------|
| /api/register      | POST    | nem         | 201 Created |
| /api/login         | POST    | nem         | 200 OK |
| /api/vehicles      | GET     | nem         | 200 OK |
| /api/vehicles      | POST    | igen        | 201 Created |
| /api/vehicles/{id} | PUT     | igen        | 200 OK |
| /api/vehicles/{id} | DELETE  | igen        | 200 OK |

Azonosítást igénylő végpontok, azonosítás nélkül 401 Unauthorized
választ adnak.
