module.exports = (ms, verbose = false) =>
  new Promise(resolve => {
    if (verbose) console.log(`waiting (time): ${ms.toLocaleString()} ms`);
    setTimeout(resolve, ms);
  });
