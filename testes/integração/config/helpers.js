const chai = require("chai");
const supertest = require("supertest");

global.assert = chai.assert;
global.expect = chai.expect;
global.request = supertest("http://localhost:1337");
global.isSubset = require("is-subset");

global.ultimoAbrigoInseridoId;
global.ultimoUsuarioInseridoId;
global.ultimoPetInseridoId;
