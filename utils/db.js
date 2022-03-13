exports.test = async function (client){
    try { 
      await client.connect()
  
      const database = client.db('userdb')
  
      const collection = database.collection('users')
  
      const doc = {
        naam: "Ryshandro",
        imgSrc: "static/images/persoon2.png",
        Leeftijd: "30",
        locatie: "Rotterdam",
        Intresse: "Drinks",
    }

      // hier gaat een document in - fuctie insertOne (promises)
      await collection.insertOne(doc).then(event => {
        console.log('event', event)
      })

      return collection.find().toArray()
  
    // Error, als de database niet doet
    } catch (err) { 
        console.log(err)
    }
  
  }

// test naam was niet nodig, 
