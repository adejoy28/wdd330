// Pseudocode

/**  CLASS AND INSTANCES
 * 
 * class Person  // SUPER CLASS
 *      properties
 *          name
 *      constuctor
 *          Person(name)
 *      methods
 *          introduceSelf(); 
 * 
 */
class Person {
    name;

    constructor(name) {
        this.name = name;
    }

    introduceSelf() {
        return (`Hi my name is ${this.name}`);
    }
}

/** OMITING THE CONSTRUCTOR
 * class Animal
 */
class Animal {
    sleep() {
        alert("zzzzzz");
    }
}

const spot = new Animal();

// spot.sleep();

/** class Professor : extends Person // SUBCLASS
 *      properties
 *          teaches
 *      constuctor
 *          Professor( teaches)
 *      methods
 *          grade(paper)
 */



/**
 * OBJECT DECLARATION AND INSTANTIATION OF CLASS OBJECT
 */

// const giles = new Person("Giles");

// alert(giles.introduceSelf());
// walsh = new Professor("Walsh", "Psychology");

// walsh.grade("This");


/**
 * INHERITANCE
 *
 *  class Student : Person // SUB CLASS OR CHILD CLASS
 *      porperties
 *          year
 *      constructor
 *          Student(year)
 *      methods
 *
 */

class Professor extends Person {
    teaches;

    constructor(name, teaches) {
        super(name);
        this.teaches = teaches
    }

    introduceSelf() {
        alert(
            `My name is ${this.name}, and I will be your ${this.teaches} professor.`
        );
    }

    grade(paper) {
        const grade = Math.floor(Math.random() * (5 - 1) + 1);
        alert(grade);
    }
}

const walsh = new Professor("Walsh", "Psychology");
walsh.introduceSelf();
walsh.grade("my paper");


//  ENCAPSULATION: This is the process of keeping an object's internal state private,
//  and generally making a clear division between
//  its public interface and its private internal
//  state.

class Student extends Person {
    #year;

    constructor(name, year) {
        super(name);
        this.#year = year;

    }

    introduceSelf() {
        alert(`Hi! I'm ${this.name}, and I'm in year ${this.#year}.`);
    }

    canStudyArchery() {
        return this.#year > 1;
    }
}

const john = new Student("John", 1);

john.introduceSelf();
alert(john.canStudyArchery());