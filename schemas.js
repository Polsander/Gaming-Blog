const Joi = require('joi');


module.exports.postSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        image: Joi.string(),
        url: Joi.string(),
        filename: Joi.string(),
        readTime: Joi.string(),
        summary: Joi.string(),
        date: Joi.string()
    }).required()
});

module.exports.commentSchema = Joi.object({
    comment: Joi.object({
        body: Joi.string().required()
    }).required()
})