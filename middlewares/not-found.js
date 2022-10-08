const notFound = (req, res) => {
    res.status(404).send("Requested route doesn't exists...")
}

module.exports = notFound