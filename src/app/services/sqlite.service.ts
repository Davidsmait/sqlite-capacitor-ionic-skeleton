import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
} from '@capacitor-community/sqlite';
import { DataSource } from 'typeorm';
import { Todo } from '../entities/todo.entity';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqliteConnection!: SQLiteConnection;
  private dbConnection!: DataSource
  constructor() { }

  async initializeDatabase(passphrase: string): Promise<void> {
    try {
      this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
      await this.checkConnections()
      await this.listDatabases()
      await this.inspectTableStructure('test1','TODO')
      // Open or create DB
      // Set encryption passphrase
      const isSecretStored = await this.sqliteConnection.isSecretStored();
      if (!isSecretStored) {
        await this.sqliteConnection.setEncryptionSecret(passphrase);
      }

      this.dbConnection = new DataSource({
        type: 'capacitor',
        database: 'test1',
        driver: this.sqliteConnection,
        entities: [Todo],  // Añade tu entidad aquí
        synchronize: true,
      });
      //
      // await this.dbConnection.initialize()
      //   .then((dbConnection) => {
      //     console.log("dbConnection:", dbConnection)
      //     console.log("Data Source has been initialized!")
      //   })
      //   .catch((err) => {
      //     console.error("Error during Data Source initialization", err)
      //   });
      // await this.dbConnection.synchronize(true);


      // console.log("this.dbConnection: ",this.dbConnection)
      // console.log("this.dbConnection.isInitialized: ", this.dbConnection.isInitialized)
      // // if (!this.dbConnection.isInitialized){
      //   this.dbConnection = await this.dbConnection.initialize();
      //
      // console.log("this.dbConnection 2: ",this.dbConnection)
      // this.dbConnection.synchronize(true);
    } catch (error) {
      console.error('Failed to initialize the database:', error);
    }
  }

  async changePassphrase(
    oldPassphrase: string,
    newPassphrase: string
  ): Promise<void> {
    try {
      await this.sqliteConnection?.changeEncryptionSecret(
        oldPassphrase,
        newPassphrase
      );
    } catch (error) {
      console.error('Failed to change passphrase:', error);
    }
  }

  async addTodo(todo: Partial<Todo>) {
    console.log("add todo todo")
    this.dbConnection?.manager.save(Todo, todo);
  }

  async getTodos() {
    return this.dbConnection.manager.find(Todo);
  }

  async deleteTodo(id: number) {
    return this.dbConnection?.manager.delete(Todo, id);
  }

  private async checkConnections(){
    console.log('checkConnections ....')
    CapacitorSQLite.checkConnectionsConsistency({
      dbNames: ['test1'], // i.e. "i expect no connections to be open"
    }).catch((e) => {
      // the plugin throws an error when closing connections. we can ignore
      // that since it is expected behaviour
      console.error('error during checkConnections: ',e);
      return {};
    }).then(connectionResult => {
      console.log("connectionResult: ",connectionResult)
    })

  }

  private async listDatabases() {
    try {
      // const sqliteConnection = new SQLiteConnection(CapacitorSQLite);
      const dbList = await this.sqliteConnection.getDatabaseList();
      console.log('Databases:', dbList.values);
    } catch (error) {
      console.error('Failed to list databases:', error);
    }
  }

  // private async inspectTableStructure(database: DataSource, tableName: string) {
  //   try {
  //     const result = await database.query(`PRAGMA table_info(${tableName});`);
  //     console.log(`Table structure for ${tableName}:`, result);
  //   } catch (error) {
  //     console.error(`Failed to inspect table structure for ${tableName}:`, error);
  //   }
  // }

  private async inspectTableStructure(databaseName: string, tableName: string) {
    try {
      let db
      const isConnected = await this.sqliteConnection.isConnection(databaseName, false);
      console.log("!isConnected.result: ",isConnected.result)
      if (isConnected.result) {
        // Create and open a new connection if it doesn't exist
        db = await this.sqliteConnection.createConnection(databaseName, false, "no-encryption", 1, false);
        await db.open();
      } else {
        // Retrieve the existing connection
        db = await this.sqliteConnection.retrieveConnection(databaseName, false);
      }
      await db.open();
      const result = await db.query(`PRAGMA table_info(${tableName});`);
      console.log(`Table structure for ${tableName}:`, result.values);
      await this.sqliteConnection.closeConnection(databaseName, false);
    } catch (error) {
      console.error(`Failed to inspect table structure for ${tableName}:`, error);
    }
  }

}
