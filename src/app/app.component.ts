import { Component } from '@angular/core';
import {SqliteService} from "./services/sqlite.service";
import {Todo} from "./entities/todo.entity";
import sqliteParams from "../databases/sqliteParams";
import authorDataSource from "../databases/datasources/AuthorDataSource";
import "reflect-metadata"
import {SqliteQueryService} from "./services/sqlite-query.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private sqlite: SqliteQueryService) {}

  async ngOnInit() {
    await this.initializeDataSources()
    await this.sqlite.initTables()
    // await this.sqlite.getAuthor()
    await this.sqlite.getAuthor()
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
