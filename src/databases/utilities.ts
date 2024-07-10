import { DataSource } from "typeorm";

export const getCountOfElements =  (async (connection: DataSource, entity:any): Promise<number> => {
  // Get the repository for your entity
  const repository = connection.getRepository(entity);
  // Use the count() method to query the count of elements in the table
  const count = await repository.count();

  return count;
});
