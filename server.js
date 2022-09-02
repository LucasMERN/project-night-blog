const { application } = require("express");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        }),
    })
)

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});