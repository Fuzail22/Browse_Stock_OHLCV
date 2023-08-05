<h1 align=center> MONGOOSE ODM </h1>
<p align=center> Understanding Object data modelling </p>

## Commands

1. To Connect to mongo db using connection string
    ```
    mongoose.connect("mongodb://localhost:27017/<DB NAME>", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    });
    ```
2. To create a schema for the model
    ```
    const <SCHEMA NAME> = mongoose.Schema({
    key1: ValueDataType,
    key2: ValueDataType,
    keyn: ValueDataType
    });
    ```
3. To create a model for interacting with the DB
    ```
    const <MODEL REFERENCE NAME> = mongoose.model("<MODEL NAME>", <SCHEMA NAME>);
    ```
4. Function to insert documents into the collection
    ```
    async function saveToDatabase(ObjectName) {
      try {
        await <MODEL REFERENCE NAME>.insertMany(ObjectName);
        console.log("Saved to the database.");
      } catch (error) {
        console.error("Error saving to the database:", error.message);
        throw error;
      }
    }
    ```
5. To insert documents,
    ```
    await saveTickersToDatabase(ObjectName);
    ```

## Reference
[Mongoose ODM Basics](https://www.mongodb.com/developer/languages/javascript/mongoose-versus-nodejs-driver/)
