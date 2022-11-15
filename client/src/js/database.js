import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readwrite");
  const store = text.objectStore("jate");
  const retrieve = store.put({ id: 1, value: content });
  const results = await retrieve;
  console.log("these are the", results);
  console.error("put DB not implemented");
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("getting data from database");
  const jateDB = await openDB("jate", 1);
  const text = jateDB.transaction("jate", "readonly");
  const store = text.objectStore("jate");
  const retrieve = store.getAll();
  const results = await retrieve;
  results
    ? console.log("Our data was retrieved")
    : console.log("Data not retrieved");
  return results?.value;
};

initdb();
