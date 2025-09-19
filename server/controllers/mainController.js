//get homepage

exports.homepage = async (req, res) => {
    const locals = {
        title: "Notes App",
        description: "A simple notes app built with Node.js and Express"
    }
res.render('index', {
    locals,
    layout: '../views/layouts/front-page'
});
}

//get about page
exports.about = async (req, res) => {
    const locals = {
        title: "About -Notes App",
        description: "A simple notes app built with Node.js and Express"
    }
    res.render('about', locals)
};