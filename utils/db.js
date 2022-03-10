exports.test = async function (client){
    try { 
      await client.connect()
  
      const database = client.db('userdb')
  
      const collection = database.collection('users')
  
      return collection.find().toArray()
      // const doc = {
      //       naam: "Michael B Jordan",
      //       imgSrc: "static/images/persoon2.png",
      //       Leeftijd: "30",
      //       locatie: "Amsterdam",
      //       Intresse: "Music",
      //   }
  
      // // hier gaat een document in - fuctie insertOne (promises)
      // await collection.insertOne(doc).then(event => {
      //   console.log('event', event)
      // })
  
    // Error, als de database niet doet
    } catch (err) { 
        console.log(err)
    }
  
  }

// test naam was niet nodig, 
