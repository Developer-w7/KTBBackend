let string="baccss";
let strarray=string.split('');
let ary={};
for(a of strarray){
(!ary[a])?ary[a]=1:ary[a]++;

}
for(b in ary){
    console.log(ary[b]>1) 
    if(ary[b]>1){
        break
    }
}


var pilots = [
    {
      id: 10,
      name: "Poe Dameron",
      years: 14,
    },
    {
      id: 2,
      name: "Temmin 'Snap' Wexley",
      years: 30,
    },
    {
      id: 41,
      name: "Tallissan Lintra",
      years: 16,
    },
    {
      id: 99,
      name: "Ello Asty",
      years: 22,
    }
  ];

  var totalYears = pilots.reduce(function (accumulator, pilot) {
    return accumulator + pilot.years;
  }, 0);

  console.log(totalYears)