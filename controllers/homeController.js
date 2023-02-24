class HomeController{
    getIndex(req, res){
        res.json({ message : "سلام!"});
    }
}

module.exports = HomeController;