function Person(gender) {
  this.gender = gender;
  alert('Person instantiated');
}

var person1 = new Person('Male');
var person2 = new Person('Female');

//display the person1 gender
alert('person1 is a ' + person1.gender); // person1 is a Male
alert('person2 is a ' + person2.gender); // person1 is a Male
