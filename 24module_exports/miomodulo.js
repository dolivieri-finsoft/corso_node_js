"use strict"

class MiaClasse{
    static mioMetodo(parametro){
        return "echo "+parametro;
    }
    metodoNonStatic(parametro){
        return "echo (non static) "+parametro;
    }
}

module.exports = MiaClasse;