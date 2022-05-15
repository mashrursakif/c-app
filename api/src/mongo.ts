import mongoose from 'mongoose';

const { MONGO_URL: url, MONGO_DB: db, MONGO_TEST_DB: testDb } = process.env;

const mnTestUri = `${url}/${testDb + process.argv[2]}`;

const mnDevUri = `${url}/${db}`;

const establish = async () => {
  try {
    const mnUri = process.env.NODE_ENV === 'test' ? mnTestUri : mnDevUri;
    await mongoose.connect(mnUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(
      'MongoDB connection established with ' + mongoose.connection.name
    );
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  await establish();
})();
