exports.test = async function (client) {
  try {
    await client.connect();

    const database = client.db("userdb");
    const collection = database.collection("users");

    //   const doc = {
    //     naam: "Lori Harvey",
    //     imgSrc: "static/images/persoon4.png",
    //     Leeftijd: "30",
    //     locatie: "Rotterdam",
    //     Intresse: "Drinks",
    // }

    //   // hier gaat een document in - fuctie insertOne (promises)
    //   await collection.insertOne(doc).then(event => {
    //     console.log('event', event)
    //   })

    // Stopt de data uit mijn database in een Array
    return collection.find().toArray();

    // Error, als de database niet doet
  } catch (err) {
    console.log(err);
  }
};

// test naam was niet nodig,
