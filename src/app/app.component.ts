import { Component } from '@angular/core';
import {SqliteService} from "./services/sqlite.service";
import {Todo} from "./entities/todo.entity";
import sqliteParams from "../databases/sqliteParams";
import authorDataSource from "../databases/datasources/AuthorDataSource";
import "reflect-metadata"
import {SqliteQueryService} from "./services/sqlite-query.service";
import {Author} from "../databases/entities";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sqlite: SqliteQueryService) {}

  async ngOnInit() {
    await this.initializeDataSources()
    // await this.sqlite.initTables()
    await this.sqlite.getAuthor()

    const newAuthor = new Author()
    newAuthor.email = 'deivod_halo@gmail.com'
    newAuthor.name = 'David San Luis'
    newAuthor.birthday = '13/10/1998'

    await this.sqlite.checkDatabaseExists()

    // await this.sqlite.addAuthor(newAuthor)
    // await this.sqlite.getAuthor()

  }

   initializeDataSources = async () => {
    //check sqlite connections consistency
    console.log("checkConnectionsConsistency ....")

    await sqliteParams.connection.checkConnectionsConsistency()
      .catch((e) => {
        console.log(e);
        return {};
      });
    // Loop through the DataSources
    for (const mDataSource of [authorDataSource]) {
      // initialize
      console.log("inicializando database ....")
      await mDataSource.dataSource.initialize();
      console.log("database inicializada ....")
      if (mDataSource.dataSource.isInitialized) {
        // run the migrations
        await mDataSource.dataSource.runMigrations();
      }
      if( sqliteParams.platform === 'web') {
        await sqliteParams.connection.saveToStore(mDataSource.dbName);
      }
    }
  }
}
