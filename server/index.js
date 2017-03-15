import app from './app';

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Running on port ${listener.address().port}...`);
});
