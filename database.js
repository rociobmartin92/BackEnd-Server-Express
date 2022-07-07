// INSTALL mongoose:

// Mongoose es una librería para Node.js que nos permite escribir consultas para una base de datos de MongooDB
// Mongoose administra las relaciones entre los datos, proporciona validación de esquemas
// y se utiliza para traducir entre objetos en el código y la representación de esos objetos en MongoDB.
// Traduce

// MongoDB es una base de datos de documentos NoSQL sin esquema, es decir, puede almacenar documentos JSON en él,
// y la estructura de estos documentos puede variar, ya que no se aplica como las bases de datos SQL.
// Un documento es un objeto JSON, que luego se coloca dentro de una colección (conjunto de documentos).
// En lugar de guardar los datos en tablas, MongoDB guarda estructuras de datos BSON.

// Mongoose le permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB.
// Mongoose actualmente contiene ocho SchemaTypes que una propiedad se guarda como cuando se conserva a MongoDB. Son:
// - String (Cadena)
// - Number (Número)
// - Date (Fecha)
// - Buffer
// - Boolean (Booleano)
//  - Mixed (Mixto)
// - ObjectId
// - Array (Matriz)

// Una vez asignado un tipado para cada documento, Una vez que se define un esquema, Mongoose
// nos permite crear un Modelo basado en ese esquema
// Una vez que haya definido slos esquemas y modelos, Mongoose contiene muchas funciones diferentes que
// nos permiten validar, guardar, eliminar y consultar los datos utilizando las funciones comunes de MongoDB

