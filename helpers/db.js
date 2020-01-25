import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("test.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO test (title, address, lat, lng) VALUES(?, ?, ?, ?);`,
        [title, address, lat, lng],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM test",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
