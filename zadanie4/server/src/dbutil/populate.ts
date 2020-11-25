import { query } from "express"
import { QueryRunner } from "typeorm"
import { Query } from "typeorm/driver/Query"
import { State } from "../entity/State"

class StateQuery {
    static get listOfAll(): Array<string> {
        let list: Array<string> = [
            'NOT_APPROVED',
            'APPROVED',
            'CANCELED',
            'COMPLETED'
        ]
        return list
    }
    static get insertSQL(): Array<string> {
        let sql: Array<string> = []
        StateQuery.listOfAll.forEach((el)=>{
            let s = 'INSERT INTO "state" ("id") VALUES ("'+el+'")'
            sql.push(s)
        })
        return sql
    }     
    static get removeSql(): Array<string> {
        let sql: Array<string> = []
        StateQuery.listOfAll.forEach((el)=>{
            let s = 'DELETE FROM "state" WHERE id = "'+el+'"'
            sql.push(s)
        })
        return sql
    }
    
    static up(queryRunner: QueryRunner) {
        StateQuery.insertSQL.forEach((sql)=> {
            queryRunner.query(sql)
        })
    }

    static down(queryRunner: QueryRunner) {
        StateQuery.removeSql.forEach((sql)=> {
            queryRunner.query(sql)
        })
    }
}

class ProductQuery {
    static get nameOfProducts(): Array<string> {
        let list: Array<string> = [
            'NOT_APPROVED',
            'APPROVED',
            'CANCELED',
            'COMPLETED'
        ]
        return list
    }
    static get insertSQL(): Array<string> {
        let sql: Array<string> = []
        return sql
    }     
    static get removeSql(): Array<string> {
        let sql: Array<string> = []
        return sql
    }
    
    static up(queryRunner: QueryRunner) {
        StateQuery.insertSQL.forEach((sql)=> {
            queryRunner.query(sql)
        })
    }

    static down(queryRunner: QueryRunner) {
        StateQuery.removeSql.forEach((sql)=> {
            queryRunner.query(sql)
        })
    }
}

function populateUp(queryRunner: QueryRunner) {
    StateQuery.up(queryRunner)
}

function populateDown(queryRunner: QueryRunner) {
    StateQuery.down(queryRunner)
}

export { populateUp, populateDown }