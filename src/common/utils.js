const omitPassword = (user) => {
    const { password, ..._user } = user
    return _user
}

function mutationFilter(arr, cb) {
  for (let l = arr.length - 1; l >= 0; l -= 1) {
    if (!cb(arr[l])) arr.splice(l, 1);
  }
}

  module.exports = {
    omitPassword,
    mutationFilter
  };