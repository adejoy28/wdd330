// Create Calculator

class Calculator {

    #a; #b;

    read() {

        this.#a = parseInt(prompt("Give first value: "));
        this.#b = parseInt(prompt("Give second value: "));
    }
    sum() {
        // returns the sum of a and b
        return this.#a + this.#b;
    }
    mul() {
        // returns the multiplications of saved values
        return this.#a * this.#b;
    }

}

let calc = new Calculator();
calc.read();