// quoteController.js
// Import Quotes model
Quote = require('./quoteModel');
// Handle index actions
exports.index = function (req, res) {
    Quote.get(function (err, Quotes) {
        res.header('Access-Control-Allow-Origin','*');
        res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Quotes retrieved successfully",
            data: Quotes
        });
    });
};
// Handle create Quotes actions
exports.new = function (req, res) {
    var quote = new Quote();
    quote.name = req.body.name ? req.body.name : quote.name;
    quote.amount = req.body.amount;
    quote.email = req.body.email;
    quote.phone = req.body.phone;
// save the Quotes and check for errors
quote.save(function (err) {
         //if (err)
         //    res.json(err);
res.json({
            message: 'New quote created!',
            data: quote
        });
    });
};
// Handle view Quotes info
exports.view = function (req, res) {
    Quote.findById(req.params.quote_id, function (err, quote) {
        if (err)
            return res.status(400).json(err);
        res.json({
            message: 'Quote details loading..',
            data: quote
        });
    });
};
// Handle update Quotes info
exports.update = function (req, res) {
    Quote.findById(req.params.quote_id, function (err, quote) {
        if (err)
        return res.send(err);
        quote.name = req.body.name ? req.body.name : quote.name;
        quote.amount = req.body.amount;
        quote.email = req.body.email;
        quote.phone = req.body.phone;
// save the Quotes and check for errors
        quote.save(function (err) {
            if (err)
            return  res.json(err);
            res.json({
                message: 'Quote Info updated',
                data: quote
            });
        });
    });
};
// Handle delete Quotes
exports.delete = function (req, res) {
    Quote.remove({
        _id: req.params.quote_id
    }, function (err, quote) {
        if (err)
        return res.json(err);
res.json({
            status: "success",
            message: 'Quote deleted'
        });
    });
};