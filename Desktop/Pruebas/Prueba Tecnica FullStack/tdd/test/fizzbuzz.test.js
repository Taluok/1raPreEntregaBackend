import { describe, expect, it } from "vitest"

/*Consigna: Escribir una funcion que al pasar un numero: 
- Muestre "fizz" si es multiplo de 3.
- Muestre "buzz" si es multiplo de 5.
- Muestre "fizzbuzz" si es multiplo de 3 y 5.
-muestre el numero si no es multiplo de ninguno de los anteriores*/ 

const fizzbuzz = (num) => { //La función fizzbuzz recibe un parámetro num que se espera sea un número.
    if(typeof num !== 'number'){ //si el typeof num no es un num va a mostrar error
        throw new Error('parameter provided must be a number')
    }
}
describe('fizzbuzz', () => { //utilizo la función describe para agrupar las pruebas relacionadas con la función fizzbuzz.
    it('should be a function', () => { // it para definir cada prueba individual.
        expect(typeof fizzbuzz).toBe('function') //En la primera prueba, se verifica que fizzbuzz sea una función.
    })

    it('should throw if not number is provided as parameter', () => { //En la segunda prueba, se verifica que la función arroje un error si no se proporciona un número como parámetro.
        expect(() => fizzbuzz()).toThrow()
    })

    it('should throw a specific error message if not a number is provided as parameter', () => { //En la tercera prueba, se verifica que el error arrojado contenga la palabra 'number' en su mensaje.
        expect(() => fizzbuzz()).toThrow(/number/)
    })

})