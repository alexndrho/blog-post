import mongoose from 'mongoose';

const paginate = async (
  Model: mongoose.Model<any>,
  page: number,
  documentCount = 10
) => {
  try {
    if (page < 1) throw new Error('Invalid page number');

    const documents = await Model.find()
      .sort({ createdAt: -1 })
      .skip(documentCount * (page - 1))
      .limit(documentCount);

    if (!documents) throw `Unable to find ${Model.modelName}`;

    const totalPages = Math.max(
      1,
      Math.ceil((await Model.countDocuments()) / documentCount)
    );

    return { documents, totalPages };
  } catch (e) {
    throw e;
  }
};

export default paginate;
