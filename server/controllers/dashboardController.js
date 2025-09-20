const Note = require("../models/Notes");
const mongoose = require("mongoose");

exports.dashboard = async (req, res, next) => {
  const perPage = 12;
  const page = parseInt(req.query.page, 10) || 1;

  const locals = {
    title: "Dashboard",
    description: "A simple notes app built with Node.js and Express.",
  };

  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Fetch notes 
    const notes = await Note.aggregate([
      { $match: { user: userId } },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          title: { $substr: ["$title", 0, 30] },
          body: { $substr: ["$body", 0, 100] },
          createdAt: 1,
        },
      },
    ])
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();

    // Count notes for pagination 
    const count = await Note.countDocuments({ user: userId });

    res.render("dashboard/index", {
      userName: req.user.firstName,
      notes,
      current: page,
      pages: Math.ceil(count / perPage),
      locals,
      layout: "../views/layouts/dashboard",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//get View Specific Note

exports.dashboardViewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .where({ user: req.user.id })
    .lean();

  if (note) {
    res.render("dashboard/view-notes", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/dashboard",
    });
} else {
  res.send('Note not found.')
}
}

//Update Specific Note
exports.dashboardUpdateNote = async (req, res) => {
try {
  await Note.findOneAndUpdate(
    {_id: req.params.id},
    {title: req.body.title, body: req.body.body, updatedAt: Date.now()}
  ).where({user: req.user.id});
  res.redirect('/dashboard');
} catch (error) {
  console.log(error);
  
}
  
}

//Delete Specific Note
exports.dashboardDeleteNote = async (req, res, next) => {
try {
  await Note.deleteOne({_id: req.params.id}).where({user: req.user.id});
  res.redirect('/dashboard');
} catch (error) {
  console.log(error);
}
}

//Add Note
exports.dashboardAddNote = (req, res, next) => {
  res.render('dashboard/add', {
    layout: '../views/layouts/dashboard'
  })
}

//Submit New Note
exports.dashboardAddNoteSubmit = async (req, res, next) => {
try {
  req.body.user = req.user.id;
  await Note.create(req.body)
  res.redirect('/dashboard');
} catch (error) {
  console.log(error);
}
}

//Get Search 
exports.dashboardSearch = async (req, res) => {

  try {
    res.render('dashboard/search', {
      searchResults: '',
      layout: '../views/layouts/dashboard'
    }
    );
  } catch (error) {
  }
}

//post search
exports.dashboardSearchSubmit = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const searchResults = await Note.find({
  user: req.user._id,
  $or: [
    { title: { $regex: searchNoSpecialChars, $options: 'i' } },
    { body: { $regex: searchNoSpecialChars, $options: 'i' } }
  ]
});



    res.render('dashboard/search', {
      searchResults,
      layout: '../views/layouts/dashboard'
    })
  } catch (error) {
    console.log(error);
  }
}