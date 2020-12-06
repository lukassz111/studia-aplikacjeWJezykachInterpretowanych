import { QueryRunner } from "typeorm"
import * as data from "./populate_data.json"
class PopulateData {
    static get ListOfStates(): Array<string> {
        let list: Array<string> = [
            'NOT_APPROVED',
            'APPROVED',
            'CANCELED',
            'COMPLETED'
        ]
        return list
    }
    static get ListOfCategory(): Array<string> {
        return data.category;
    }
    static get ListOfProduct(): Array<any> {
        return data.product;
    }
}

let sqlUp: Array<string> = []
let sqlDown: Array<string> = []

//States up
PopulateData.ListOfStates.forEach((el)=>{
    let s = 'INSERT INTO "state" ("id") VALUES ("'+el+'")'
    sqlUp.push(s)
})
//States down
PopulateData.ListOfStates.forEach((el)=>{
    let s = 'DELETE FROM "state" WHERE id = "'+el+'"'
    sqlDown.push(s)
})
//Category up
PopulateData.ListOfCategory.forEach((el)=> {
    let s = 'INSERT INTO "category" ("id") VALUES ("'+el+'")'
    sqlUp.push(s)
})
//Category down
PopulateData.ListOfCategory.forEach((el)=> {
    let s = 'DELETE FROM "category" WHERE id = "'+el+'"'
    sqlDown.push(s)
})
//Products up
PopulateData.ListOfProduct.forEach((el)=> {
    let category: string = el.category
    let name: string = el.name
    let description: string = el.description
    let price: number = el.price
    let weight: number = el.weight
    let s = 'INSERT INTO "product" ("name","description","price","weight","categoryId") VALUES('
    s += `"${name}", "${description}", ${price}, ${weight}, "${category}" )`
    sqlUp.push(s)    
})
//Products down TODO


function populateUp(queryRunner: QueryRunner) {
    sqlUp.forEach((sql: string) =>{
        queryRunner.query(sql);
    })
}

function populateDown(queryRunner: QueryRunner) {
    sqlDown.forEach((sql: string) =>{
        queryRunner.query(sql);
    })
}

export { populateUp, populateDown }