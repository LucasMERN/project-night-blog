const { application } = require("express");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let db,
    dbConnectionStr,
    dbName;

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    });

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});