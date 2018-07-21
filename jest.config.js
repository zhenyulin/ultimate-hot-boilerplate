module.exports = {
  modulePaths: ['client', '.'],
  setupFiles: ['raf/polyfill', 'enzyme-react-16-adapter-setup'],
  snapshotSerializers: ['<rootDir>/node_modules/enzyme-to-json/serializer'],
};
