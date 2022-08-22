const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;

    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next()
    }

    next({
        status: 404,
        message: `Review cannot be found.`
    })
}

async function destroy(req, res, next) {
    const reviewId = req.params.reviewId;
    await service.delete(reviewId);
    res.sendStatus(204);
}

const addCategory = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

async function update(req, res, next) {
    const review = res.locals.review;
    const updatedReview = {
        ... req.body.data,
        review_id: review.review_id,
    }
    await service.update(updatedReview);
    const newData = await service.readWithCritic(review.review_id);
    const formattedData = addCategory(newData);
    res.json({ data: formattedData });
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};