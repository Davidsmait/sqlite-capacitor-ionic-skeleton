import { Injectable } from '@angular/core';
import {Todo} from "../entities/todo.entity";
import authorDataSource from "../../databases/datasources/AuthorDataSource";
import sqliteParams from "../../databases/sqliteParams";

import {Author} from "../../databases/entities";

@Injectable({
  providedIn: 'root'
})
export class SqliteQueryService {

  constructor() { }

  async initTables(){
    const createTablesSQL = `
        CREATE TABLE IF NOT EXISTS author (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            birthday TEXT,
            email TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS post (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            text TEXT NOT NULL,
            author_id INTEGER,
            FOREIGN KEY (author_id) REFERENCES author(id)
        );

        CREATE TABLE IF NOT EXISTS category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        );
        `;
    for (const mDataSource of [authorDataSource]) {
      // const author = await mDataSource.dataSource.manager.find(Author)
      const author = await mDataSource.dataSource
        .query(createTablesSQL)
      console.log("author: ", author)
    }  }
  async getAuthor() {
    for (const mDataSource of [authorDataSource]) {
      // const author = await mDataSource.dataSource.manager.find(Author)
      const author = await mDataSource.dataSource.query('SELECT * FROM author')
      console.log("author: ", author)
    }

  }
}
