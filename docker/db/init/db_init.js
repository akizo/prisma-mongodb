init = false;
print("Init script ...")

try {
  if (!db.isMaster().ismaster) {
    print("Error: primary not ready, initialize ...")
    rs.initiate(
      {
        _id:'rs0',
        members: [
          { _id:0,
            host: "mongo:27017"
          }
        ]
      }
    )
    quit(1);
  } else {
    if (!init) {
      admin = db.getSiblingDB("admin");
      admin.createUser(
        {
          user: "root",
          pwd: "password",
          roles: ["readWriteAnyDatabase"]
        }
      );
      init = true;
    }
  }
} catch(e) {
  rs.status().ok
}
