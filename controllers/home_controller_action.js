
//below is a action
module.exports.home = function (req, res) {
    return res.render('home', {
        title: "Home"
    });
    //  return res.end('<h1>aaaaa express for mernSocial</h1>')
}