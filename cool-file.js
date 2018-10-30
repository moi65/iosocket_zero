let data = [
  {
    country: 'China',
    population: 1409517397,
  },
  {
    country: 'India',
    population: 1339180127,
  },
  {
    country: 'USA',
    population: 324459463,
  },
  {
    country: 'Indonesia',
    population: 263991379,
  }
]

console.table(data)
data.push( {
    country: 'Suisse',
    population: 263991379,
  })
console.table(data)

let cities = data.filter(val => {
  return val.population > 500000000;
});
console.table(cities)

var monObjet = {couleur : 'rouge', hauteur: 170, largeur: 80};
for (prop in monObjet) {
    console.log( prop );
}

 monObjet = {couleur : 'rouge', hauteur: 170, largeur: 80};
for (prop in monObjet) {
    console.log( prop + " : " + monObjet[prop]  );
}