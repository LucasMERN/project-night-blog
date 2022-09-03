module.exports = {
    getIndex: (req,res)=>{
        // We can move this to database and define it in the model
        const articles = [{
            id: 1,
            title: 'Article One',
            intro: 'This is the intro for article one',
            createdAt: '9/3/2019',
            body: 'This is the body of article one',
            img: 'images/1.jpg',
            likeTotal: 2,
            commentTotal: 6,
            tags: ['tag1','tag2','tag3']
        }, {
            id: 2,
            title: 'Article Two',
            intro: 'This is the intro for article two',
            createdAt: '8/3/2019',
            body: 'This is the body of article two',
            img: 'images/2.jpg',
            likeTotal: 90,
            commentTotal: 40,
            tags: ['tag1','tag2','tag3']
        }, {
            id: 3,
            title: 'Article Three',
            intro: 'This is the intro for article three',
            createdAt: '7/3/2019',
            body: 'This is the body of article three',
            img: 'images/3.jpg',
            likeTotal: 80,
            commentTotal: 210,
            tags: ['tag1','tag2','tag3']
        }, {
            id: 4,
            title: 'Article Four',
            intro: 'This is the intro for article four',
            createdAt: '6/3/2019',
            body: 'This is the body of article four',
            img: 'images/4.jpg',
            likeTotal: 37,
            commentTotal: 15,
            tags: ['tag1','tag2','tag3']
        }, {
            id: 5,
            title: 'Article Five',
            intro: 'This is the intro for article five',
            createdAt: '5/3/2019',
            body: 'This is the body of article five',
            img: 'images/5.jpg',
            likeTotal: 25,
            commentTotal: 10,
            tags: ['tag1','tag2','tag3']
        }];
        res.render('index.ejs', { articles: articles });
    }
}