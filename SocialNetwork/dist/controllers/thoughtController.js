import Thought from '../models/Thought.js';
import User from '../models/User.js';
export const getThoughts = async (req, res, next) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        next(err);
    }
};
export const getSingleThought = async (req, res, next) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        next(err);
    }
};
export const createThought = async (req, res, next) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
        res.json(thought);
    }
    catch (err) {
        next(err);
    }
};
export const updateThought = async (req, res, next) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        next(err);
    }
};
export const deleteThought = async (req, res, next) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: req.params.thoughtId } }, { new: true });
        res.json({ message: 'Thought deleted' });
    }
    catch (err) {
        next(err);
    }
};
export const addReaction = async (req, res, next) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        next(err);
    }
};
export const deleteReaction = async (req, res, next) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
            return;
        }
        res.json(thought);
    }
    catch (err) {
        next(err);
    }
};
